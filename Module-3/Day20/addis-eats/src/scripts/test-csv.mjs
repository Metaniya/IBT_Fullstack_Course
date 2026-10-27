import assert from "node:assert/strict";
import { cell, toCsv } from "../src/lib/csv.mjs";

assert.equal(cell("plain"), "plain");
assert.equal(cell(null), "");
assert.equal(cell("Bole, Kitfo"), '"Bole, Kitfo"'); // a comma
assert.equal(cell('He said "hi"'), '"He said ""hi"""'); // a quotation mark
assert.equal(cell("line1\nline2"), '"line1\nline2"'); // a newline

const csv = toCsv(
  [{ key: "a", label: "A" }, { key: "b", label: "B" }],
  [{ a: 'Bole, "Kitfo"', b: 2 }]
);
assert.equal(csv, 'A,B\r\n"Bole, ""Kitfo""",2');

console.log("csv ok");

