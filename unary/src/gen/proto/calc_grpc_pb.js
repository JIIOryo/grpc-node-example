// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_calc_pb = require('../proto/calc_pb.js');

function serialize_AddRequest(arg) {
  if (!(arg instanceof proto_calc_pb.AddRequest)) {
    throw new Error('Expected argument of type AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddRequest(buffer_arg) {
  return proto_calc_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AddResponse(arg) {
  if (!(arg instanceof proto_calc_pb.AddResponse)) {
    throw new Error('Expected argument of type AddResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddResponse(buffer_arg) {
  return proto_calc_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalcService = exports.CalcService = {
  add: {
    path: '/Calc/Add',
    requestStream: false,
    responseStream: false,
    requestType: proto_calc_pb.AddRequest,
    responseType: proto_calc_pb.AddResponse,
    requestSerialize: serialize_AddRequest,
    requestDeserialize: deserialize_AddRequest,
    responseSerialize: serialize_AddResponse,
    responseDeserialize: deserialize_AddResponse,
  },
};

exports.CalcClient = grpc.makeGenericClientConstructor(CalcService);
