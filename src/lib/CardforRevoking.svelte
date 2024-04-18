<script>
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import {commitFilePermission} from '$lib/smartContractMethods'
    import {contract, account, myFiles} from '$lib/commonVariables'
    export let filesToPick = [];
    let output = [];
    let loading = false;
    let receiverAddr;
    async function commitSharing(){
        console.log(filesToPick);
        loading = true;
        for(let i=0; i<filesToPick.length; i++){
            if(filesToPick[i].checked){
                try{
                    console.log("Params:", $contract, $account, receiverAddr, $myFiles[i].cid, 0);
                    var [stats, res] = await commitFilePermission($contract, $account, receiverAddr, $myFiles[i].cid, 0)
                }
                finally{
                    if(stats){
                        output.push(res);
                    }
                    else{
                        output.push(false);
                    }
                }
            }
        }
        loading = false;
        console.log(output);
    }
</script>
<div class="card p-4" style="width:fit-content;">
	Removing access to file(s).
    <form on:submit={commitSharing}>
        <input class="input" style="margin-top: 10px; margin-bottom: 10px;" type="text" bind:value={receiverAddr} placeholder="Enter user's address."/>
    </form>
    {#if loading}
	    <ProgressBar/>  
    {/if}
</div>