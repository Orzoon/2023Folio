window.addEventListener("load", () => {
  // elements
  let navMenu = document.getElementById("navMenu");
  let navContainer = document.getElementById("navContainer");
  const navUl = document.getElementById("navUl");
  let closeMenu = document.getElementById("closeMenu");
  let closeIcon = document.getElementById("closeIcon");
  const githubButton = document.getElementById("githubButton");
  const loader = document.querySelector(".loader");
  const navListNode = document.querySelectorAll(".navList a");
  const navListArray = Array.from(navListNode);
  navListArray.pop();

  let navOpen = false;

  //Timelines
  let menuTimeline;
  let landingTimeline;
  // swiperJS
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
    clearLoader();
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

    navListArray.forEach((navList) => {
      navList.addEventListener("click", navClickHandler, false);
    });
  }
  function setTimeline() {
    // menuTimeline
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

    landingTimeline = gsap.timeline({});
    landingTimeline.pause();
    landingTimeline
      .from("#particles-js", {
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "linear",
      })
      //rotating
      .addLabel("commonPoint", ">-0.5")
      // circle rotation
      .to(
        ".cw_two",
        {
          rotation: "360",
          duration: 15,
          repeat: -1,
          ease: "linear",
        },
        "<"
      )
      .to(
        ".cw_three",
        {
          rotation: "360",
          duration: 39,
          repeat: -1,
          ease: "linear",
        },
        "<"
      )
      .to(
        ".cw_four",
        {
          rotation: "360",
          duration: 40,
          repeat: -1,
          ease: "linear",
        },
        "<"
      )
      .to(
        ".cw_five",
        {
          rotation: "360",
          duration: 16,
          repeat: -1,
          ease: "linear",
        },
        "<"
      )

      // other
      .from(
        ".Gnav",
        {
          opacity: 0,
          x: -10,
          duration: 0.6,
          stagger: 0.1,
          ease: "ease-in",
        },
        "commonPoint"
      )
      .from(
        ".GhText",
        {
          opacity: 0,
          y: -15,
          duration: 0.6,
          stagger: 0.2,
          ease: "ease-out",
        },
        "<commonPoint"
      )
      .from(
        ".c",
        {
          width: "0%",
          height: "0%",
          duration: 0.6,
          stagger: 0.2,
          ease: "ease-out",
        },
        "commonPoint+=0.5"
      );
  }
  function toggle(e) {
    if (e) {
      e.preventDefault();
    }
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

  /*--------clearing loader ------*/
  function clearLoader() {
    document.body.style.overflowY = "auto !important";
    setTimeout(function () {
      loader.style.display = "none";
      document.body.style.overflowY = "scroll";
      // run the landing animation
      landingTimeline.play();
    }, 1500);
  }

  function navClickHandler(e) {
    if (navOpen) {
      navOpen = false;
      toggle();
    }
  }
  /*---------------*/
  //--INIT--//
  init();
});
