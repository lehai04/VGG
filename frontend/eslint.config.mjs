/** ESLint: rule Next.js Core Web Vitals + TypeScript. npm run lint */
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", ".npm-cache/**", "coverage/**", "next-env.d.ts"]),
]);
