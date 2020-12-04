import { writable } from 'svelte/store';

export let storeYear = writable(1961);

export let storeCategory = writable('rain');
