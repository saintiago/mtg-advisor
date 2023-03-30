import {MagicCard, MagicSet} from "./types";

const BASE_URL = 'https://api.scryfall.com';
const SEARCH = '/cards/search'
const SETS = '/sets'

const CUTOFF_DATE = '2021-09-01';

export function buildCardsInSetQuery(setCode: string): string {
    const encodedSetCode = encodeURIComponent(setCode);
    return `${BASE_URL}${SEARCH}?q=set%3A${encodedSetCode}`;
}

export function buildAllSetsQuery(): string {
    return `${BASE_URL}${SETS}`;
}

export function filterSetsByReleaseDate(sets: MagicSet[], date: string): MagicSet[] {
    const filterDate = new Date(date);
    return sets.filter((set) => set.released_at && (new Date(set.released_at) > filterDate));
}

export async function fetchJson(url: string): Promise<any> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
}

export async function fetchSetList() {
    try {
        const data = await fetchJson(buildAllSetsQuery());
        return data.data;
    } catch (error) {
        console.error('Error fetching set list:', error);
        return [];
    }
}

export async function fetchCardsFromSetsAfterDate(): Promise<MagicCard[]> {
    const allSetsUrl = buildAllSetsQuery();
    const allSets = await fetchJson(allSetsUrl);
    const filteredSets = filterSetsByReleaseDate(allSets.data, CUTOFF_DATE);

    const fetchCardsPromises = filteredSets.map(async (set: MagicSet) => {
        const setCardsUrl = buildCardsInSetQuery(set.code);
        const setCards = await fetchJson(setCardsUrl);
        return setCards.data as MagicCard[];
    });

    const cardsArrays = await Promise.all(fetchCardsPromises);
    return ([] as MagicCard[]).concat(...cardsArrays);
}