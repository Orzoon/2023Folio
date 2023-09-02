window.addEventListener("load", () => {
  /*--FUNCTIONS--*/

  function init() {
    loadParticles();
  }
  function loadParticles() {
    particlesJS.load("particles-js", "./js/particles.json", function () {});
  }

  /*---------------*/
  //--INIT--//
  init();
});
