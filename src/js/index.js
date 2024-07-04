window.addEventListener("load", () => {
  // elements
  gsap.registerPlugin(ScrollTrigger);
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

  // cert
  const certBtns = document.querySelectorAll(".certVerifyButton");
  const verifyCertLinkData = [
    "https://www.credly.com/badges/9a18d0e3-51a1-4d20-922e-b3474c0ce489/public_url",
  ];
  // titleArray
  const titles = gsap.utils.toArray(".title");
  splt({});
  //Timelines
  let menuTimeline;
  let landingTimeline;
  let titleTimeline;
  let heroTextMainTimeline; //addition of landing and titleTimeline;

  //*******CERT--DATA**********//

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

  // added cert swiper
  const swiperCert = new Swiper(".swiper_cert", {
    slideClass: "cert-slide",
    direction: "horizontal",
    slidesPerView: "auto",
    navigation: {
      nextEl: ".cert_btn_right ",
      prevEl: ".cert_btn_left",
    },
    scrollbar: {
      el: ".cert-swiper-scrollbar",
      hide: false,
    },
  });
  // loop
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

    //certBtn
    certBtns.forEach((certBtn, index) => {
      certBtn.addEventListener("click", () => {
        window.open(verifyCertLinkData[index], "_blank");
      });
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

    // Title Timeline
    // Title Timeline
    titleTimeline = gsap.timeline({ repeat: -1 });
    //titleTimeline.pause();

    titles.forEach((title) => {
      let q = gsap.utils.selector(title);
      //let letters = q(".char");
      titleTimeline
        .from(
          q(".char"),
          {
            opacity: 0,
            y: 30,
            rotateX: -90,
            stagger: 0.04,
          },
          "<"
        )
        .to(
          q(".char"),
          {
            opacity: 0,
            y: -30,
            rotateX: 90,
            stagger: 0.04,
            delay: 1,
          },
          "<1"
        );
    });

    // landing timeline
    landingTimeline = gsap.timeline({});
    //landingTimeline.pause();
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
          stagger: function (i) {
            return i * 0.2;
          },
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

    // heroTextMainTimeline
    heroTextMainTimeline = gsap.timeline({});
    heroTextMainTimeline.pause();
    heroTextMainTimeline.add(landingTimeline, 0).add(titleTimeline, "<+1.6");
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
      heroTextMainTimeline.play();
    }, 1000);
  }

  function navClickHandler(e) {
    if (navOpen) {
      navOpen = false;
      toggle();
    }
  }
  //---//
  //---SCROLLTRIGGER---//
  //---//

  // ProjectsDescriptionElements && all description elements
  const scrollHeading = document.querySelectorAll(".scroll_heading");
  const scrollPara = document.querySelectorAll(".scroll_para");

  // projectsCardElements
  const projectCards = gsap.utils.toArray(".project_image_con");

  // slider
  const sliders = gsap.utils.toArray(".slider");
  //certSlider
  const certSliders = gsap.utils.toArray(".cert-slide");
  // DescsTitle and descs' P -- loop to scrollTrigger
  const uiuxSwiperBtnRight = document.querySelector(".right ");
  const canvasSwiperBtnRight = document.querySelector(".canvas_btn_right ");
  const certSwiperBtnRight = document.querySelector(".cert_btn_right");
  // scrollBar
  const scrollBars = gsap.utils.toArray(".swiper_scroll_con");
  const scrollMarks = gsap.utils.toArray(".scroll_slider_mark");

  scrollHeading.forEach((element) => {
    __commonTextScrollTrigger(element);
  });
  scrollPara.forEach((element) => {
    __commonTextScrollTrigger(element);
  });

  // Project Cards --- scroll loop
  projectCards.forEach((element) => {
    __ProjectCards(element);
  });

  // slider -- scroll loop
  sliders.forEach((el, index) => {
    __swiperCards(el, index);
  });

  //scroll_slider_mark.mark1
  //cert sliders
  certSliders.forEach((el, index) => {
    __certCards(el, index);
  });

  // btn-- scroll
  // later fix every button to mark1 mark 2 or mark 3;;;to scrollmarks
  __swiperBtn(uiuxSwiperBtnRight, sliders[0]);
  __swiperBtn(canvasSwiperBtnRight, sliders[4]);
  __swiperBtn(certSwiperBtnRight, certSliders[0]);
  //__swiperBtn(certSwiperBtnRight, )
  // scrollBars
  scrollBars.forEach((scrollBar, index) => {
    const triggerElem = scrollMarks[index];
    const q = gsap.utils.selector(scrollBar);
    const t = gsap.timeline();
    t.pause();
    t.to(scrollBar, {
      opacity: 1,
      duration: 0.2,
      delay: 1,
      ease: "ease-out",
    }).to(
      q(".swiper_scroll"),
      {
        x: "100%",
        duration: 1.5,
        ease: "ease-in",
      },
      "<"
    );
    ScrollTrigger.create({
      trigger: triggerElem,
      start: "top 80%",
      onEnter: () => {
        t.play();
      },
    });
  });

  // button Section
  __btnSection();
  // footer Section
  __footerSection();
  // TRIGGER FUCNTIONS
  function __commonTextScrollTrigger(element) {
    //commonTimeline
    const className = element.getAttribute("class");
    const options = {
      opacity: 0,
      duration: 1,
      delay: className === "scroll_heading" ? 0.3 : 0.5,
      y: -30,
      ease: "ease-out",
    };
    let t = gsap.timeline();
    t.pause();
    t.from(element, {
      ...options,
    });
    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        t.play();
      },
    });
  }

  function __ProjectCards(element) {
    const q = gsap.utils.selector(element);
    const t = gsap.timeline();
    t.pause();
    t.from(element, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "ease-out",
      delay: 0, // optional delay
    })
      .from(
        q(".project_image_text"),
        {
          y: -30,
          opacity: 0,
          duration: 1,
          ease: "ease-out",
        },
        "<0.3"
      )
      .from(
        q(".project_image_desc h1"),
        {
          y: -20,
          opacity: 0,
          duration: 1,
          ease: "ease-out",
        },
        "<0.5"
      )
      .from(
        q(".project_image_desc p"),
        {
          y: -10,
          opacity: 0,
          duration: 0.8,
          ease: "ease-out",
        },
        "<0.5"
      );

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        t.play();
      },
    });
  }

  function __swiperCards(element, index) {
    const q = gsap.utils.selector(element);
    const t = gsap.timeline();
    t.pause();
    t.from(element, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "ease-out",
      delay: 0.3 * index,
    })
      .from(
        q(".slider_image_con a"),
        {
          y: -25,
          opacity: 0,
          duration: 1,
          ease: "ease-out",
        },
        "<0.3"
      )
      .from(
        q(".slider_desc_con p"),
        {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "ease-out",
        },
        "<0.5"
      );

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        t.play();
      },
    });
  }

  function __swiperBtn(element, TriggerElement) {
    const t = gsap.timeline();
    t.pause();
    t.from(element, {
      opacity: 0,
      duration: 1,
      ease: "ease-out",
      delay: 1,
    });

    ScrollTrigger.create({
      trigger: TriggerElement,
      onEnter: () => {
        t.play();
      },
    });
  }

  function __btnSection() {
    const t1 = gsap.timeline({});
    t1.pause();
    t1.from(".linkBtn_main", {
      opacity: 0,
      x: 15,
      y: 15,
      ease: "ease-out",
      duration: 1,
    })
      .to(
        ".LB_Btn_bg",
        {
          opacity: 1,
        },
        "<0.4"
      )
      .from(
        ".LB_text",
        {
          opacity: 0,
          y: 8,
          ease: "ease-in",
          duration: 0.8,
        },
        "<0.6"
      );

    ScrollTrigger.create({
      trigger: ".linkBtn_main",
      start: "top 90%",
      onEnter: () => {
        t1.play();
      },
    });
  }

  function __footerSection() {
    const extLink = document.querySelector(".lists_external");
    const lists = document.querySelector(".lists");
    const footerLogo = document.querySelector(".footerLogo");

    // common option
    const opt = {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: "ease-out",
    };
    const extChild = gsap.utils.toArray(".lists_external li");
    const ext = gsap.timeline();
    ext.pause();
    ext.from(extChild, {
      stagger: 0.3,
      ...opt,
    });

    const listChild = gsap.utils.toArray(".lists li");
    const list = gsap.timeline();
    list.pause();
    list.from(listChild, {
      stagger: 0.3,
      ...opt,
    });

    const logo = gsap.timeline();
    logo.pause();
    logo.from(".footerLogo", {
      ...opt,
      y: -30,
    });

    // scrollTrigger EXT
    ScrollTrigger.create({
      trigger: extLink,
      start: "top bottom",
      onEnter: () => {
        ext.play();
      },
    });

    ScrollTrigger.create({
      trigger: lists,
      start: "top bottom",
      onEnter: () => {
        list.play();
      },
    });

    ScrollTrigger.create({
      trigger: footerLogo,
      start: "top bottom",
      onEnter: () => {
        logo.play();
      },
    });
  }

  function __certCards(element, index) {
    const q = gsap.utils.selector(element);
    const t = gsap.timeline();
    t.pause();
    // t.from("swiper-wrapper", {
    //   y: -50,
    //   opacity: 0,
    //   duration: 1,
    //   ease: "ease-out",
    // })

    t.from(element, {
      y: -40,
      opacity: 0,
      duration: 1,
      ease: "ease-out",
      delay: 0.1 * index,
    })
      .from(
        q("a"),
        {
          y: -25,
          opacity: 0,
          duration: 1,
          ease: "ease-out",
        },
        "<0.3"
      )
      .from(
        q(".badge_container"),
        {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "ease-out",
        },
        "<0.5"
      )
      .from(
        q(".cert-information li p "),
        {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "ease-out",
        },
        // "<0.5"
        "<"
      )
      .from(
        q(".certVerifyButton"),
        {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "ease-out",
        },
        // "<0.2"
        "<0"
      )
      .from(
        q(".cert-vender-logo_con"),
        {
          y: -50,
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "ease-out",
        },
        "<-0.8"
      );

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        t.play();
      },
    });
  }

  // aboutme Image con scrollTrigger
  function __aboutmeImageCon() {
    const t = gsap.timeline();
    t.pause();
    t.from(".mid-line-plate", {
      x: "-100%",
      y: "-100%",
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "ease-out",
    }).from(
      ".photo-plate",
      {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "ease-out",
      },
      "<0.3"
    );

    ScrollTrigger.create({
      trigger: ".aboutme_image_con",
      start: "top 80%",
      onEnter: () => {
        t.play();
      },
    });
  }

  __aboutmeImageCon();

  //added cert card animations
  /*---------------*/
  //--INIT--//
  init();
});
