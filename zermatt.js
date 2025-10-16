document.addEventListener("DOMContentLoaded", function () {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    // --- Hamburger Menu Logic (ชุดสมบูรณ์) ---
    const hamburger = document.getElementById("hamburger-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeIcon = document.getElementById("close-icon");

    if (hamburger && mobileMenu && closeIcon) {
        // เมื่อคลิก hamburger ให้เปิดเมนู
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.add("active");
        });

        // เมื่อคลิกไอคอนปิด 'X' ให้ปิดเมนู
        closeIcon.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    }
});
// --- Smooth Scroll for Scroll-Down Button ---
const scrollBtn = document.querySelector(".scroll-down-btn");
if (scrollBtn) {
    scrollBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

// --- Animate on Scroll using Intersection Observer ---
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add a delay if specified in data-delay attribute
                const delay = entry.target.getAttribute("data-delay");

                setTimeout(() => {
                    entry.target.classList.add("is-visible");
                }, delay || 0);

                // Stop observing the element after it has been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
    }
);

animatedElements.forEach((el) => {
    observer.observe(el);
});

// ✨ NEW: Lightbox Functionality
const lightbox = document.getElementById("lightbox");
if (lightbox) {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".lightbox-close");
    const triggerLinks = document.querySelectorAll(".timeline-lightbox-trigger");

    // Function to open the lightbox
    const openLightbox = (e) => {
        e.preventDefault();
        const link = e.currentTarget;
        lightboxImg.src = link.href;
        lightboxCaption.textContent = link.dataset.title;
        lightbox.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        lightbox.classList.remove("show");
        document.body.style.overflow = "auto";
    };

    // Add event listeners
    triggerLinks.forEach((link) => link.addEventListener("click", openLightbox));
    closeBtn.addEventListener("click", closeLightbox);

    // Close lightbox when clicking on the background
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('DOMContentLoaded', function() {

// --- Page Navigation Logic ---
    // 1. กำหนดลำดับของหน้าเว็บทั้งหมด
    const pages = [
        'index.html',
        'zurich.html',
        'lucerne.html',
        'interlaken.html',
        'zermatt.html'
    ];

    // 2. ค้นหาและตรวจสอบ Element ที่จำเป็น
    const currentPagePath = window.location.pathname;
    const currentPageFilename = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1) || 'home.html';
    const currentIndex = pages.indexOf(currentPageFilename);

    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    const navigatorContainer = document.querySelector('.page-navigator');

    // ถ้าไม่มีปุ่มบนหน้า ให้หยุดการทำงานทันที
    if (!prevBtn || !nextBtn || !navigatorContainer) {
        return;
    }

    // 3. ตั้งค่าการแสดงผลถาวรสำหรับหน้าแรกและหน้าสุดท้าย
    if (currentIndex <= 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.href = pages[currentIndex - 1];
    }

    if (currentIndex >= pages.length - 1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.href = pages[currentIndex + 1];
    }

    // 4. ตรรกะการซ่อน/แสดง เมื่อไม่มีการเคลื่อนไหว
    let inactivityTimer;

    function hideButtonsOnInactive() {
        if (!prevBtn.classList.contains('hidden')) {
             prevBtn.classList.add('inactive-hide');
        }
       if (!nextBtn.classList.contains('hidden')) {
            nextBtn.classList.add('inactive-hide');
       }
    }

    function handleUserActivity() {
        prevBtn.classList.remove('inactive-hide');
        nextBtn.classList.remove('inactive-hide');

        clearTimeout(inactivityTimer);

        inactivityTimer = setTimeout(hideButtonsOnInactive, 3000);
    }

    // 5. เพิ่ม Event Listener เพื่อตรวจจับการเคลื่อนไหว
    const activityEvents = ['mousemove', 'scroll', 'keydown', 'touchstart'];
    activityEvents.forEach(event => {
        window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // 6. ทำให้ปุ่มแสดงผลและเริ่มนับเวลาครั้งแรกเมื่อโหลดหน้าเว็บ
    navigatorContainer.classList.add('loaded');
    handleUserActivity();
}); 
}