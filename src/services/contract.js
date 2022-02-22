import MemeCoinAbi from "../contract/MemeCoin.json";
import { ethers, utils } from "ethers";

export async function connectWallet() {


    if (!window.ethereum) {
        throw Error("Metamask is required");
    }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    return accounts[0];

}

const contractAbi = MemeCoinAbi.abi;


function getContract() {
    if (!window.ethereum) {
        throw Error("Metamask is required");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractAbi, signer);

    console.log(provider);

    return contract;
}

export async function getTokenName() {
    const contract = getContract();
    return await contract.name();
}

export async function getSymbol() {
    const contract = getContract();
    return await contract.symbol();
}

export function getContractAddress(){
    const contract = getContract();
    return contract.address;
}

export async function getOwner() {
    const contract = getContract();
    const ownerAddress = await contract.owner();
    return ownerAddress;
}

export async function getTotalSupply() {
    const contract = getContract();
    const totalSupply = await contract.totalSupply();

    return utils.formatEther(totalSupply);
}

export async function transferToken(address, amount) {
    const contract = getContract();
    const txn = await contract.transfer(address, utils.parseEther(amount))
    const result = await txn.wait();

    return result;

}

export async function burnToken(amount) {
    const contract = getContract();
    const txn = await contract.burn(utils.parseEther(amount));
    const result = await txn.wait();
    return result;
}

export async function mintToken(amount){
    const contract = getContract();
    const tokenOwner = await contract.owner();
    const txn = await contract.mint(tokenOwner, utils.parseEther(amount));
    const result = await txn.wait();
    return result;
}

export function listenTokenMintedEvent(callback = () => {}){
    const contract = getContract();
    
    contract.on("additionalTokensMinted",(address, amount, message) => callback(address, utils.formatEther(amount.toString()), message));
}

export function unscribeTokenMintedEvent(callback = () => {}){
    const contract = getContract();

    contract.off("additionalTokensMinted", callback)
}


export function listenTokenBurnedEvent(callback = () => {}){
    const contract = getContract();
    
    contract.on("tokensBurned", (address, amount, message) => callback(address, utils.formatEther(amount.toString()), message));
}

export function unscribeTokenBurnedEvent(callback = () => {}){
    const contract = getContract();

    contract.off("additionalTokensMinted", callback)
}

export function listenMetaMaskEvents(callback = () => {}){
    
}