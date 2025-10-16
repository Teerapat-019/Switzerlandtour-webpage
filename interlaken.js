document.addEventListener("DOMContentLoaded", function() {

 // --- Navbar Scroll Effect ---
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

// ---  โค้ดควบคุม Hamburger Menu (เปิด/ปิด) ---
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

    // --- 2. Hero Background Parallax Effect ---
    const parallaxBg = document.querySelector('.hero-bg-parallax');
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        // เคลื่อนที่พื้นหลังด้วยความเร็วครึ่งหนึ่งของการ scroll
        parallaxBg.style.transform = `translateY(${offset * 0.5}px)`;
    });

    // --- 3. Advanced Animate on Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // เพิ่ม delay ถ้ามีการกำหนดค่าใน data-delay
                const delay = entry.target.getAttribute('data-delay');
                
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay || 0);
                
                // หยุด observe หลังจากแสดงผลแล้ว เพื่อไม่ให้ animation เล่นซ้ำ
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // เริ่มทำงานเมื่อ element แสดงผล 15%
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

// --- 4. Lightbox Functionality (เพิ่มโค้ดส่วนนี้) ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        const attractionLinks = document.querySelectorAll('.attraction-card-link');

        attractionLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // ป้องกันไม่ให้ลิงก์ทำงานปกติ
                lightbox.classList.add('show');
                lightboxImg.src = this.href;
                lightboxCaption.innerHTML = this.getAttribute('data-caption');
                document.body.style.overflow = 'hidden'; // ป้องกันการ scroll ขณะเปิด lightbox
            });
        });

        // ฟังก์ชันสำหรับปิด Lightbox
        function closeLightbox() {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto'; // คืนค่าให้ scroll ได้
        }

        closeBtn.addEventListener('click', closeLightbox);

        // ปิด Lightbox เมื่อคลิกที่พื้นหลัง
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
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