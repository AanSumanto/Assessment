#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import { LogToJson, LogToText, LogToTextSave } from "../utils.js";

const options = yargs(hideBin(process.argv))
  .scriptName("mytools")
  .usage("Usage: $0 <file>")
  .usage("Usage: $0 <file> -t [type] ")
  .usage("Usage: $0 <file> -o [output]")
  .usage("Usage: $0 <file> -t [type] -o [output]")
  .option("t", {
    alias: "convert",
    describe: "convert to specify file",
    type: "string",
  })
  .option("o", {
    alias: "output",
    describe: "store file to a path",
    type: "string",
  })
  .example([
    ["$0 error.log"],
    ["$0 error.log -t json/text"],
    ["$0 error.log -o /User/johnmayer/Desktop"],
    ["$0 error.log -t json/text -o /User/johnmayer/Desktop"],
  ])
  .help("help")
  .alias("help", "h")
  .version(false)
  .wrap(72).argv;

const __dirname = path.resolve();
const filePath = path.resolve(__dirname, `./var/log`);
const pathSave = path.resolve(__dirname, `./`);

if (options._.length == 0) {
  console.log(`Please type file to convert (ex:error.log)`);
} else if (
  options._.length > 0 &&
  options.convert == undefined &&
  options.output == undefined
) {
  let fileLog = fs.readFileSync(`${filePath}/${options._}`, "utf8");
  LogToText(fileLog);
  console.log(
    `convert file ${options._} to file text success! and store in ${__dirname}/errorLog.txt`
  );
} else if (options && options.convert && options.output == undefined) {
  if (options.convert == "text") {
    let fileLog = fs.readFileSync(`${filePath}/${options._}`, "utf8");
    LogToText(fileLog);
  } else if (options.convert == "json") {
    let fileLog = fs.readFileSync(`${filePath}/${options._}`, "utf8");
    const json = LogToJson(fileLog);
    fs.writeFileSync("errorLog.json", json);
  }
  console.log(
    `convert file ${options._} to file ${options.convert} success!  and store in ${__dirname}/errorLog.json`
  );
} else if (options && options.convert == undefined && options.output) {
  let fileLog = fs.readFileSync(`${filePath}/${options._}`, "utf8");
  LogToTextSave(fileLog, options.output);
  console.log(
    `convert file ${options._} to file text and save to ${
      __dirname + options.output
    } success!`
  );
} else if (options && options.convert && options.output) {
  if (options.convert == "text") {
    let fileLog = fs.readFileSync(`${filePath}/${options._}`, "utf8");
    LogToTextSave(fileLog, options.output);
  } else if (options.convert == "json") {
    let fileLog = fs.readFileSync(`${filePath}/${options._}`, "utf8");
    const json = LogToJson(fileLog);
    fs.writeFileSync(`${pathSave}/${options.output}/nginxLog.json`, json);
  }
  console.log(
    `convert file ${options._} to file ${options.convert} and save to ${
      __dirname + options.output
    } success!`
  );
}
