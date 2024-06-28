const NAVBAR = document.querySelector('.navbar_component') as HTMLElement;
const NAVBAR_CONTAINER = document.querySelector('.navbar_container') as HTMLElement;
const HERO_SECTION = document.getElementById('hero-section');
const ANIMATION_DURATION: number = 0.5; // Duration in seconds
const ANIMATION_EASE: string = 'power4.inOut'; // Easing function

export function navHideShow() {
  let lastScrollTop: number = 0;
  let isScrollingDown: boolean = false;
  let scrollTimeout: number | undefined;

  const handleScroll = (): void => {
    const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta: number = scrollTop - lastScrollTop;

    // Animate navbar based on scroll direction
    if (scrollDelta > 0) {
      // Scrolling down
      if (!isScrollingDown) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => {
          gsap.to(NAVBAR, {
            yPercent: -180,
            duration: ANIMATION_DURATION,
            ease: ANIMATION_EASE,
          });
          isScrollingDown = true;
        }, 150);
      }
    } else {
      // Scrolling up
      if (isScrollingDown) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        gsap.to(NAVBAR, {
          yPercent: 0,
          duration: ANIMATION_DURATION,
          ease: ANIMATION_EASE,
        });
        isScrollingDown = false;
      }
    }

    // Check if the hero section is out of view and remove the .is-hero class if it exists
    if (HERO_SECTION) {
      const HERO_SECTIONRect: DOMRect = HERO_SECTION.getBoundingClientRect();
      if (HERO_SECTIONRect.bottom <= 0) {
        if (NAVBAR_CONTAINER.classList.contains('is-hero')) {
          NAVBAR_CONTAINER.classList.remove('is-hero');
        }
      } else {
        if (!NAVBAR_CONTAINER.classList.contains('is-hero')) {
          NAVBAR_CONTAINER.classList.add('is-hero');
        }
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  window.addEventListener('scroll', () => {
    // Debounce the scroll event handler
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(handleScroll, 100);
  });
}
