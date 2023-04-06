const CONTRACT_ADDRESS = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
const META_DATA_URL = 'ipfs://XX';

async function mintNFT(contractAddress, metaDataURL) {
    const demarkSBT = await ethers.getContractFactory('deMark');
    const [owner] = await ethers.getSigners();
    await demarkSBT.attach(contractAddress).mintNFT(owner.address, metaDataURL);
    console.log('NFT minted to: ', owner.address);
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
