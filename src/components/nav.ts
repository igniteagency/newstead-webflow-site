const containerEl = document.querySelector('.navbar_container')!;
const heroSectionEl = document.getElementById('hero-section');

const NAV_TRANSPARENT_CLASSNAME = 'is-transparent';

let navYPercentMove: gsap.QuickToFunc;

export function navHideShow() {
  navYPercentMove = window.gsap.quickTo(containerEl, 'yPercent', {
    duration: 0.5,
    ease: 'power4.inOut',
  });

  navToggleOnScroll();
  navHeroIntersectionToggle();
}

function navToggleOnScroll() {
  window.ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: (self) => {
      if (self.direction === -1) {
        // scrolled up
        navYPercentMove(0);
      } else {
        // scrolled down
        navYPercentMove(-200);
      }
    },
  });
}

function navHeroIntersectionToggle() {
  if (!heroSectionEl) {
    // console.debug('Hero section element with ID not found');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          containerEl.classList.add(NAV_TRANSPARENT_CLASSNAME);
        } else {
          containerEl.classList.remove(NAV_TRANSPARENT_CLASSNAME);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: [0, 1],
    }
  );
  observer.observe(heroSectionEl);
}
