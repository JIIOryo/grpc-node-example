
import * as moment from 'moment'

export const COLOR = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  RESET: '\x1b[0m',
}

export const SERVER_PORT = 50051
export const SERVER_NAME = 'ChatServer'
export const QUIT_COMMAND = 'quit'
export const getPrompt = (user: string) => `${COLOR.GREEN}${user}${COLOR.RESET} >>> `

export const log = (msg: string) => {
  const now = formatDate(Date.now())
  console.log(`${COLOR.BLUE}[${now}]${COLOR.RESET} ${msg}`)
}

export const formatDate = (date: number) => moment(date).format('YYYY-MM-DD HH:mm:ss')

export const generateRandomString = () => Math.random().toString(36).slice(-8)
