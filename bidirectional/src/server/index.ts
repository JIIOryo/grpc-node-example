import * as grpc from '@grpc/grpc-js'

import * as ChatGrpcPb from '../gen/proto/chat_grpc_pb'
import * as ChatPb from '../gen/proto/chat_pb'

import * as common from '../common'

const clients: Map<string, {
  chat?: grpc.ServerDuplexStream<ChatPb.ChatMessage, ChatPb.ChatMessage>
  stamp?: grpc.ServerDuplexStream<ChatPb.StampMessage, ChatPb.StampMessage>
}> = new Map()

const broadcastChatMessage = (from: string, msg: string) => {
  const chatMessage = new ChatPb.ChatMessage()
  clients.forEach((call, user) => {
    chatMessage.setFrom(from)
    chatMessage.setMessage(msg)
    call.chat?.write(chatMessage)
  })
}
const broadcastStamp = (from: string, stampId: string) => {
  const stampMessage = new ChatPb.StampMessage()
  clients.forEach((call, user) => {
    stampMessage.setFrom(from)
    stampMessage.setStampId(stampId)
    call.stamp?.write(stampMessage)
  })
}

const chatHandler: ChatGrpcPb.IChatServer['chat'] = (call) => {

  call.on('data', (ChatMessage: ChatPb.ChatMessage) => {

    const from = ChatMessage.getFrom()
    const msg = ChatMessage.getMessage()

    const client = clients.get(from)

    if (client === undefined) {
      const serverMessage = `${from}が入室しました`
      common.log(`${common.COLOR.YELLOW}${serverMessage}${common.COLOR.RESET}`)
      broadcastChatMessage(common.SERVER_NAME, serverMessage)
      clients.set(from, { chat: call })
    }

    clients.set(from, { chat: call, stamp: client?.stamp })

    common.log(`${common.COLOR.GREEN}${from}:${common.COLOR.RESET} ${msg}`)

    if (msg === common.QUIT_COMMAND) {
      call.end()
      clients.delete(from)

      const serverMessage = `${from}が退出しました`
      common.log(`${common.COLOR.YELLOW}${serverMessage}${common.COLOR.RESET}`)
      broadcastChatMessage(common.SERVER_NAME, serverMessage)

      return
    }

    broadcastChatMessage(from, msg)
  })
}

const stampHandler: ChatGrpcPb.IChatServer['stamp'] = (call) => {

  call.on('data', (StampMessage: ChatPb.StampMessage) => {

    const from = StampMessage.getFrom()
    const stampId = StampMessage.getStampId()

    const client = clients.get(from)

    if (client === undefined) {
      const serverMessage = `${from}が入室しました`
      common.log(`${common.COLOR.YELLOW}${serverMessage}${common.COLOR.RESET}`)
      broadcastChatMessage(common.SERVER_NAME, serverMessage)
      clients.set(from, {stamp: call})
    }

    clients.set(from, {chat: client?.chat, stamp: call})

    common.log(`${common.COLOR.GREEN}${from}:${common.COLOR.RESET} ${common.COLOR.MAGENTA}${stampId}${common.COLOR.RESET}`)
    
    broadcastStamp(from, stampId)
  })
}

const main = () => {
  const server = new grpc.Server()
  server.addService(
    ChatGrpcPb.ChatService,
    {
      chat: chatHandler,
      stamp: stampHandler
    },
  )
  server.bindAsync(
    `0.0.0.0:${common.SERVER_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err)
        return
      }

      server.start()

      console.log(`Server listening on ${port}`)
    }
  )
}

main()
