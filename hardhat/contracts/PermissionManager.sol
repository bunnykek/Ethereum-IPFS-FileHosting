// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract PermissionManager {
    mapping(string => address) private fileOwner;
    mapping(address => string[]) private accessibleFiles; //list of files which a user can access
    mapping(string => string) private decryptKey;

    function uploadCID(string memory CID, string memory key) public {
        //if file already uploaded by same user
        if(fileOwner[CID] != address(0) && fileOwner[CID] == msg.sender){
            revert("You have already uploaded the file");
        }

        //if file already uploaded by different user
        if(fileOwner[CID] != address(0) && fileOwner[CID] != msg.sender){
            revert("File already owned by someone else");
        }

        fileOwner[CID] = msg.sender;
        decryptKey[CID] = key;
        for(uint i=0; i<accessibleFiles[msg.sender].length; i++){
            if (
                keccak256(bytes(accessibleFiles[msg.sender][i])) ==
                keccak256(bytes(CID))
            ){
                return;
            }
        }
        accessibleFiles[msg.sender].push(CID);
    }


    // 0 = no permission
    // 1 = read only permission
    function commitFilePermission(
        address user,
        string calldata CID,
        uint8 flag
    ) public{

        if (fileOwner[CID] != msg.sender) {
            revert("not-file-owner");
        }

        if(msg.sender == user){
            return;
        }

        if (flag == 0) {
            //remove the file from the user accessiblefile list
            for (uint256 i = 0; i < accessibleFiles[user].length; i++) {
                if (
                    keccak256(bytes(accessibleFiles[user][i])) ==
                    keccak256(bytes(CID))
                ) {
                    delete accessibleFiles[user][i];
                }
            }

        } else if (flag == 1) {
            // set the permission as readonly
            for (uint256 i = 0; i < accessibleFiles[user].length; i++) {
                if (
                    keccak256(bytes(accessibleFiles[user][i])) ==
                    keccak256(bytes(CID))
                ) {
                    return;
                }
            }
            accessibleFiles[user].push(CID);
        }
    }

    function getKey(string memory CID) public view returns(string memory) {
        for (uint256 i = 0; i < accessibleFiles[msg.sender].length; i++) {
            if (
                keccak256(bytes(accessibleFiles[msg.sender][i])) ==
                keccak256(bytes(CID))
            ) {
                return decryptKey[CID];
            }
        }
        return "";
    }

    function getCommonFilescid(address host)
        public
        view
        returns (string memory)
    {
        string memory result;
        bool addcomma = false;
        for (uint256 i = 0; i < accessibleFiles[host].length; i++) {
            string memory hostFileCID = accessibleFiles[host][i];
            for (uint256 j = 0; j < accessibleFiles[msg.sender].length; j++) {
                if (
                    keccak256(bytes(accessibleFiles[msg.sender][j])) ==
                    keccak256(bytes(hostFileCID))
                ) {
                    if(!addcomma) addcomma = true;
                    else result = string.concat(result, ",");
                    result = string.concat(result, hostFileCID);
                    break;
                }
            }
        }
        return result;
    }

    function listMyFiles() public view returns(string memory){
        string memory result;
        bool addcomma = false;
        for(uint i=0; i<accessibleFiles[msg.sender].length; i++){
            if(!addcomma){
                addcomma = true;
            }
            else{
                result = string.concat(result, ",");
            }
            result = string.concat(result, accessibleFiles[msg.sender][i]);
        }
        return result;
    }
}
