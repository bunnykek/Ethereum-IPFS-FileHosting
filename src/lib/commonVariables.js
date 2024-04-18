import { writable } from 'svelte/store';
export let uploadFilesList = writable([]);
export let contract = writable();
export let account = writable();
export let friendAddress = writable()
export let myFiles = writable([]);
export let friendFiles = writable([]);
// export let uploadedCid = writable([])