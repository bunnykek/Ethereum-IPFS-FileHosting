<script>
    import UserFilesTable from "./TableforFriendFiles.svelte";
	import { contract, account, friendFiles, friendAddress } from "./commonVariables";
    import {fetchOwnerFiles} from '$lib/pinataAPI.js'
	import { getCommonFilescid } from "./smartContractMethods";
    import { ProgressBar } from '@skeletonlabs/skeleton';
    let loading = false;

    async function populate(){
        loading = true;
        try{
            let allData = await fetchOwnerFiles($friendAddress);
            console.log(allData);
            let mutualCids = await getCommonFilescid($contract, $account, $friendAddress);
            console.log(mutualCids);
            $friendFiles = allData.filter(data => mutualCids.includes(data.cid));
        }
        catch(e){
            console.log(err);
        }
        finally{
            loading = false;
        }
    }
    
</script>

<form on:submit={populate}>
    <div class="input-container">
        <label class="label">
            <span>
                Enter your friend's address.
            <span>
            <input class="input" type="text" style="margin-top: 10px;" placeholder="Friend adress" bind:value={$friendAddress} />
        </label>
    </div>
</form>

{#if loading}
<ProgressBar animIndeterminate="anim-progress-bar"/>
{/if}

{#if $friendFiles.length > 0}
    <hr class="!border-dashed" style="width: 70%; margin:auto; margin-bottom: 10px;" />
    <div style="margin:auto; width: 70%">
        <blockquote class="blockquote" style="margin-top: 5px;">
            Files shared by {$friendAddress}:
        </blockquote>
    </div>
    <UserFilesTable data={$friendFiles}/>
{/if}

<style>
    .input-container{
        width: 40em;
        margin: auto;
        margin-bottom: 10px;
    }
</style>