import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from './components/accordions';
import { autoTabs } from './components/autotabs';
import { ctaAnimation } from './components/cta';
import { footerCtaAnimation } from './components/footer-cta';
import { navHideShow } from './components/nav';
import { SCRIPTS_LOADED_EVENT } from './constants';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.gsap.registerPlugin(ScrollTrigger);

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  navHideShow();
  animatedDetailsAccordions();
  autoTabs();
  ctaAnimation();
  footerCtaAnimation();
});
