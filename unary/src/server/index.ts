
import * as grpc from '@grpc/grpc-js'

import * as CalcGrpcPb from '../gen/proto/calc_grpc_pb'
import * as CalcPb from '../gen/proto/calc_pb'

const SERVER_PORT = 50051

const add: CalcGrpcPb.ICalcServer['add'] = (call, callback) => {
  const a = call.request.getA()
  const b = call.request.getB()

  const result = a + b

  const response = new CalcPb.AddResponse()
  response.setResult(result)
  callback(null, response)
}

const main = () => {
  const server = new grpc.Server()
  server.addService(
    CalcGrpcPb.CalcService,
    {add},
  )

  server.bindAsync(
    `0.0.0.0:${SERVER_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err)
        return
      }

      server.start()

      console.log(`Server listening on ${port}`)
    },
  )
}

main()
