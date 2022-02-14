# grpc-node-example
Node.jsでgRPCを利用するサンプルリポジトリ


## bidirectional

Bidirectional Streaming RPCを利用したリアルタイムチャットアプリです。

<img width="364" alt="スクリーンショット 2022-02-14 16 27 20" src="https://user-images.githubusercontent.com/48080530/153818765-be7032bc-568c-41a4-a9a1-533b75e2db6d.png">


[src](./bidirectional)


### setup

```shell
$ cd bidirectional/
$ npm ci
$ npm run protoc # コミット済
$ npm run build
```
### server

```shell
$ npm run start-server
```

### client

```shell
$ npm run start-client (name)
```
