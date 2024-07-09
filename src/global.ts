import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from './components/accordions';
import { autoTabs } from './components/autotabs';
import { ctaAnimation } from './components/cta';
import { footerCtaAnimation } from './components/footer-cta';
import { navHideShow } from './components/nav';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  navHideShow();
  animatedDetailsAccordions();
  autoTabs();
  ctaAnimation();
  footerCtaAnimation();
});

const CURRENT_YEAR = document.getElementById('current-year');

if (CURRENT_YEAR) {
  CURRENT_YEAR.textContent = new Date().getFullYear().toString();
}
