async function main() {
  const MiContrato = await ethers.getContractFactory("MiContrato");
  const contrato = await MiContrato.deploy();
  await contrato.waitForDeployment();

  console.log("MiContrato desplegado en:", await contrato.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});