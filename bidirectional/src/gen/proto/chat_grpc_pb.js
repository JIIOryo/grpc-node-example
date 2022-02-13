// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_chat_pb = require('../proto/chat_pb.js');

function serialize_ChatMessage(arg) {
  if (!(arg instanceof proto_chat_pb.ChatMessage)) {
    throw new Error('Expected argument of type ChatMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ChatMessage(buffer_arg) {
  return proto_chat_pb.ChatMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var ChatService = exports.ChatService = {
  chat: {
    path: '/Chat/chat',
    requestStream: true,
    responseStream: true,
    requestType: proto_chat_pb.ChatMessage,
    responseType: proto_chat_pb.ChatMessage,
    requestSerialize: serialize_ChatMessage,
    requestDeserialize: deserialize_ChatMessage,
    responseSerialize: serialize_ChatMessage,
    responseDeserialize: deserialize_ChatMessage,
  },
};

exports.ChatClient = grpc.makeGenericClientConstructor(ChatService);
