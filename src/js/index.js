window.addEventListener("load", () => {
  // elements
  let navMenu = document.getElementById("navMenu");
  let navContainer = document.getElementById("navContainer");
  const navUl = document.getElementById("navUl");
  let closeMenu = document.getElementById("closeMenu");
  let closeIcon = document.getElementById("closeIcon");
  const githubButton = document.getElementById("githubButton");
  let menuTimeline;
  let navOpen = false;
  const swiperUIUX = new Swiper(".swiper_uiux", {
    direction: "horizontal",
    slidesPerView: "auto",
    navigation: {
      nextEl: ".right",
      prevEl: ".left",
    },
    scrollbar: {
      el: ".uxui-swiper-scrollbar",
      hide: false,
    },
  });

  const swiperCanvas = new Swiper(".swiper_canvas", {
    direction: "horizontal",
    slidesPerView: "auto",
    navigation: {
      nextEl: ".canvas_btn_right",
      prevEl: ".canvas_btn_left",
    },
    scrollbar: {
      el: ".canvas-swiper-scrollbar",
      hide: false,
    },
  });
  /*--FUNCTIONS--*/
  function init() {
    loadParticles();
    eventListeners();
    setTimeline();
  }
  function loadParticles() {
    particlesJS.load("particles-js", "./js/particles.json", function () {});
  }

  function eventListeners() {
    navMenu.addEventListener(
      "click",
      (e) => {
        navOpen = true;
        toggle(e);
      },
      false
    );
    closeMenu.addEventListener(
      "click",
      (e) => {
        navOpen = false;
        toggle(e);
      },
      false
    );
    closeIcon.addEventListener(
      "click",
      (e) => {
        navOpen = false;
        toggle(e);
      },
      false
    );

    window.addEventListener(
      "resize",
      debounce(() => {
        if (navOpen) {
          navOpen = false;
          menuTimeline.reverse();
        }
      }, 20),
      false
    );

    githubButton.addEventListener(
      "click",
      () => {
        window.open("https://github.com/Orzoon", "_blank");
      },
      false
    );
  }
  function setTimeline() {
    menuTimeline = gsap.timeline();
    menuTimeline.pause();
    menuTimeline
      .to(navContainer, {
        right: "0%",
        duration: 0.3,
        ease: "ease-in",
      })
      .to(
        navUl,
        {
          width: "250px",
          duration: 0.4,
          ease: "ease-in",
        },
        "<0.3"
      );
  }
  function toggle(e) {
    e.preventDefault();
    if (navOpen) {
      menuTimeline.play();
      window.addEventListener("click", outsideClick, false);
    } else {
      window.removeEventListener("click", outsideClick, false);
      menuTimeline.reverse();
    }
  }
  function outsideClick(e) {
    if (e.target.contains(navContainer) && navOpen) {
      navOpen = false;
      menuTimeline.reverse();
    }
  }
  function debounce(func, delay) {
    let timeID;

    return function () {
      if (timeID) {
        clearTimeout(timeID);
      }
      timeID = setTimeout(function () {
        func.apply(this, [...arguments]);
      }, delay);
    };
  }
  /*---------------*/
  //--INIT--//
  init();
});
