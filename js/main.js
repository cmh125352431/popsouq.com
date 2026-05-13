// ===== Banner轮播 =====
// Get all banner items and dots
const bannerItems = document.querySelectorAll('.banner-item');
const dots = document.querySelectorAll('.banner-dots .dot');
const prevArrow = document.querySelector('.banner-arrows .prev');
const nextArrow = document.querySelector('.banner-arrows .next');
let currentIndex = 0;
let autoPlayInterval;

// Function to show banner by index
function showBanner(index) {
    // Remove active class from all items and dots
    bannerItems.forEach((item, i) => {
        item.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });
    
    // Add active class to current item and dot
    if (bannerItems[index]) bannerItems[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    
    currentIndex = index;
}

// ===== Language Switch =====
// Global function for dedicated onchange handlers
function switchLang(lang) {
    const currentPath = window.location.pathname;
    const fullPath = currentPath.split('/');
    const fileName = fullPath.pop() || 'index.html';
    const folderPath = currentPath.split(fileName)[0];
    
    let targetFile;
    
    if (lang === 'en') {
        // Switch to English version - add -en before .html
        if (fileName === 'index.html') {
            targetFile = 'index-en.html';
        } else if (fileName.includes('-en.html')) {
            // Already English
            targetFile = fileName;
        } else {
            targetFile = fileName.replace('.html', '-en.html');
        }
    } else {
        // Switch to Chinese version - remove -en from filename
        if (fileName === 'index-en.html') {
            targetFile = 'index.html';
        } else if (fileName.includes('-en.html')) {
            targetFile = fileName.replace('-en.html', '.html');
        } else {
            // Already Chinese
            targetFile = fileName;
        }
    }
    
    window.location.href = folderPath + targetFile;
}

// Event listener for dropdown (fallback)
const langSwitch = document.querySelector('.lang-switch select');
if (langSwitch && !langSwitch.hasAttribute('onchange')) {
    langSwitch.addEventListener('change', function() {
        switchLang(this.value);
    });
}

// Next banner
function nextBanner() {
    const nextIndex = (currentIndex + 1) % bannerItems.length;
    showBanner(nextIndex);
}

// Previous banner
function prevBanner() {
    const prevIndex = (currentIndex - 1 + bannerItems.length) % bannerItems.length;
    showBanner(prevIndex);
}

// Auto play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextBanner, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoPlay();
        showBanner(index);
        startAutoPlay();
    });
});

// Event listeners for arrows
if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        stopAutoPlay();
        prevBanner();
        startAutoPlay();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        stopAutoPlay();
        nextBanner();
        startAutoPlay();
    });
}

// Start auto play
if (bannerItems.length > 0) {
    startAutoPlay();
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
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('请填写必填项（姓名、邮箱、留言内容）');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址');
            return;
        }
        
        // Show success message (in production, this would send to a server)
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
                target.scrollIntoView({
                    behavior: 'smooth'
                });
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
