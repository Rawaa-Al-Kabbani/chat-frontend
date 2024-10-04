import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5000/graphql",
  documents: ["src/**/*.ts"],
  generates: {
    "./src/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};
export default config;
