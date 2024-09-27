// next.config.js
const isProd = process.env.NODE_ENV === 'production';

const repositoryName = 'komasandesu.github.io/memorandum'; // あなたのGitHubリポジトリ名

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    basePath: isProd ? `/${repositoryName}` : '',
    assetPrefix: isProd ? `/${repositoryName}/` : '',
}

module.exports = nextConfig
