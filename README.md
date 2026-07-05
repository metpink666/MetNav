# MetNav — 液态玻璃导航

纯前端导航页，Docker 本地预览 + Cloudflare Pages 部署。

## 本地运行

```bash
docker build -t metnav .
docker run -d -p 8080:80 --name metnav metnav