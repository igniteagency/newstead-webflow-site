import { navHideShow } from 'src/components/nav';
import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  quicklinkCards();
  navHideShow();
});

function quicklinkCards() {
  window.gsap.to('.home_quicklinks-card-link', {
    y: '0%',
    duration: 0.5,
    stagger: {
      each: 0.2,
    },
    //ease: "power4.out",
    scrollTrigger: {
      trigger: '.home_quicklinks-wrapper',
      start: 'bottom bottom',
      toggleActions: 'play none none none',
      //markers: true,
    },
  });
}
