const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with address:", deployer.address);

  const SwapScrollNFT = await hre.ethers.getContractFactory("SwapScrollNFT");
  const contract = await SwapScrollNFT.deploy(deployer.address); // 👈 Pass the initial owner here

  await contract.waitForDeployment();

  console.log("ScrollNFT deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
