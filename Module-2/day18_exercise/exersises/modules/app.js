// app.js - imports and uses the money module

import { addVat, VAT } from "./money.js";

console.log(`Current VAT rate: ${VAT * 100}%`);
console.log(`1000 ETB with VAT: ${addVat(1000)} ETB`);
