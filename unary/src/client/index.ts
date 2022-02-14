
import * as grpc from '@grpc/grpc-js'

import * as CalcGrpcPb from '../gen/proto/calc_grpc_pb'
import * as CalcPb from '../gen/proto/calc_pb'

const SERVER_PORT = 50051

const addRequest = async (client: CalcGrpcPb.CalcClient, a: number, b: number): Promise<number> => {
  const request = new CalcPb.AddRequest()
  request.setA(a)
  request.setB(b)

  const response = await new Promise<CalcPb.AddResponse>((resolve, reject) => {
    client.add(request, (err, res) => {
      if (err) {
        reject(err)
      }
      if (!res) {
        return reject(new Error('No response'))
      }
      resolve(res)
    })
  })

  return response.getResult()
}

const main = async () => {
  const argv = process.argv.slice(2)
  if (
    argv.length !== 2 ||
    !Number.isInteger(Number(argv[0])) ||
    !Number.isInteger(Number(argv[1]))
  ) {
    console.error('Usage: npm run client:add <a: number> <b: number>')
    process.exit(1)
  }

  const a = parseInt(argv[0], 10)
  const b = parseInt(argv[1], 10)

  const client = new CalcGrpcPb.CalcClient(
    `localhost:${SERVER_PORT}`,
    grpc.credentials.createInsecure(),
  )

  const result = await addRequest(client, a, b)
  console.log(`${a} + ${b} = ${result}`)

  client.close()
}

main()
