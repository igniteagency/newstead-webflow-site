export function ctaAnimation() {
  let mm = window.gsap.matchMedia();
  const breakPoint = 991; // Define the breakpoint for mobile/desktop

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context: gsap.Context) => {
      let { isDesktop, isMobile } = context.conditions || {};

      if (isDesktop) {
        // Desktop animation
        window.gsap.from('.cta_graphic-wrapper, .cta_shape', {
          rotationZ: -25,
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.section_cta',
            start: 'top 80%',
            end: 'top top',
            toggleActions: 'play none none none',
          },
        });
      }

      if (isMobile) {
        console.log('isMobile');
        // Mobile animation
        window.gsap.set('.cta_graphic-wrapper', { rotationZ: 0 });
        window.gsap.from('.cta-graphic, .cta_shape', {
          rotationZ: 70,
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.section_cta',
            start: 'top 80%',
            end: 'top top',
            toggleActions: 'play none none none',
          },
        });
      }

      return () => {
        // Cleanup function if needed
      };
    }
  );
}
