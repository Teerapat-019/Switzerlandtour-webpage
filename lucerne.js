document.addEventListener("DOMContentLoaded", function() {

    // --- Navbar Scroll Effect (คงเดิม) ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /// --- Hamburger Menu Logic (ชุดสมบูรณ์) ---
  const hamburger = document.getElementById('hamburger-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeIcon = document.getElementById('close-icon');

  if (hamburger && mobileMenu && closeIcon) {
    // เมื่อคลิก hamburger ให้เปิดเมนู
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // เมื่อคลิกไอคอนปิด 'X' ให้ปิดเมนู
    closeIcon.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
  }
  
    // --- NEW: Advanced Animate on Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay');
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay || 0);
                
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of the element is visible
    });

          let lastScrollTop = 0; // เก็บตำแหน่งการเลื่อนครั้งล่าสุด
  const indicator = document.getElementById("scroll-indicator");
  const hideThreshold = 50; // กำหนดระยะเลื่อน (เป็นพิกเซล) ที่จะเริ่มซ่อนคำว่า "เลื่อน"
  const showThreshold = 20; // กำหนดระยะเลื่อน (เป็นพิกเซล) ที่ต่ำกว่าจุดเริ่มต้น ที่จะแสดงคำว่า "เลื่อน"

  // ฟังก์ชันที่จะทำงานทุกครั้งที่มีการเลื่อนหน้าจอ
  window.addEventListener(
    "scroll",
    function () {
      // ตำแหน่งการเลื่อนปัจจุบัน (สำหรับหน้าต่างเบราว์เซอร์ทั้งหมด)
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      // 1. **เงื่อนไขการซ่อน (เลื่อนลง)**
      // ถ้าเลื่อนลง (currentScroll > lastScrollTop) และตำแหน่งเลื่อนเกินเกณฑ์ที่กำหนด
      if (currentScroll > lastScrollTop && currentScroll > hideThreshold) {
        // เลื่อนลง: ซ่อนตัวบ่งชี้ (เพิ่ม class 'hide')
        indicator.classList.add("hide");
      }

      // 2. **เงื่อนไขการแสดง (เลื่อนกลับขึ้น หรืออยู่ใกล้จุดเริ่มต้น)**
      // ถ้าเลื่อนขึ้น (currentScroll < lastScrollTop)
      // หรือ ตำแหน่งการเลื่อนอยู่ใกล้จุดเริ่มต้น (currentScroll <= showThreshold)
      else if (currentScroll <= showThreshold) {
        // เลื่อนขึ้น หรืออยู่ใกล้จุดเริ่มต้น: แสดงตัวบ่งชี้ (ลบ class 'hide')
        indicator.classList.remove("hide");
      }

      // อัพเดทตำแหน่งการเลื่อนล่าสุดสำหรับรอบถัดไป
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // ป้องกันค่าติดลบ
    },
    false
  ); // 'false' หมายถึงไม่ใช้ capture phase

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Page Navigation Logic ---

    // --- 1. การตั้งค่าพื้นฐาน (เหมือนเดิม) ---
    const pages = [
        'index.html',
        'zurich.html',
        'lucerne.html',
        'interlaken.html',
        'zermatt.html'
    ];
    const currentPagePath = window.location.pathname;
    const currentPageFilename = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1) || 'home.html';
    const currentIndex = pages.indexOf(currentPageFilename);

    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    const navigatorContainer = document.querySelector('.page-navigator');

    if (!prevBtn || !nextBtn || !navigatorContainer) return;

    // --- 2. การกำหนดลิงก์ (เหมือนเดิม) ---
    if (currentIndex > 0) {
        prevBtn.href = pages[currentIndex - 1];
    } else {
        prevBtn.classList.add('hidden');
    }

    if (currentIndex < pages.length - 1) {
        nextBtn.href = pages[currentIndex + 1];
    } else {
        nextBtn.classList.add('hidden');
    }

    // --- 3. เพิ่มตรรกะการจับเวลา (ส่วนที่แก้ไข) ---

    let inactivityTimer; // ตัวแปรสำหรับเก็บ timer

    // ฟังก์ชันสำหรับ "ซ่อน" ปุ่ม
    function hideButtonsOnInactive() {
        prevBtn.classList.add('inactive-hide');
        nextBtn.classList.add('inactive-hide');
    }

    // ฟังก์ชันสำหรับ "แสดง" ปุ่ม และ "รีเซ็ต" เวลานับถอยหลัง
    function showButtonsAndResetTimer() {
        // แสดงปุ่ม
        prevBtn.classList.remove('inactive-hide');
        nextBtn.classList.remove('inactive-hide');

        // เคลียร์ timer เก่า (ถ้ามี)
        clearTimeout(inactivityTimer);

        // ตั้ง timer ใหม่ให้ซ่อนปุ่มในอีก 3 วินาที (3000 มิลลิวินาที)
        inactivityTimer = setTimeout(hideButtonsOnInactive, 3000);
    }

    // รายการของ "การเคลื่อนไหว" ที่เราจะตรวจจับ
    const activityEvents = ['mousemove', 'scroll', 'keydown', 'touchstart'];

    // เพิ่ม Event Listener ให้ตรวจจับทุกการเคลื่อนไหว
    // เมื่อมีการเคลื่อนไหวเกิดขึ้น จะเรียกใช้ฟังก์ชัน showButtonsAndResetTimer
    activityEvents.forEach(event => {
        window.addEventListener(event, showButtonsAndResetTimer);
    });

    // --- 4. ทำให้ปุ่มแสดงผลเมื่อโหลดหน้าเว็บเสร็จ ---
    navigatorContainer.classList.add('loaded');

    // เรียกใช้ฟังก์ชันครั้งแรกเพื่อให้ปุ่มแสดงและเริ่มนับเวลา
    showButtonsAndResetTimer();
});