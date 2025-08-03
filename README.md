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

![WhatsApp Image 2025-08-03 at 20 56 17_e6759ef0](https://github.com/user-attachments/assets/70ce0888-1d94-4dc1-9580-e709f367b2ef)
![WhatsApp Image 2025-08-03 at 20 56 17_c53d4cc4](https://github.com/user-attachments/assets/7819c044-c215-45d3-943f-00d5da7d3a57)
![WhatsApp Image 2025-08-03 at 20 56 18_96a5a6b4](https://github.com/user-attachments/assets/e74e76a2-0142-490b-b1c6-5031d165adb2)
![WhatsApp Image 2025-08-03 at 20 56 18_f15c6e34](https://github.com/user-attachments/assets/f321f87f-4833-4b0f-b917-8dd975210415)
![WhatsApp Image 2025-08-03 at 20 56 18_f9459c46](https://github.com/user-attachments/assets/3d470c69-170e-4ff0-8c8b-4ad26202a5d8)
![WhatsApp Image 2025-08-03 at 20 56 19_7b7bf5aa](https://github.com/user-attachments/assets/3ecfe1e9-f79d-4507-8c04-85de6f3e8d78)
![WhatsApp Image 2025-08-03 at 20 56 19_b5e9d080](https://github.com/user-attachments/assets/e0281aaa-c2e0-4017-8fde-60d68f17dd38)
![WhatsApp Image 2025-08-03 at 20 56 19_72096ccf](https://github.com/user-attachments/assets/a545ec5f-a472-450f-9e48-62f72e237c7b)
![WhatsApp Image 2025-08-03 at 20 56 19_15284a78](https://github.com/user-attachments/assets/8191f640-b2c7-4e93-8dfd-69f306ee8230)
![WhatsApp Image 2025-08-03 at 20 56 20_9104836c](https://github.com/user-attachments/assets/4c9fa230-078b-41b7-acb2-f5517ed6bf7a)



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
