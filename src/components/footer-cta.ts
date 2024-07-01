export function footerCtaAnimation() {
  window.gsap.from('.footer-cta_graphic', {
    scale: 1.5,
    duration: 1,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: '.section_footer-cta',
      start: 'top 80%', // 20% above the bottom of the viewport
      end: 'top top',
      scrub: true,
      toggleActions: 'play none none reset',
    },
  });
}
