# 🔁 0xSwap – “Summon the power of swaps with a single scroll!”

> Built for the 1inch × ETHGlobal Hackathon 2025

0xSwap is a gamified DeFi platform where cross-chain swaps become magical, tradable NFTs.

---

## 🌟 What is 0xSwap?

**0xSwap** wraps 1inch Fusion+ cross-chain swaps into unique NFTs called **SwapScrolls**. These NFTs are:
- **Minted** with swap intent (e.g. “Swap 10 MATIC on Polygon → 20 SUI on Sui”)
- **Traded or gifted** like scrolls
- **Burned** to execute a real swap via 1inch Fusion+

Once burned, a **cross-chain message** is sent (simulated in this demo), and the receiving chain (e.g. Sui) mints a **mock token or achievement NFT**.

---

## 🔧 How It Works (Architecture)

### 🛠️ EVM Side (Sepolia Testnet)
- 📝 **ERC-721 NFT (SwapScroll)** with metadata: `fromChain`, `toChain`, `tokenIn`, `tokenOut`, `amount`
- 🔥 **Burn Function**: triggers a swap using the [1inch Fusion+ API](https://docs.1inch.dev/docs/fusion/modes/)
- 🌉 Simulated LayerZero message to the Sui chain

### 🧪 Sui Side (Testnet)
- 🧾 Simple Move contract that:
  - Accepts mock messages
  - Mints mock SUI tokens or an **Achievement NFT**

---

## 🖼️ Demo Screenshots

![Mint Scroll](./screenshots/mint.png)
![Burn Scroll](./screenshots/burn.png)
![Sui Mint](./screenshots/sui-mint.png)

---

## 🔗 Live Demo

**Frontend:** Coming Soon  
**EVM Contract:** [Sepolia Explorer](https://sepolia.etherscan.io/address/...)  
**Sui Contract:** [Sui Explorer](https://suiexplorer.com/.../devnet)  
**Fusion+ API Call Example:** [`scripts/burnAndSwap.js`](./scripts/burnAndSwap.js)

---

## 🛠️ Tech Stack

| Layer         | Tech Used |
|---------------|-----------|
| Smart Contract (EVM) | Solidity, Hardhat, Sepolia |
| Cross-Chain Messaging | LayerZero (Simulated) |
| Swap Engine | 1inch Fusion+ API |
| Destination Chain | Sui, Move |
| Frontend | React, Ethers.js, WalletConnect |
| DevOps | dotenv, IPFS (optional), GitHub |

---

## 🧪 How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/your-username/0xSwap.git
cd 0xSwap
