"use strict";(()=>{function e(){let o=window.gsap.matchMedia(),t=991;o.add({isDesktop:`(min-width: ${t+1}px)`,isTablet:`(max-width: ${t}px)`},a=>{let{isDesktop:n,isTablet:i}=a.conditions||{};n&&window.gsap.from(".cta_graphic-wrapper, .cta_shape",{rotationZ:-25,duration:1.5,ease:"power4.inOut",scrollTrigger:{trigger:".section_cta",start:"top 80%",end:"top top",toggleActions:"play none none none"}}),i&&(window.gsap.set(".cta_graphic-wrapper",{rotationZ:0}),window.gsap.from(".cta-graphic, .cta_shape",{rotationZ:70,duration:1.5,ease:"power4.inOut",scrollTrigger:{trigger:".section_cta",start:"top 80%",end:"top top",toggleActions:"play none none none"}}))})}})();
