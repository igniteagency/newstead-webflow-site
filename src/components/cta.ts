export function ctaAnimation() {
  let mm = gsap.matchMedia();
  const breakPoint = 991; // Define the breakpoint for mobile/desktop

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let isDesktop = context.conditions;

      gsap.from('.cta_graphic-wrapper, .cta_shape', {
        rotationZ: isDesktop ? -25 : 60, // Use -25 for desktop, 60 for mobile
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: '.section_cta',
          start: 'top 80%',
          end: 'top top',
          toggleActions: 'play none none none',
        },
      });

      return () => {
        // Cleanup function if needed
      };
    }
  );
}
