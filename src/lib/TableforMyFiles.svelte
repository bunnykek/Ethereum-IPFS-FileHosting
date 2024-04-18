<script lang="ts">
	import { formatBytes, getFileObjectFromURL } from '$lib/utils';
	import CardforSharing from './CardforSharing.svelte';
	import CardforRevoking from './CardforRevoking.svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { contract, myFiles, account } from './commonVariables';
	import { getKey } from './smartContractMethods';
	import { decryptAndDownload } from './FileEncDec.svelte';
	import {PUBLIC_PINATA_GATEWAY, PUBLIC_PINATA_GATEWAY_TOKEN} from '$env/static/public'
	const sharepopup: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'sharepopup',
		// Defines which side of your trigger the popup will appear
		placement: 'top'
	};

	const revokepopup: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'revokepopup',
		// Defines which side of your trigger the popup will appear
		placement: 'top'
	};

	export let data = [];
	let checkboxes = [];
	let checkedCount = 0;
	function handleCheckboxChange(event) {
		const checkbox = event.target;
		if (checkbox.checked) {
			checkedCount++;
		} else {
			checkedCount--;
		}
		console.log(checkedCount);
	}

	// function download(url, filename) {
	// 	fetch(url)
	// 		.then((response) => response.blob())
	// 		.then((blob) => {
	// 			const link = document.createElement('a');
	// 			link.href = URL.createObjectURL(blob);
	// 			link.download = filename;
	// 			link.click();
	// 		})
	// 		.catch(console.error);
	// }

	async function downloadFiles() {
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				let url = `https://${PUBLIC_PINATA_GATEWAY}/ipfs/${$myFiles[i].cid}?pinataGatewayToken=${PUBLIC_PINATA_GATEWAY_TOKEN}`;
				let decryptionKey = await getKey($contract, $account, $myFiles[i].cid);
				let fileBlob = await getFileObjectFromURL(url);
				fileBlob.name = $myFiles[i].name;
				console.info(decryptionKey, fileBlob);
				decryptAndDownload(fileBlob, decryptionKey)
			}
		}
	}
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Size</th>
				<th>Date uploaded</th>
				<th>CID</th>
			</tr>
		</thead>
		<tbody>
			{#each data as row, i}
				<tr>
					<td>
						<label class="flex items-center space-x-2"
							><input
								class="checkbox"
								type="checkbox"
								bind:this={checkboxes[i]}
								on:change={handleCheckboxChange}
							/></label
						>
					</td>
					<td>{row.name}</td>
					<td>{formatBytes(row.size)}</td>
					<td>{row.date}</td>
					<td>{row.cid}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div data-popup="sharepopup">
	<CardforSharing filesToPick={checkboxes} />
</div>

<div data-popup="revokepopup">
	<CardforRevoking filesToPick={checkboxes} />
</div>

{#if checkedCount > 0}
	<div style="text-align: center; margin: auto; margin-top: 10px;">
		<div class="variant-filled btn-group">
			<button on:click={downloadFiles}>Download</button>
			<button use:popup={sharepopup}>Share</button>
			<button use:popup={revokepopup}>Revoke</button>
		</div>
	</div>
{/if}

<style>
	.table {
		width: 70%;
		margin: auto;
		margin-top: 10px;
	}
</style>
