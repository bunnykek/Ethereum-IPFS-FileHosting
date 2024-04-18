export async function commitFilePermission(contract, account, user, cid, flag){
    if (contract) {
        try {
            const tx = await contract.methods.commitFilePermission(user, cid, flag).send({from: account});
            console.log('Transaction hash:', tx.transactionHash);
            return [true, tx];
        } catch (error) {
            console.error(error);
            return [false, error];
        }
    } else {
        console.error('Contract not initialized.');
        return [false, 'Contract not initialized.'];
    }
}

export async function uploadCID(contract, account, cid, key){
    if (contract) {
        try {
            const tx = await contract.methods.uploadCID(cid, key).send({from: account});
            console.log('Transaction hash:', tx.transactionHash);
            return [true, tx];
        } catch (error) {
            console.error(error);
            return [false, error];
        }
    } else {
        console.error('Contract not initialized.');
        return [false, 'Contract not initialized.'];
    }
}

export async function getCommonFilescid(contract, account, user){
    if (contract) {
        try {
            const result = await contract.methods.getCommonFilescid(user).call({from: account});
            return result.split(",");
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Contract not initialized.');
    }
}

export async function getKey(contract, account, cid){
    if (contract) {
        try {
            const tx = await contract.methods.getKey(cid).call({from: account});
            return tx;
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Contract not initialized.');
    }
}

export async function listMyFiles(contract, account){
    if (contract) {
        try {
            const tx = await contract.methods.listMyFiles().call({ from: account });
            return tx;
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Contract not initialized.');
    }
}