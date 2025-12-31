import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const year = new Date().getFullYear();
//const dir = "/Users/fukuno/res/log/fukuno.jig.jp";
const dir = "./log/fukuno.jig.jp/" + year + "/";

const start2024 = 4177;
const start = start2024 + Day.getLengthOfYear(2024);
const nlen = Day.getLengthOfYear(year);
//console.log(nlen, start + nlen)
//Deno.exit();

const fns = await dir2array(dir);

const histo = {};
for (const fn of fns) {
  if (!fn.endsWith(".log")) continue;
  console.log(fn);
  const data = (await Deno.readTextFile(dir + "/" + fn)).split("\n");
  for (const s of data) {
    const ss = s.split("\t");
    //console.log(ss);
    //Deno.exit();
    const path = ss[1];
    if (histo[path] === undefined) {
      histo[path] = 1;
    } else {
      histo[path]++;
    }
  }
  //break;
}
//console.log(histo);
const ranking0 = Object.entries(histo);
const ranking1 = ranking0.filter(i => parseInt(i[0].substring(1)).toString() == i[0].substring(1));
const ranking = ranking1.filter(i => parseInt(i[0].substring(1)) >= start && parseInt(i[0].substring(1)) < start + nlen);
ranking.sort((a, b) => b[1] - a[1]);
for (let i = 0; i < nlen - 1; i++) {
  console.log(ranking[i]);
}
ranking.unshift(["path", "pv"]);
await Deno.writeTextFile("ranking-" + year + ".csv", CSV.encode(ranking));
