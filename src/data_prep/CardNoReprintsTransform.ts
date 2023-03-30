import { Transform, TransformCallback } from "stream";
import { MagicCard } from "./types";

export class CardNoReprintsTransform extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(
    card: MagicCard,
    encoding: BufferEncoding,
    callback: (error?: Error | null, data?: any) => void
  ) {
    try {
      if (!card.reprint) {
        this.push(card);
      }
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}
