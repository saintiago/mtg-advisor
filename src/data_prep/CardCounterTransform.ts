import { Transform, TransformCallback } from "stream";
import { MagicCard } from "./types";

export class CardCounterTransform extends Transform {

  private cardCount: number;

  constructor() {
    super({ objectMode: true });
    this.cardCount = 0;
  }

  _transform(
    card: MagicCard,
    encoding: BufferEncoding,
    callback: (error?: Error | null, data?: any) => void
  ) {
    try {
      this.push(card);
      this.cardCount++;
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  _flush(callback: TransformCallback): void {
    this.emit("cardCount", this.cardCount);
    callback();
  }
}
