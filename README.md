# popsouq.com

厦门泓劲贸易有限公司官方网站

## 项目结构

```
popsouq.com/
├── index.html          # 中文首页
├── index-en.html       # 英文首页
├── css/
│   ├── style.css       # 主样式
│   └── responsive.css  # 响应式样式
├── js/
│   └── main.js         # 主脚本
└── images/             # 图片资源
    ├── logo.svg
    ├── banner1.svg
    ├── banner2.svg
    └── product-placeholder.svg
```

## 公司信息

- **公司名称**: 厦门泓劲贸易有限公司 (Xiamen Hungjin Trading Co., Ltd.)
- **成立时间**: 2009年
- **地址**: 福建省厦门市湖里区兴隆路 88-5-101
- **电话**: (86) 592-5986779 / 13720877338
- **传真**: (86) 592-5986619
- **邮箱**: qy125100@hungjintrade.com
- **主营业务**: 经编和纬编面料，包括涤氨、锦氨、四面弹、超细无光布等

## 部署

### GitHub Pages

1. 创建 GitHub 仓库
2. 推送代码到仓库
3. 在仓库设置中启用 GitHub Pages
4. 选择部署分支（通常是 main 或 gh-pages）

### 本地预览

直接在浏览器中打开 `index.html` 文件，或使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .
```

然后访问 http://localhost:8000

## 待完善

- [ ] 替换占位图片为实际产品图片
- [ ] 创建产品详情页面
- [x] 创建关于我们页面
- [x] 创建新闻动态页面
- [x] 创建联系我们页面
- [x] 添加产品知识文章页面
- [ ] 配置表单后端处理（需在 Web3Forms 注册获取 access_key）
- [x] SEO 优化（sitemap.xml, robots.txt, Open Graph）
- [ ] 添加网站统计代码

## 技术栈

- HTML5
- CSS3 (Flexbox + Grid)
- Vanilla JavaScript
- 响应式设计

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动端浏览器

## 许可证

&copy; 2009-2026 厦门泓劲贸易有限公司 版权所有
