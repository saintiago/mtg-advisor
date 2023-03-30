import { createWriteStream } from "fs";
import { ScryfallStream } from "./ScryfallStream";
import { CardPropertiesTransform } from "./CardPropertiesTransform";
import { buildCardsInSetQuery } from "./scryfallApi";
import { CardCounterTransform } from "./CardCounterTransform";
import { CardNoReprintsTransform } from "./CardNoReprintsTransform";

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error("Usage: node main.js <set_code> <output_file_path>");
  process.exit(1);
}

const [setCode, outputFilePath] = args;

(async () => {
  try {
    const scryfallStream = new ScryfallStream(buildCardsInSetQuery(setCode));
    const format = new CardPropertiesTransform();
    const count = new CardCounterTransform();
    const skipReprints = new CardNoReprintsTransform();
    const write = createWriteStream(outputFilePath);

    count.on("cardCount", (count: number) => {
      console.log(`${count} cards grabbed successfully!`);
    });

    scryfallStream
      .pipe(skipReprints)
      .pipe(format)
      .pipe(count)
      .pipe(write)
      .on("error", (error) =>
        console.error(`Error writing to file: ${error.message}`)
      );
  } catch (error) {
    console.error(`Error creating ScryfallStream: ${error.message}`);
  }
})();
