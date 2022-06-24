// GENERATED CODE -- DO NOT EDIT!

// package: 
// file: proto/chat.proto

import * as proto_chat_pb from "../proto/chat_pb";
import * as grpc from "@grpc/grpc-js";

interface IChatService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  chat: grpc.MethodDefinition<proto_chat_pb.ChatMessage, proto_chat_pb.ChatMessage>;
  stamp: grpc.MethodDefinition<proto_chat_pb.StampMessage, proto_chat_pb.StampMessage>;
}

export const ChatService: IChatService;

export interface IChatServer extends grpc.UntypedServiceImplementation {
  chat: grpc.handleBidiStreamingCall<proto_chat_pb.ChatMessage, proto_chat_pb.ChatMessage>;
  stamp: grpc.handleBidiStreamingCall<proto_chat_pb.StampMessage, proto_chat_pb.StampMessage>;
}

export class ChatClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  chat(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<proto_chat_pb.ChatMessage, proto_chat_pb.ChatMessage>;
  chat(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<proto_chat_pb.ChatMessage, proto_chat_pb.ChatMessage>;
  stamp(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<proto_chat_pb.StampMessage, proto_chat_pb.StampMessage>;
  stamp(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<proto_chat_pb.StampMessage, proto_chat_pb.StampMessage>;
}
