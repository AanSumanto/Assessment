import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const pathSave = path.resolve(__dirname, `./`);

export const LogToJson = (log) => {
  var array = log.toString().split("\r");
  let result = [];
  let headers = array[0].split(", ");
  for (let i = 1; i < array.length - 1; i++) {
    let obj = {};
    let str = array[i];
    let s = "";
    let flag = 0;
    for (let ch of str) {
      if (ch === '"' && flag === 0) {
        flag = 1;
      } else if (ch === '"' && flag == 1) flag = 0;
      if (ch === ", " && flag === 0) ch = "|";
      if (ch !== '"') s += ch;
    }
    let properties = s.split("|");
    for (let j in headers) {
      if (properties[j].includes(", ")) {
        obj[headers[j]] = properties[j].split(", ").map((item) => item.trim());
      } else obj[headers[j]] = properties[j];
    }
    result.push(obj);
  }
  let json = JSON.stringify(result);
  return json;
};

export const LogToText = (log) => {
  const myConsole = new console.Console(fs.createWriteStream("./errorLog.txt"));
  return myConsole.log(log);
};

export const LogToTextSave = (log, output) => {
  const myConsole = new console.Console(
    fs.createWriteStream(`${pathSave}/${output}/nginxLog.txt`)
  );
  return myConsole.log(log);
};
