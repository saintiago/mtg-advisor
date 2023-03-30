export type UUID = string;
export type URI = string;
export type Colors = string[];

export type MagicSet = {
    id: string;
    code: string;
    mtgo_code?: string;
    tcgplayer_id?: number;
    name: string;
    set_type: string;
    released_at?: string;
    block_code?: string;
    block?: string;
    parent_set_code?: string;
    card_count: number;
    printed_size?: number;
    digital: boolean;
    foil_only: boolean;
    nonfoil_only: boolean;
    scryfall_uri: string;
    uri: string;
    icon_svg_uri: string;
    search_uri: string;
};

interface CardFace {
    artist?: string;
    cmc?: number;
    color_indicator?: Colors;
    colors?: Colors;
    flavor_text?: string;
    illustration_id?: UUID;
    image_uris?: Record<string, string>;
    layout?: string;
    loyalty?: string;
    mana_cost: string;
    name: string;
    object: string;
    oracle_id?: UUID;
    oracle_text?: string;
    power?: string;
    printed_name?: string;
    printed_text?: string;
    printed_type_line?: string;
    toughness?: string;
    type_line?: string;
    watermark?: string;
}

export interface MagicCard {
    arena_id?: number;
    id: UUID;
    lang: string;
    mtgo_id?: number;
    mtgo_foil_id?: number;
    multiverse_ids?: number[];
    tcgplayer_id?: number;
    tcgplayer_etched_id?: number;
    cardmarket_id?: number;
    object: string;
    oracle_id: UUID;
    prints_search_uri: URI;
    rulings_uri: URI;
    scryfall_uri: URI;
    uri: URI;
    all_parts?: CardFace[];
    card_faces?: CardFace[];
    cmc: number;
    color_identity: Colors;
    color_indicator?: Colors;
    colors?: Colors;
    edhrec_rank?: number;
    hand_modifier?: string;
    keywords: string[];
    layout: string;
    legalities: Record<string, string>;
    life_modifier?: string;
    loyalty?: string;
    mana_cost?: string;
    name: string;
    oracle_text?: string;
    oversized: boolean;
    penny_rank?: number;
    power?: string;
    produced_mana?: Colors;
    reserved: boolean;
    toughness?: string;
    type_line: string;
}

export interface ListObject<T> {
    data: Array<T>;
    has_more: boolean;
    next_page?: URI;
    total_cards?: number;
    warnings?: Array<string>;
}