import { jpnCal } from "./jpnCal.mjs";
// @ts-ignore
import fs from "fs";
/** @type {number} */
// @ts-ignore
const targetYear = parseInt(process.argv[2]);
// 設定
const version = "0.7.0"
const jsonFilename = `dist/jpnCal${targetYear}.json`
const jsFilename = `dist/jpnCal${targetYear}.js`
const mjsFilename = `dist/jpnCal${targetYear}.mjs`


const jpnCalObj = {
  meta: {
    version: version,
    対象年: targetYear
  },
  カレンダー: jpnCal.create(targetYear),
  その他: {
    翌年3月まで: jpnCal.create(targetYear + 1).slice(0, 3)
  }
};

// json
fs.writeFileSync(jsonFilename, JSON.stringify(jpnCalObj, null, "  "));
// console.log(jpnCalJson);

// js
const js = `
function getJpnCal2024() {
  return ${JSON.stringify(jpnCalObj)}
}
`.trim();
fs.writeFileSync(jsFilename, js);


// mjs
const mjs = `
export function getJpnCal2024() {
  return ${JSON.stringify(jpnCalObj)}
}
`.trim();
fs.writeFileSync(mjsFilename, mjs);
