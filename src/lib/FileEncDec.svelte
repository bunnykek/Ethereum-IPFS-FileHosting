<script context="module">
	function convertWordArrayToUint8Array(wordArray) {
		var arrayOfWords = wordArray.hasOwnProperty('words') ? wordArray.words : [];
		var length = wordArray.hasOwnProperty('sigBytes')
			? wordArray.sigBytes
			: arrayOfWords.length * 4;
		var uInt8Array = new Uint8Array(length),
			index = 0,
			word,
			i;
		for (i = 0; i < length; i++) {
			word = arrayOfWords[i];
			uInt8Array[index++] = word >> 24;
			uInt8Array[index++] = (word >> 16) & 0xff;
			uInt8Array[index++] = (word >> 8) & 0xff;
			uInt8Array[index++] = word & 0xff;
		}
		return uInt8Array;
	}

	export function encrypt(file, password, callback) {
		var reader = new FileReader();
		reader.onload = () => {
			var key = password;
			var wordArray = CryptoJS.lib.WordArray.create(reader.result); // Convert: ArrayBuffer -> WordArray
			var encrypted = CryptoJS.AES.encrypt(wordArray, key).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)

			var fileEnc = new Blob([encrypted]); // Create blob from string
			fileEnc.name = file.name + '.enc';
			callback(fileEnc);
		};
		reader.readAsArrayBuffer(file);
	}

	export function decryptAndDownload(file, password) {
		var reader = new FileReader();
		reader.onload = () => {
			var key = password;

			var decrypted = CryptoJS.AES.decrypt(reader.result, key); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
			var typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array

			var fileDec = new Blob([typedArray]); // Create blob from typed array

			var a = document.createElement('a');
			var url = window.URL.createObjectURL(fileDec);
			var filename = file.name.substr(0, file.name.length - 4);
			a.href = url;
			a.download = filename;
			a.click();
			window.URL.revokeObjectURL(url);
		};
		reader.readAsText(file);
	}

	export async function encryptFile(file, password) {
		return new Promise((resolve, reject) => {
			encrypt(file, password, function (fileEnc) {
				resolve(fileEnc);
			});
		});
	}
</script>

<!-- <form on:submit={f}>
	<input type="file" bind:files />
	<input type="text" bind:value={password} placeholder="Password" />
</form> -->

<!-- <button type="button" on:click={}>Decrypt</button> -->
