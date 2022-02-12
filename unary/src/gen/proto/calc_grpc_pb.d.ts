// GENERATED CODE -- DO NOT EDIT!

// package: 
// file: proto/calc.proto

import * as proto_calc_pb from "../proto/calc_pb";
import * as grpc from "@grpc/grpc-js";

interface ICalcService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  add: grpc.MethodDefinition<proto_calc_pb.AddRequest, proto_calc_pb.AddResponse>;
}

export const CalcService: ICalcService;

export interface ICalcServer extends grpc.UntypedServiceImplementation {
  add: grpc.handleUnaryCall<proto_calc_pb.AddRequest, proto_calc_pb.AddResponse>;
}

export class CalcClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  add(argument: proto_calc_pb.AddRequest, callback: grpc.requestCallback<proto_calc_pb.AddResponse>): grpc.ClientUnaryCall;
  add(argument: proto_calc_pb.AddRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_calc_pb.AddResponse>): grpc.ClientUnaryCall;
  add(argument: proto_calc_pb.AddRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_calc_pb.AddResponse>): grpc.ClientUnaryCall;
}
