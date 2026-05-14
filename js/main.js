// ===== Banner轮播 =====
const bannerItems = document.querySelectorAll('.banner-item');
const dots = document.querySelectorAll('.banner-dots .dot');
const prevArrow = document.querySelector('.banner-arrows .prev');
const nextArrow = document.querySelector('.banner-arrows .next');
let currentIndex = 0;
let autoPlayInterval;

function showBanner(index) {
    bannerItems.forEach((item, i) => {
        item.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });
    if (bannerItems[index]) bannerItems[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentIndex = index;
}

// ===== Custom Language Dropdown =====
function switchLang(lang) {
    const currentPath = window.location.pathname;
    const fullPath = currentPath.split('/');
    const fileName = fullPath.pop() || 'index.html';
    const folderPath = currentPath.split(fileName)[0];
    
    let targetFile;
    
    if (lang === 'en') {
        if (fileName === 'index.html') {
            targetFile = 'index-en.html';
        } else if (fileName.includes('-en.html')) {
            targetFile = fileName;
        } else {
            targetFile = fileName.replace('.html', '-en.html');
        }
    } else {
        if (fileName === 'index-en.html') {
            targetFile = 'index.html';
        } else if (fileName.includes('-en.html')) {
            targetFile = fileName.replace('-en.html', '.html');
        } else {
            targetFile = fileName;
        }
    }
    
    window.location.href = folderPath + targetFile;
}

// Custom dropdown toggle and click handling
const langDropdown = document.getElementById('langDropdown');
if (langDropdown) {
    const langCurrent = langDropdown.querySelector('.lang-current');
    const langOptions = langDropdown.querySelectorAll('.lang-option');

    // Toggle dropdown on click
    langCurrent.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('open');
    });

    // Handle option click
    langOptions.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            langDropdown.classList.remove('open');
            switchLang(lang);
        });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!langDropdown.contains(e.target)) {
            langDropdown.classList.remove('open');
        }
    });
}

// ===== Next/Prev Banner =====
function nextBanner() {
    const nextIndex = (currentIndex + 1) % bannerItems.length;
    showBanner(nextIndex);
}

function prevBanner() {
    const prevIndex = (currentIndex - 1 + bannerItems.length) % bannerItems.length;
    showBanner(prevIndex);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextBanner, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showBanner(index);
    });
});

if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        prevBanner();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        nextBanner();
    });
}

// ===== 移动端菜单 =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// ===== 联系表单 =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            alert('请填写必填项（姓名、邮箱、留言内容）');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址');
            return;
        }
        
        alert('感谢您的留言！我们会尽快与您联系。');
        contactForm.reset();
    });
}

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== 滚动时导航栏效果 =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 返回顶部功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTopBtn);
    
    // 滚动时显示/隐藏按钮
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 监听滚动事件
    window.addEventListener('scroll', toggleBackToTop);
});
