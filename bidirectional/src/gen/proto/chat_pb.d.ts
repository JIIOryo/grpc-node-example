// package: 
// file: proto/chat.proto

import * as jspb from "google-protobuf";

export class ChatMessage extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ChatMessage): ChatMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatMessage;
  static deserializeBinaryFromReader(message: ChatMessage, reader: jspb.BinaryReader): ChatMessage;
}

export namespace ChatMessage {
  export type AsObject = {
    from: string,
    message: string,
  }
}

export class StampMessage extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getStampId(): string;
  setStampId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StampMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StampMessage): StampMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StampMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StampMessage;
  static deserializeBinaryFromReader(message: StampMessage, reader: jspb.BinaryReader): StampMessage;
}

export namespace StampMessage {
  export type AsObject = {
    from: string,
    stampId: string,
  }
}

