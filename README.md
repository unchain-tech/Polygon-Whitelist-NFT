Translations:
English |
[**日本語**](/README.ja.md)

# Polygon Whitelist NFT

This repository is a sample code for UNCHAIN Polygon Whitelist NFT.

## How to Run

#### 1. Fork this repository

#### 2. Sign in to ChainIDE

Open [ChainIDE](https://chainide.com/), and click the "Try Now" button on the front page as shown in the figure below.

![Open ChainIDE](/images/README/1.png)

Then, sign in using GitHub.

![Sign in to ChainIDE](/images/README/2.png)

#### 3. Import the project

Click on "New Project".

![New Project](/images/README/3.png)

Select "Polygon" and click on "Import Project" under `Private Template`.

![Import Project](/images/README/4.png)

Set it up as shown below and click on "Confirm Import".

- Github URL: `Your forked Polygon-Whitelist-NFT`
- Choose branch: `main`

![Confirm Import](/images/README/5.png)

#### 4. Setting up metadata

Configure metadata settings by referring to [here](https://app.unchain.tech/learn/Polygon-Whitelist-NFT/en/3/2/).

#### 5. Deploy the contract

Deploy the contract to Polygon's testnet `Mumbai` with reference to [here](https://app.unchain.tech/learn/Polygon-Whitelist-NFT/en/4/1/).

#### 6. Configure and start the client

Within the `packages/client` folder, create a `.env.local` file and add the following.

```
NEXT_PUBLIC_CONTRACT_ADDRESS=Shield Contract Address
```

Copy your `Shield` contract address from the Deploy panel. and set it in the `.env.local` file.

![Get Shield contract address](/images/README/6.png)

e.g.）

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x86b5cf393100cf895b3371a4ccaa1bc95d486a56
```

Launch the Sandbox within ChainIDE.

![Click to add Sandbox](/images/README/7.png)

In the root of the project, execute the following commands in sequence:

```
# Install dependencies
yarn install

# Generate artifacts in the client folder
yarn contract compile

# Start the client
yarn client dev
```

Configure the port settings and access the application by referring to [here](https://app.unchain.tech/learn/Polygon-Whitelist-NFT/en/4/3/)!
