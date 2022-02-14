# grpc-node-example
Node.jsでgRPCを利用するサンプルリポジトリ


## bidirectional

Bidirectional Streaming RPCを利用したリアルタイムチャットアプリです。


[src](./bidirectional)


### setup

```shell
$ cd bidirectional/

$ npm ci
$ npm run protoc # コミット済
$ npm run build
```
### server

<img width="320" alt="スクリーンショット 2022-02-14 16 30 12" src="https://user-images.githubusercontent.com/48080530/153819188-eed9a690-e256-40c9-9b4e-1269e124f704.png">

```shell
$ npm run start-server
```

### client

<img width="364" alt="スクリーンショット 2022-02-14 16 27 20" src="https://user-images.githubusercontent.com/48080530/153818765-be7032bc-568c-41a4-a9a1-533b75e2db6d.png">

```shell
$ npm run start-client (name)
```
