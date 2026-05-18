# popsouq.com 无障碍修复 - 2026-05-16 20:50

## 修复项

| # | 项目 | 状态 |
|---|------|------|
| 1 | hreflang 标签 | ✅ 已存在 |
| 2 | apple-touch-icon | ✅ 已存在 |
| 3 | 404.html lang 属性 | ✅ 已是 zh-CN |
| 4 | 知识子页 meta description | ✅ 全部已有 |
| 5 | prefers-reduced-motion | ✅ 已添加 |

## prefers-reduced-motion 说明

为尊重用户的"减少动画"系统偏好设置，添加了以下CSS规则：

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

这会让网站在用户开启"减少动态效果"时：
- 禁用所有动画
- 禁用过渡效果
- 使用即时滚动

## CSS版本

v=50 → v=51

## 涉及文件

- css/style.css（新增 prefers-reduced-motion 规则）
- css/style.min.css（重新压缩）
- 所有HTML文件（版本号更新为 v=51）
