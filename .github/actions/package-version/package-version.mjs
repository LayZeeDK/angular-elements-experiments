import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

function updatePackageVersion(name, version) {
  // Read package.json
  const packageJsonPath = path.resolve(__dirname, "../../../package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
  // Locate package
  // Change package version
  packageJson.dependencies[name] = version;
  // Write to package.json
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Not available in an ES Module as of Node.js 12.x
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];
const version = process.argv[3];

updatePackageVersion(name, version);
