<script>
	import { formatBytes } from '$lib/utils';
	import { contract, friendFiles, account } from './commonVariables';
	import { getKey } from './smartContractMethods';
	import { decryptAndDownload } from './FileEncDec.svelte';
	import { getFileObjectFromURL } from '$lib/utils';
	import {PUBLIC_PINATA_GATEWAY, PUBLIC_PINATA_GATEWAY_TOKEN} from '$env/static/public'
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

	async function downloadFiles() {
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				let url = `https://${PUBLIC_PINATA_GATEWAY}/ipfs/${$friendFiles[i].cid}?pinataGatewayToken=${PUBLIC_PINATA_GATEWAY_TOKEN}`;
				let decryptionKey = await getKey($contract, $account, $friendFiles[i].cid);
				// console.log(url, decryptionKey);
				let fileBlob = await getFileObjectFromURL(url);
				fileBlob.name = $friendFiles[i].name;
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

{#if checkedCount > 0}
	<div style="text-align: center; margin: auto; margin-top: 10px;">
		<div class="variant-filled btn-group">
			<button on:click={downloadFiles}>Download</button>
		</div>
	</div>
{/if}

<style>
    .table{
        width: 70%;
        margin: auto;
        margin-top: 10px;
    }
</style>