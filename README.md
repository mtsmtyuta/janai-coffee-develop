# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev -o
```

## Node version, Firebase-tools
- node18 (v18.12.1)
- firebase-tools（v12.4.5）

## Deploy
- Firebaseを利用(Hosting, Functions)
- nitroを利用する関係で、functionディレクトリを利用しない(.output/serverをUP)
- そのため、stagngにUPするためには、切り分け用の手順が必要。nitroを使う関係で一癖あり（deploy時に自動実行）
  - build後、deploy前に`/server/index.mjs`の`export { s as server }`部分を`export { s as serverstg }`に変更し関数名を変更
  - firebase.jsonのcodebaseを「serverstg」に変更（関数を別々に分けるためのもの）
  - envファイルを.output/server側にもコピー
```json
{
 "source": ".output/server",
 "codebase": "serverstg",
 //"codebase": "server"
 },

```
```bash
# prod
# 1. build
yarn build;
# 2. /server/index.mjsの関数名が「s as server」であることを確認
# 3. firebase.jsonのcodebase(.output/server側)が「server」であることを確認
# 4. 本番用のデプロイ
yarn deploy;


# staging
yarn buildstg;
# 2. /server/index.mjsの関数名が「s as serverstg」であることを確認
# 3. firebase.jsonのcodebase(.output/server側)が「serverstg」であることを確認
# 4. 本番用のデプロイ
yarn deploystg;
```# janai-coffee-develop
# janai-coffee-develop
