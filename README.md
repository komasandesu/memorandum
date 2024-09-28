# このリポジトリについて

mdxで保存できるブログです。GitHub Actionを使用してGitHub Pagesにデプロイしています。

リンクはこちら: <https://komasandesu.github.io/memorandum/>

## Docker上で起動

```bash
docker-compose run -w /app --rm next yarn install
docker compose up -d
#シェルに入る
docker exec -it <コンテナ名> sh
```
