// next.config.js
const isProd = process.env.NODE_ENV === 'production';

const repositoryName = '/memorandum'; // あなたのGitHubリポジトリ名

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    basePath: isProd ? `/${repositoryName}` : '',
    assetPrefix: isProd ? `/${repositoryName}/` : '',
}

module.exports = nextConfig
