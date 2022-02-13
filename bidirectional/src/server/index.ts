import * as grpc from '@grpc/grpc-js'

import * as ChatGrpcPb from '../gen/proto/chat_grpc_pb'
import * as ChatPb from '../gen/proto/chat_pb'

import * as common from '../common'

const clients: Map<string, grpc.ServerDuplexStream<ChatPb.ChatMessage, ChatPb.ChatMessage>> = new Map()

const broadcast = (from: string, msg: string) => {
  const chatMessage = new ChatPb.ChatMessage()
  clients.forEach((call, user) => {
    chatMessage.setFrom(from)
    chatMessage.setMessage(msg)
    call.write(chatMessage)
  })
}

const chatHandler: ChatGrpcPb.IChatServer['chat'] = (call) => {

  call.on('data', (ChatMessage: ChatPb.ChatMessage) => {

    const from = ChatMessage.getFrom()
    const msg = ChatMessage.getMessage()

    if (clients.get(from) === undefined) {
      const serverMessage = `${from}が入室しました`
      common.log(`${common.COLOR.YELLOW}${serverMessage}${common.COLOR.RESET}`)
      broadcast(common.SERVER_NAME, serverMessage)
      clients.set(from, call)
    }

    common.log(`${common.COLOR.GREEN}${from}:${common.COLOR.RESET} ${msg}`)

    if (msg === common.QUIT_COMMAND) {
      call.end()
      clients.delete(from)

      const serverMessage = `${from}が退出しました`
      common.log(`${common.COLOR.YELLOW}${serverMessage}${common.COLOR.RESET}`)
      broadcast(common.SERVER_NAME, serverMessage)

      return
    }

    broadcast(from, msg)
  })
}

const main = () => {
  const server = new grpc.Server()
  server.addService(
    ChatGrpcPb.ChatService,
    {chat: chatHandler},
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
