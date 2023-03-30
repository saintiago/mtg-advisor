import { Transform } from "stream";
import { MagicCard } from "./types";

export class CardPropertiesTransform extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(
    chunk: MagicCard,
    encoding: BufferEncoding,
    callback: (error?: Error | null, data?: any) => void
  ) {
    try {
      const cardString = this.formatCardProperties(chunk);
      this.push(cardString);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  formatCardProperties(card: MagicCard): string {
    const {
      name,
      type_line: type,
      mana_cost: manaCost,
      colors,
      rarity,
      oracle_text: text,
      power,
      toughness,
      loyalty,
      set,
      collector_number: cardNumber,
      artist,
      flavor_text: flavorText,
    } = card;

    return `Name: ${name}
Type: ${type}
Mana Cost: ${manaCost}
Colors: ${colors && colors.join(", ")}
Rarity: ${rarity}
Text: ${text}
Power: ${power || ""}
Toughness: ${toughness || ""}
Loyalty: ${loyalty || ""}
Set: ${set}
Card Number: ${cardNumber}
Artist: ${artist}
Flavor Text: ${flavorText || ""}
-----
`;
  }
}
