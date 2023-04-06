import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deployContract() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);

    console.log('Account balance:', (await deployer.getBalance()).toString());

    const DeMarkContract = await ethers.getContractFactory('deMark');
    console.log(DeMarkContract.interface.format('json'));
    const deMark = await DeMarkContract.deploy();
    await deMark.deployed();
    // This solves the bug in Mumbai network where the contract address is not the real one
    const txHash = deMark.deployTransaction.hash;
    const txReceipt = await ethers.provider.waitForTransaction(txHash);
    const contractAddress = txReceipt.contractAddress;
    console.log('Contract deployed to address:', contractAddress);
    saveFrontendFiles(deMark);
}

function saveFrontendFiles(dm) {
    const contractsDir = path.join(__dirname, '/../../next-app/src/contracts');
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }
    fs.writeFileSync(
        contractsDir + '/contract-address.json',
        JSON.stringify({ deMark: dm.address }, null, 2)
    );
    // `artifacts` is a helper property provided by Hardhat to read artifacts
    const deMarkArtifact = artifacts.readArtifactSync('deMark');
    fs.writeFileSync(
        contractsDir + '/deMark.json',
        JSON.stringify(deMarkArtifact, null, 2)
    );
}

deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
