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

  document.addEventListener("DOMContentLoaded", () => {
    const prompt = document.querySelector(".scroll-prompt");

    window.addEventListener("scroll", () => {
      // เมื่อผู้ใช้เลื่อนหน้าจอ (ค่า scrollY มากกว่า 0)
      if (window.scrollY > 0) {
        prompt.style.opacity = "0"; // ทำให้จางหายไป
        prompt.style.pointerEvents = "none"; // ทำให้คลิกทะลุได้
      } else {
        prompt.style.opacity = "1"; // แสดงผลถ้ายังอยู่ด้านบนสุด
        prompt.style.pointerEvents = "auto";
      }
    });
  });

  const fadeSections = document.querySelectorAll(".fade-section");

  const options = {
    threshold: 0.15, // 15% ของพื้นที่ section ปรากฏ จึงเริ่ม animation
  };

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

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // เล่น animation แค่ครั้งเดียว
      }
    });
  }, options);

  fadeSections.forEach((section) => {
    observer.observe(section);
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
    // หน้าแรก: ซ่อนปุ่ม "ย้อนกลับ"
    if (currentIndex <= 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.href = pages[currentIndex - 1];
    }

    // หน้าสุดท้าย: ซ่อนปุ่ม "ถัดไป"
    if (currentIndex >= pages.length - 1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.href = pages[currentIndex + 1];
    }

    // 4. ตรรกะการซ่อน/แสดง เมื่อไม่มีการเคลื่อนไหว
    let inactivityTimer; // ตัวแปรสำหรับเก็บ timer

    // ฟังก์ชันสำหรับ "ซ่อน" ปุ่ม (เพิ่มคลาส inactive-hide)
    function hideButtonsOnInactive() {
        // ตรวจสอบก่อนว่าปุ่มไม่ได้ถูกซ่อนถาวร แล้วค่อยเพิ่มคลาสซ่อนชั่วคราว
        if (!prevBtn.classList.contains('hidden')) {
             prevBtn.classList.add('inactive-hide');
        }
       if (!nextBtn.classList.contains('hidden')) {
            nextBtn.classList.add('inactive-hide');
       }
    }

    // ฟังก์ชันสำหรับ "แสดง" ปุ่ม และ "รีเซ็ต" เวลานับถอยหลัง
    function handleUserActivity() {
        // แสดงปุ่ม (ลบคลาส inactive-hide)
        prevBtn.classList.remove('inactive-hide');
        nextBtn.classList.remove('inactive-hide');

        // เคลียร์ timer เก่า (ถ้ามี)
        clearTimeout(inactivityTimer);

        // ตั้ง timer ใหม่ให้ซ่อนปุ่มในอีก 3 วินาที (3000 มิลลิวินาที)
        inactivityTimer = setTimeout(hideButtonsOnInactive, 3000);
    }

    // 5. เพิ่ม Event Listener เพื่อตรวจจับการเคลื่อนไหว
    const activityEvents = ['mousemove', 'scroll', 'keydown', 'touchstart'];
    activityEvents.forEach(event => {
        window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // 6. ทำให้ปุ่มแสดงผลและเริ่มนับเวลาครั้งแรกเมื่อโหลดหน้าเว็บ
    navigatorContainer.classList.add('loaded');
    handleUserActivity(); // เรียกเพื่อให้ปุ่มแสดงและเริ่มนับ 3 วินาทีแรก
});