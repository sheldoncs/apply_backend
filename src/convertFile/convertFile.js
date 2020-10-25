import fs from "fs";
import Blob from "node-blob";
import FileReader from "filereader";

const readImageFile = (file) => {
  // read binary data from a file:
  const bitmap = fs.readFileSync(file);
  const buf = new Buffer.from(bitmap);
  const blob = new Blob(bitmap, { type: "image/png" });

  return buf.toString("base64");
};

export default readImageFile;
