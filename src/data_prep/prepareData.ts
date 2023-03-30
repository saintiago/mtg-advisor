import { ScryfallStream } from "./ScryfallStream";
import { WriteToFileStream } from "./WriteToFileStream";
import { buildCardsInSetQuery } from "./scryfallApi";

const outputFilePath = "./output/card_names.txt";

(async () => {
  try {
    const scryfallStream = new ScryfallStream(buildCardsInSetQuery("one"));
    const cardNameToFileStream = new WriteToFileStream(outputFilePath);

    scryfallStream.pipe(cardNameToFileStream);

    cardNameToFileStream.on("finish", () => {
      console.log("Card names written to file");
    });
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
})();
