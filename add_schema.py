#!/usr/bin/env python3
"""批量给 HTML 文件添加 JSON-LD 结构化数据"""

import re
import os

BASE_URL = "https://popsouq.com"

# 页面类型配置
PAGE_SCHEMAS = {
    "index": {
        "type": "WebSite",
        "name_zh": "厦门泓劲贸易有限公司",
        "name_en": "Xiamen Hongjin Trading Co., Ltd.",
    },
    "about": {
        "type": "AboutPage",
        "name_zh": "关于我们 - 厦门泓劲贸易",
        "name_en": "About Us - Xiamen Hongjin Trading",
    },
    "products": {
        "type": "CollectionPage",
        "name_zh": "产品展示 - 厦门泓劲贸易",
        "name_en": "Products - Xiamen Hongjin Trading",
    },
    "news": {
        "type": "Blog",
        "name_zh": "新闻动态 - 厦门泓劲贸易",
        "name_en": "News - Xiamen Hongjin Trading",
    },
    "contact": {
        "type": "ContactPage",
        "name_zh": "联系我们 - 厦门泓劲贸易",
        "name_en": "Contact Us - Xiamen Hongjin Trading",
    },
    "knowledge": {
        "type": "Article",
        "name_zh": "面料知识",
        "name_en": "Fabric Knowledge",
    }
}

def get_schema_markup(filename):
    """根据文件名生成对应的 JSON-LD"""
    basename = os.path.basename(filename)
    name_without_ext = os.path.splitext(basename)[0]
    
    # 判断中英文
    is_english = name_without_ext.endswith('-en')
    lang = 'en' if is_english else 'zh-CN'
    
    # 判断页面类型
    page_type = "WebSite"
    page_name = "厦门泓劲贸易有限公司"
    
    for key in PAGE_SCHEMAS:
        if key in name_without_ext:
            page_type = PAGE_SCHEMAS[key]["type"]
            page_name = PAGE_SCHEMAS[key]["name_en" if is_english else "name_zh"]
            break
    
    # 生成 JSON-LD
    json_ld = f'''    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "{page_type}",
      "name": "{page_name}",
      "url": "{BASE_URL}/{basename}",
      "inLanguage": "{lang}"
    }}
    </script>
'''
    
    return json_ld

def add_schema_to_html(filepath):
    """给 HTML 文件添加 JSON-LD"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已有 JSON-LD
    if 'application/ld+json' in content:
        print(f"  ⏭️  跳过（已有 JSON-LD）: {os.path.basename(filepath)}")
        return False
    
    # 在 </head> 前插入 JSON-LD
    schema_markup = get_schema_markup(filepath)
    new_content = content.replace('</head>', schema_markup + '    \n</head>')
    
    if new_content == content:
        print(f"  ⚠️  未找到 </head>: {os.path.basename(filepath)}")
        return False
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  ✅ 已添加: {os.path.basename(filepath)}")
    return True

def main():
    html_files = []
    for root, dirs, files in os.walk('.'):
        # 跳过 images, css, js 目录
        dirs[:] = [d for d in dirs if d not in ('images', 'css', 'js', 'knowledge')]
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    # 也处理 knowledge 目录
    knowledge_dir = './knowledge'
    if os.path.exists(knowledge_dir):
        for file in os.listdir(knowledge_dir):
            if file.endswith('.html'):
                html_files.append(os.path.join(knowledge_dir, file))
    
    print(f"找到 {len(html_files)} 个 HTML 文件\n")
    
    count = 0
    for filepath in sorted(html_files):
        if add_schema_to_html(filepath):
            count += 1
    
    print(f"\n✅ 完成！共处理 {count} 个文件")

if __name__ == '__main__':
    main()
