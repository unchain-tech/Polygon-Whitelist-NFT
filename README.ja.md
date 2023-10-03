翻訳:
[**English**](/README.md) |
日本語

# Polygon Whitelist NFT

このリポジトリは UNCHAIN Polygon Whitelist NFT の見本コードです。

## 実行方法

#### 1. 本リポジトリのフォーク

#### 2. ChainIDEにサインイン

[ChainIDE](https://chainide.com/)を開き, 下図のようにフロントページの「Try Now」をクリックします。

![Open ChainIDE](/images/README/1.png)

次に、GitHubでサインインをします。

![Sign in to ChainIDE](/images/README/2.png)

#### 3. プロジェクトのインポート

「New Project」をクリックします。

![New Project](/images/README/3.png)

「Polygon」を選択し、「Import Project」をクリックします。

![Import Project](/images/README/4.png)

下記のように設定を行い、「Confirm Import」をクリックします。

- Github URL: `ForkしたPolygon-Whitelist-NFT`
- Choose branch: `main`

![Confirm Import](/images/README/5.png)

#### 4. メタデータの設定

[こちら](https://app.unchain.tech/learn/Polygon-Whitelist-NFT/ja/3/2/)を参考に、メタデータの設定を行います。

#### 5. コントラクトのデプロイ

[こちら](https://app.unchain.tech/learn/Polygon-Whitelist-NFT/ja/4/1/)を参考に、Polygonのテストネット `Mumbai`にデプロイを行います。

#### 6. クライアントの設定と起動

`packages/client`フォルダ内に`.env.local`ファイルを作成し、下記を記載します。

```
NEXT_PUBLIC_CONTRACT_ADDRESS=Shieldコントラクトのアドレス
```

ShieldコントラクトアドレスをDeployパネルからコピーし、.env.localファイルに設定します。

![Get Shield contract address](/images/README/6.png)

例）

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x86b5cf393100cf895b3371a4ccaa1bc95d486a56
```

ChainIDE下のSandboxを起動します。

![Click to add Sandbox](/images/README/7.png)

プロジェクトのルートで下記のコマンドを順に実行します。

```
# 依存関係のインストール
yarn install

# artifactsをclientフォルダに生成
yarn contract compile

# クライアントの起動
yarn client dev
```

[こちら](https://app.unchain.tech/learn/Polygon-Whitelist-NFT/ja/4/3/)を参考にポートの設定を行い、アプリケーションにアクセスしましょう！