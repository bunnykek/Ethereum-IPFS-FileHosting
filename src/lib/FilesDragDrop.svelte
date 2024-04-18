<!-- DragDrop.svelte -->
<script>
	import { contract, account } from '$lib/commonVariables';
	import { uploadFilesToPinata } from './pinataAPI.js';
	import { uploadCID } from './smartContractMethods';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { formatBytes, random128Hex } from './utils.js';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import {encryptFile} from '$lib/FileEncDec.svelte'
	let loading = false;
	let selectedFiles = [];

	async function encList(){
		const encryptedFileList = []
		const keyList = []

		for(let i=0; i<selectedFiles.length; i++){
			let encKey = random128Hex();
			console.log(selectedFiles[i], encKey);
			let encFile = await encryptFile(selectedFiles[i], encKey);
			console.info(encFile, encKey);
			encryptedFileList.push(encFile);
			keyList.push(encKey);
		}

		return [encryptedFileList, keyList]
	}
	
	async function encryptAndUpload() {
		let [encryptedFileList, keyList] = await encList();
		loading = true;
		console.log("uuuuuuuu", encryptedFileList);
		const cids = await uploadFilesToPinata(encryptedFileList, $account);
		console.log(cids);
		for (let i=0; i<cids.length; i++) {
			if(cids[i]=="-1") continue;
			let [stats, error] = await uploadCID($contract, $account, cids[i], keyList[i]);
			if (stats) {
				console.log('Successfully uploaded to smart contract. File:', cids[i]);
			} else {
				console.log('Error uploading to smart contract. File:', cids[i]);
				console.log(error);
			}
		}
		loading = false;
		alert('Files have been uploaded.');
	}
</script>

<div style="width: 30em; margin:auto">
	<FileDropzone name="files" multiple bind:files={selectedFiles} />
</div>

<div style=" margin: auto; text-align: center; margin-top: 10px;">
	{#if selectedFiles.length > 0 && loading==false}
		<div>
			<button type="button" on:click={encryptAndUpload} class="variant-filled btn"
				>Confirm upload</button
			>
		</div>
	{/if}
</div>
<div style="width: 30px; margin: auto;">
	{#if loading == true}
	  <ProgressRadial width="w-10" />
	{/if}
  </div>

<ol style="width: 30em; margin: auto" class="bg-secondary list">
	{#each selectedFiles as file, i}
		<li>
			<span class="flex-auto">{i + 1}. {file.name} ({formatBytes(file.size)})</span>
		</li>
	{/each}
</ol>
