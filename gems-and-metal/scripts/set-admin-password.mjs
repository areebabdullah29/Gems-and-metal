import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import bcrypt from "bcryptjs";

const ENV_PATH = ".env.local";

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });
  const password = await rl.question(
    "Set the admin password for the /admin dashboard: "
  );
  rl.close();

  if (!password || password.length < 8) {
    console.error("Password must be at least 8 characters. Try again.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  const sessionSecret = randomBytes(32).toString("hex");

  let existing = "";
  if (existsSync(ENV_PATH)) {
    existing = readFileSync(ENV_PATH, "utf-8");
  }

  const lines = existing
    .split("\n")
    .filter(
      (line) =>
        line &&
        !line.startsWith("ADMIN_PASSWORD_HASH=") &&
        !line.startsWith("ADMIN_SESSION_SECRET=")
    );

  // Escape "$" so Next.js's .env variable-expansion doesn't mangle the bcrypt hash
  // (bcrypt hashes are full of "$algorithm$cost$salthash" delimiters).
  const escapedHash = hash.replace(/\$/g, "\\$");
  lines.push(`ADMIN_PASSWORD_HASH=${escapedHash}`);
  lines.push(`ADMIN_SESSION_SECRET=${sessionSecret}`);

  writeFileSync(ENV_PATH, lines.join("\n") + "\n", "utf-8");

  console.log(`\nDone. Admin credentials written to ${ENV_PATH}.`);
  console.log("Restart the dev server, then sign in at /admin with the password you just set.");
}

main();
