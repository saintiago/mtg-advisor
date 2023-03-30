import { Readable } from 'stream';
import { ListObject, MagicCard, URI } from "./types";
import { fetchJson } from "./scryfallApi";

export class ScryfallStream extends Readable {
  private nextPage: URI;

  constructor(initialUrl: string) {
    super({ objectMode: true });
    this.nextPage = initialUrl;
  }

  async _read() {
    if (!this.nextPage) {
      this.push(null);
      return;
    }

    try {
      const listObject: ListObject<MagicCard> = await fetchJson(this.nextPage);;

      listObject.data.forEach((card) => {
        this.push(card);
      });

      if (listObject.has_more) {
        this.nextPage = listObject.next_page!;
      } else {
        this.push(null);
      }
    } catch (error) {
      this.emit('error', error);
    }
  }
}
