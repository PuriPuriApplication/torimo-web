# torimo-web

### clone
```
$ git clone <Git URL> torimo-web
```

### 開発環境での Node / npm のバージョンについて

* Node ... v13.0.1
* npm ... v6.12.0

開発を行う前に、上記のバージョンとなっているかを確認してください。
バージョンが異なる場合、開発時にエラーとなります。（npm でインストールできないなど）

#### Node / npm のバージョン管理ツールについて

Node ... nodebrew / nvm / n
npm ... 以下のコマンドで更新

```
$ npm i -g npm@6.12.0
```

### Project setup
```
$ npm ci
```

### 起動

以下のコマンドを実行すると、コンテナが立ち上がります。

```
$ bash run.sh
```

### 環境変数について

各環境ごとに `.env` ファイルを作成します。ファイル作成場所はプロジェクトのルートディレクトリです。

|ファイル名 |モード名  |ローカルで完結するか　|
|---        |---       |---              |
|.env  |全てのケースで読み込まれる  |×  |
|.env.local  |全てのケースで読み込まれる  |○  |
|.env.development  |開発環境のみ  |×  |
|.env.development.local  |開発環境のみ  |○  |
|.env.production |本番環境と**E2E環境**で読み込まれる  |×  |
|.env.production.local  |本番環境と**E2E環境**で読み込まれる  |○  |
|.env.test  |ユニットテスト環境で読み込まれる  |×  |
|.env.test.local  |ユニットテスト環境で読み込まれる  |○  |

各環境ごとのファイルを作成する際は、 `env.sample` を参照し作成すること。
⚠️ **本番環境へデプロイ (firebase hosting) する際には、 `.env` または `.env.production` ファイルを用意すること** ⚠️

### トイル周りについて

|トイル |説明  |
|---        |---              |
|package.json の変更が入ったら  |git pull 時に node_modules をリセットします。  |
|git commit したら  |変更されたソースをフォーマットします。また、lint でエラーとなったら commit できません。  |

### CI / CD

CircleCI を使用しています。master branch にマージされると以下のジョブが実行されます。

|ジョブ |説明  |
|---        |---              |
|test:unit  |コンポーネントなどの単体テストが実行されます。  |
|build  |ビルドします。  |
|deploy  |firebase hosting へデプロイします。  |

### OnsenUI

本アプリは OnsenUI をベースにデザインを構築します。

* [OnsenUI (CSS コンポーネント)](https://ja.onsen.io/v2/api/css.html)
