import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to frontend/scripts directory
const srcDir = path.resolve(__dirname, "../../Backend");
const destDir = path.resolve(__dirname, "../public/registration");

console.log(`[copy-backend] Copying ${srcDir} -> ${destDir}...`);

if (!fs.existsSync(srcDir)) {
  console.error(`[copy-backend] Error: Source directory "${srcDir}" does not exist.`);
  process.exit(1);
}

// Remove old destination directory if present
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}

// Create destination and copy recursively
fs.mkdirSync(destDir, { recursive: true });
fs.cpSync(srcDir, destDir, { recursive: true });

console.log("[copy-backend] Successfully copied Backend files to public/registration.");
