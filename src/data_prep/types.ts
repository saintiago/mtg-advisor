export type UUID = string;
export type URI = string;
type Colors = "W" | "U" | "B" | "R" | "G";

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

export interface CardFace {
  artist?: string;
  cmc?: number;
  color_indicator?: Colors[];
  colors?: Colors[];
  flavor_text?: string;
  illustration_id?: string;
  image_uris?: Record<string, string>;
  layout?: string;
  loyalty?: string;
  mana_cost: string;
  name: string;
  object: string;
  oracle_id?: string;
  oracle_text?: string;
  power?: string;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  toughness?: string;
  type_line?: string;
  watermark?: string;
}

export interface RelatedCard {
  id: string;
  object: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

export interface MagicCard {
  arena_id?: number;
  id: string;
  lang: string;
  mtgo_id?: number;
  mtgo_foil_id?: number;
  multiverse_ids?: number[];
  tcgplayer_id?: number;
  tcgplayer_etched_id?: number;
  cardmarket_id?: number;
  object: string;
  oracle_id: string;
  prints_search_uri: string;
  rulings_uri: string;
  scryfall_uri: string;
  uri: string;
  all_parts?: RelatedCard[];
  card_faces?: CardFace[];
  cmc: number;
  color_identity: Colors[];
  color_indicator?: Colors[];
  colors?: Colors[];
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
  produced_mana?: Colors[];
  reserved: boolean;
  toughness?: string;
  type_line: string;
  artist?: string;
  attraction_lights?: string[];
  booster: boolean;
  border_color: string;
  card_back_id: string;
  collector_number: string;
  content_warning?: boolean;
  digital: boolean;
  finishes: string[];
  flavor_name?: string;
  flavor_text?: string;
  frame_effects?: string[];
  frame: string;
  full_art: boolean;
  games: string[];
  highres_image: boolean;
  illustration_id?: string;
  image_status: string;
  image_uris?: Record<string, string>;
  prices: Record<string, string>;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  promo: boolean;
  promo_types?: string[];
  purchase_uris: Record<string, string>;
  rarity: string;
  related_uris: Record<string, string>;
  released_at: string;
  reprint: boolean;
  scryfall_set_uri: string;
  set_name: string;
  set_search_uri: string;
  set_type: string;
  set_uri: string;
  set: string;
  set_id: string;
  story_spotlight: boolean;
  textless: boolean;
  variation: boolean;
  variation_of?: string;
  security_stamp?: string;
  watermark?: string;
  preview?: {
    previewed_at?: string;
    source_uri?: string;
    source?: string;
  };
}

export interface ListObject<T> {
  data: Array<T>;
  has_more: boolean;
  next_page?: URI;
  total_cards?: number;
  warnings?: Array<string>;
}
