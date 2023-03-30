import { Writable } from "stream";
import fs from "fs";
import { MagicCard } from "./types";

export class WriteToFileStream extends Writable {
  private fileStream: fs.WriteStream;

  constructor(outputFilePath: string) {
    super({ objectMode: true });
    this.fileStream = fs.createWriteStream(outputFilePath, {
      encoding: "utf8",
    });
  }

  _write(
    card: MagicCard,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ) {
    try {
      this.fileStream.write(`${card.name}\n`, "utf8", (error) => {
        if (error) {
          callback(error);
        } else {
          callback();
        }
      });
    } catch (error) {
      callback(error);
    }
  }

  _final(callback: (error?: Error | null) => void) {
    this.fileStream.end(() => {
      callback();
    });
  }
}
