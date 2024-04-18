
export function formatBytes(bytes) {
    var marker = 1024; // Change to 1000 if required
    var decimal = 2; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var megaBytes = marker * marker; // One MB is 1024 KB
    var gigaBytes = marker * marker * marker; // One GB is 1024 MB
  
    // return bytes if less than a KB
    if(bytes < kiloBytes) return bytes + " Bytes";
    // return KB if less than a MB
    else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
    // return MB if less than a GB
    else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
    // return GB if less than a TB
    else return(bytes / gigaBytes).toFixed(decimal) + " GB";
}
export function random128Hex() {
    function random16Hex() { return (0x10000 | Math.random() * 0x10000).toString(16).substr(1); }
    return random16Hex() + random16Hex() +
        "-" + random16Hex() +
        "-" + random16Hex() +
        "-" + random16Hex() +
        "-" + random16Hex() + random16Hex() + random16Hex();
}

export async function getFileObjectFromURL(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching the file:', error);
      throw error;
    }
  }