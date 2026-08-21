import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* =========================================
   SOURCE FILE
========================================= */

const sourcePath = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "historicalData.js"
);


/* =========================================
   OUTPUT FILE
========================================= */

const outputPath = path.join(
  __dirname,
  "historicalData.json"
);


/* =========================================
   READ SOURCE
========================================= */

const source = fs.readFileSync(
  sourcePath,
  "utf-8"
);


/* =========================================
   FIND searchData
========================================= */

const startMarker = "export const searchData =";

const startIndex = source.indexOf(startMarker);

if (startIndex === -1) {
  console.error(
    "Could not find 'export const searchData' in historicalData.js"
  );

  process.exit(1);
}


/* =========================================
   FIND ARRAY
========================================= */

const arrayStart = source.indexOf(
  "[",
  startIndex
);

if (arrayStart === -1) {
  console.error(
    "Could not find the searchData array."
  );

  process.exit(1);
}


/* =========================================
   FIND MATCHING ]
========================================= */

let depth = 0;
let arrayEnd = -1;

for (
  let i = arrayStart;
  i < source.length;
  i++
) {

  const character = source[i];

  if (character === "[") {
    depth++;
  }

  if (character === "]") {
    depth--;

    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }
}


if (arrayEnd === -1) {
  console.error(
    "Could not determine the end of searchData."
  );

  process.exit(1);
}


/* =========================================
   EXTRACT ARRAY
========================================= */

const arrayText = source.substring(
  arrayStart,
  arrayEnd + 1
);


/* =========================================
   CONVERT JS ARRAY TO OBJECT
========================================= */

let searchData;

try {

  searchData = Function(
    `"use strict"; return (${arrayText});`
  )();

} catch (error) {

  console.error(
    "Could not parse historicalData.js"
  );

  console.error(error);

  process.exit(1);
}


/* =========================================
   WRITE JSON
========================================= */

fs.writeFileSync(
  outputPath,
  JSON.stringify(searchData, null, 2),
  "utf-8"
);


/* =========================================
   RESULT
========================================= */

console.log(
  `Successfully exported ${searchData.length} records.`
);

console.log(
  `Saved to: ${outputPath}`
);