import { Transform } from "stream";
import { MagicCard } from "./types";
import { createObjectCsvStringifier } from "csv-writer";

const csvStringifier = createObjectCsvStringifier({
  header: [
    { id: "prompt", title: "PROMPT" },
    { id: "completion", title: "COMPLETION" },
  ],
});

export class CardPropertiesTransform extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(
    card: MagicCard,
    encoding: BufferEncoding,
    callback: (error?: Error | null, data?: any) => void
  ) {
    try {
      const cardString = this.formatCardProperties(card);
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
      cmc,
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

    return csvStringifier.stringifyRecords([
      {
        prompt: name,
        completion: `Name: ${name}
Type: ${type}
Mana cost: ${manaCost}
Colors: ${colors && colors.join(", ")}
CMC: ${cmc}
Rarity: ${rarity}
Text: ${text}
Power: ${power || ""}
Toughness: ${toughness || ""}
Loyalty: ${loyalty || ""}
Set: ${set}
Card number: ${cardNumber}
Artist: ${artist}
Flavor text: ${flavorText || ""}`,
      },
    ]);
  }
}
