import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGitHubActions && repositoryName ? `/${repositoryName}` : "";
const assetPrefix =
  isGitHubActions && repositoryName ? `/${repositoryName}/` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath } : {}),
  ...(assetPrefix ? { assetPrefix } : {}),
};

export default nextConfig;
