import Web3 from 'web3';
import {PUBLIC_CONTRACT_ADDRESS} from '$env/static/public'
import {CONTRACT_ABI} from '$lib/ABI.js'

let contract;
let account;

const contractABI = CONTRACT_ABI
const contractAddress = PUBLIC_CONTRACT_ADDRESS; // Your contract address

export async function initWeb3() {
	// Modern dapp browsers
	if (window.ethereum) {
		const web3 = new Web3(window.ethereum);
		try {
			// Request account access if needed
			await window.ethereum.enable();
			// Get the currently selected account
			const accounts = await web3.eth.getAccounts();
			account = accounts[0];
			console.log(account);

			// Initialize contract
			contract = new web3.eth.Contract(contractABI, contractAddress);
		} catch (error) {
			console.error(error);
			alert(error)
		}
	}
	// Legacy dapp browsers
	else if (window.web3) {
		const web3 = new Web3(window.web3.currentProvider);
		// Initialize contract
		contract = new web3.eth.Contract(contractABI, contractAddress);
	}
	// Non-dapp browsers
	else {
		console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
		alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
	}

	return [contract, account];
}

// onMount(initWeb3);