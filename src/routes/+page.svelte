<svelte:head>
	<script
		async
		src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"
	></script>
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';
	import { initWeb3 } from '$lib/connectToWallet';
	import { contract, account } from '$lib/commonVariables';
	import FilesDragDrop from '$lib/FilesDragDrop.svelte';
	import FriendFiles from '$lib/FriendFiles.svelte';
	import MyFiles from '$lib/MyFiles.svelte';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	let tabSet: number = 0;

	onMount(async () => {
		[$contract, $account] = await initWeb3();
	});
</script>

<AppBar >
	<h2 class="h2">
		Welcome to DeIPFS <br>
	</h2>
	<blockquote class="blockquote" style="margin-top: 5px;">
		Your address: {$account}
	</blockquote>
</AppBar>


<TabGroup justify="justify-center">
	<Tab bind:group={tabSet} name="tab1" value={0}>My Files</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Upload Files</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Friend's Files</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<MyFiles />
		{:else if tabSet === 1}
			<FilesDragDrop />
		{:else if tabSet === 2}
			<FriendFiles />
		{/if}
	</svelte:fragment>
</TabGroup>