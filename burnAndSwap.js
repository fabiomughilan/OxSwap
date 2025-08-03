require("dotenv").config();
const { ethers } = require("hardhat");
const axios = require("axios");

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0x6beBDf5B4F38d50440B32B4c9df8eB5Db48169c5";
  const nftId = 1;

  const contract = await ethers.getContractAt("SwapScrollNFT", contractAddress);
  console.log("Burning NFT ID:", nftId);

  const tx = await contract.burnScroll(nftId);
  await tx.wait();
  console.log("✅ NFT Burned");

  // --- 1inch Fusion+ Swap Logic ---
  const chainId = 11155111; // Sepolia
  const fromToken = "0x..."; // Replace with real MATIC address on Sepolia
  const toToken = "0x...";   // Replace with real USDC address on Sepolia
  const amount = ethers.utils.parseUnits("10", 18).toString(); // 10 MATIC

  const apiUrl = `https://api.1inch.dev/swap/v5.2/${chainId}/swap`;

  const headers = {
    Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`, // 🔑 You must request this key from 1inch
    accept: "application/json"
  };

  const params = {
    fromTokenAddress: fromToken,
    toTokenAddress: toToken,
    amount,
    fromAddress: deployer.address,
    slippage: 1,
    disableEstimate: true
  };

  try {
    const response = await axios.get(apiUrl, { headers, params });
    const txData = response.data.tx;
    console.log("Swap Data Received from 1inch Fusion API ✅");

    // Sign and send the transaction
    const sentTx = await deployer.sendTransaction({
      to: txData.to,
      data: txData.data,
      value: txData.value,
      gasLimit: txData.gas
    });

    console.log("🚀 Swap Transaction Sent:", sentTx.hash);
  } catch (err) {
    console.error("❌ Swap failed:", err.response?.data || err.message);
  }

  // --- Simulate Cross-Chain Message to Sui ---
  console.log("📨 [Simulated] Message sent to Sui chain for settlement!");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
