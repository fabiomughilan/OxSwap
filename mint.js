require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x6beBDf5B4F38d50440B32B4c9df8eB5Db48169c5";
  const [deployer] = await ethers.getSigners();
  console.log("Minting as:", deployer.address);

  const contract = await ethers.getContractAt("SwapScrollNFT", contractAddress);

  const metadataURI = "data:application/json;base64,eyJuYW1lIjogIlN3YXAgU2Nyb2xsIiwgImRlc2NyaXB0aW9uIjogIlN3YXAgMTAgTUFUSUMgb24gUG9seWdvbiB0byAyMCBTVUkiLCAiYXR0cmlidXRlcyI6IFt7InRyYWl0X3R5cGUiOiAiRnJvbSBDaGFpbiIsICJ2YWx1ZSI6ICJQb2x5Z29uIn0sIHsidHJhaXRfdHlwZSI6ICJUb0NoYWluIiwgInZhbHVlIjogIlN1aSJ9LCB7InRyYWl0X3R5cGUiOiAiVG9rZW4gSW4iLCAidmFsdWUiOiAiTUFUSUMifSwgeyJ0cmFpdF90eXBlIjogIlRva2VuIE91dCIsICJ2YWx1ZSI6ICJTVUkuLiJ9LCB7InRyYWl0X3R5cGUiOiAiQW1vdW50IiwgInZhbHVlIjogIjEwIn1dfQ==";

  const tx = await contract.mintScroll(deployer.address, metadataURI);
  const receipt = await tx.wait();

  console.log("NFT Minted. Tx hash:", receipt.transactionHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
