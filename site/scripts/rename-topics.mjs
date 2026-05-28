/** Renames `categories:` frontmatter to `topics:` in all posts */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../content/posts");
for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".md")) continue;
  const p = path.join(dir, file);
  let s = fs.readFileSync(p, "utf8");
  if (s.includes("categories:")) {
    s = s.replace(/^categories:/m, "topics:");
    fs.writeFileSync(p, s);
    console.log("Updated", file);
  }
}
