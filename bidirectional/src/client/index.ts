import * as readline from 'readline'

import * as grpc from '@grpc/grpc-js'

import * as chatGrpcPb from '../gen/proto/chat_grpc_pb'
import * as ChatPb from '../gen/proto/chat_pb'

import * as common from '../common'

const user = process.argv[2] || common.generateRandomString()

const printChatStartMessage = () => {
  console.log('--------------------------------')
  console.log(`chatへようこそ。\nメッセージを入力しEnterで送信します。\n${common.QUIT_COMMAND} で終了します。`)
  console.log('--------------------------------')
}
const printChatEndMessage = () => {
  console.log('--------------------------------')
  console.log('chatを終了します。')
  console.log('--------------------------------')
}

const main = () => {
  const client = new chatGrpcPb.ChatClient(
    `localhost:${common.SERVER_PORT}`,
    grpc.credentials.createInsecure()
  )

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: common.getPrompt(user),
  })

  const call = client.chat()
  const call2 = client.stamp()

  call.on('data', (ChatMessage: ChatPb.ChatMessage) => {
    const from = ChatMessage.getFrom()
    const msg = ChatMessage.getMessage()

    switch (from) {
      case common.SERVER_NAME:
        console.log()
        common.log(`${common.COLOR.YELLOW}${msg}${common.COLOR.RESET}`)
        break
      case user:
        common.log(`${common.COLOR.GREEN}${from}${common.COLOR.RED} (You)${common.COLOR.RESET}: ${msg}`)
        break
      default:
        console.log()
        common.log(`${common.COLOR.GREEN}${from}${common.COLOR.RESET}: ${msg}`)
        break
    }

    rl.prompt()
  })

  call2.on('data', (StampMessage: ChatPb.StampMessage) => {
    const from = StampMessage.getFrom()
    const stampId = StampMessage.getStampId()

    common.log(`${common.COLOR.GREEN}${from}${common.COLOR.RESET}: ${common.COLOR.MAGENTA}${stampId}${common.COLOR.RESET}`)

    rl.prompt()
  })

  call.on('end', () => {
    printChatEndMessage()
    call.end()
    rl.close()
  })

  call.on('error', (e: Error) => {
    console.log(e)
  })

  rl.on('line', (line: string) => {
    const msg = line.trim()

    if (!msg) {
      rl.prompt()
      return
    }

    // stamp送信の場合
    if (msg.startsWith(common.STAMP_COMMAND)) {
      const stampId = msg.split(' ')[1]

      const StampMessage = new ChatPb.StampMessage()
      StampMessage.setFrom(user)
      StampMessage.setStampId(stampId)
      call2.write(StampMessage)
      return
    }

    const ChatMessage = new ChatPb.ChatMessage()
    ChatMessage.setFrom(user)
    ChatMessage.setMessage(msg)
    call.write(ChatMessage)
  })

  printChatStartMessage()
  rl.prompt()
}

main()
