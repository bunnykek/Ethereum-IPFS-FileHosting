/* eslint-disable no-useless-escape */
import {PUBLIC_PINATA_JWT} from '$env/static/public'

const HEADERS = {
    'Authorization': `Bearer ${PUBLIC_PINATA_JWT}`
}

export async function fetchOwnerFiles(ownerAddress) {
    // console.log(ownerAddress);
    const response = await fetch(`https://api.pinata.cloud/data/pinList?metadata[keyvalues]={"uploader_address":{"value":"${ownerAddress}","op":"eq"}}&includeCount=true`, {
        headers: HEADERS
    });

    let returnList = [];

    const resJson = await response.json();
    console.log(resJson);
    for (let i = 0; i < resJson["rows"].length; i++) {
        const cid = resJson["rows"][i]["ipfs_pin_hash"]
        const size = resJson["rows"][i]["size"];
        const date = resJson["rows"][i]["date_pinned"]
        const name = resJson["rows"][i]["metadata"]["name"];
        const owner = resJson["rows"][i]["metadata"]["keyvalues"]["uploader_address"];
        // console.log(cid);
        returnList.push({
            "name": name,
            "size": size,
            "date": date,
            "cid": cid,
            "owner": owner,
        })
    }

    return returnList;
}


export async function fetchFilesbyName(fname){
    const response = await fetch(`https://api.pinata.cloud/data/pinList?metadata[name]=${fname}&includeCount=true`, {
        headers: HEADERS
    });

    let returnList = [];
    
    const resJson = await response.json();
    // console.log(resJson);
    for(let i=0; i<resJson["count"]; i++){
        const cid = resJson["rows"][i]["ipfs_pin_hash"]
        const size = resJson["rows"][i]["size"];
        const date = resJson["rows"][i]["date_pinned"]
        const name = resJson["rows"][i]["metadata"]["name"];
        const owner = resJson["rows"][i]["metadata"]["keyvalues"]["uploader_address"];
        // console.log(cid);
        returnList.push({
            "name": name,
            "size": size,
            "date": date,
            "cid": cid,
            "owner": owner
        })
    }

    return returnList;
}

export async function uploadFilesToPinata(files, account) {
    let cids = []
    for (let i = 0; i < files.length; i++) {
        const form = new FormData();
        form.append('file', files[i]);
        form.append('pinataMetadata', `{\n  \"name\": \"${files[i].name}\",\n  \"keyvalues\": {\n    \"uploader_address\": \"${account}\"\n  }\n}`);
        // form.append('pinataOptions', '{\n  "cidVersion": 1\n}');

        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: HEADERS,
            body: form
        });

        const data = await response.json();
        if (response.ok) {
            cids.push(data.IpfsHash)
            console.log('File uploaded successfully!\nIPFS Hash: ' + data.IpfsHash);
        } else {
            cids.push("-1")
            console.log('Failed to upload file:\n' + data.error.message);
        }
    }
    return cids;
};