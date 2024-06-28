import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from './components/accordions';
import { autoTabs } from './components/autotabs';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  animatedDetailsAccordions();
  autoTabs();
});
