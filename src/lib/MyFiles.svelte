<script>
	import { fetchOwnerFiles } from '$lib/pinataAPI.js';
	import UserFilesTable from './TableforMyFiles.svelte';
	import { account, myFiles } from './commonVariables';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	let loading = false;
	async function populate() {
		loading = true;
		try {
			$myFiles = await fetchOwnerFiles($account);
			console.log($myFiles);
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	}

</script>

<div class="button-container">
	<button type="button" class="btn variant-filled" on:click={populate}>
		<h3>List my files</h3>
	</button>
</div>
{#if loading}
<ProgressBar animIndeterminate="anim-progress-bar" />
{/if}

{#if $myFiles.length > 0}
	<hr class="!border-dashed" style="width: 70%; margin:auto; margin-bottom: 10px;" />
	<UserFilesTable data={$myFiles} />
{/if}



<style>
	.btn {
		margin-bottom: 20px;
		justify-content: right;
	}

	.button-container {
		text-align: center;
	}
</style>
