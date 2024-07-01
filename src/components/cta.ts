export function ctaAnimation() {
  window.gsap.from('.cta_graphic-wrapper, .cta_shape', {
    rotationZ: -25, // Initial value of the rotationZ property
    duration: 1.5,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: '.section_cta',
      start: 'top 80%', // Start animation when .section_cta is 20% above the bottom of the viewport
      end: 'top top',
      toggleActions: 'play none none none',
    },
  });
}
