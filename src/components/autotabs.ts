const ATTRIBUTE_NAME = 'auto-tabs';
const LOOP_ATTRIBUTE = 'auto-tabs-loop';
const PAUSE_ATTRIBUTE = 'pause-on-hover';
const DURATION_PROPERTY = '--auto-tabs-duration';

export function autoTabs() {
  const WebflowTools = (function () {
    'use strict';

    class TabAnimation {
      container: HTMLElement;
      duration: number;
      shouldLoop: boolean;
      pauseOnHover: boolean;
      startTime: number | null;
      pausedTime: number | null;
      rafId: number | null;
      isPaused: boolean;

      constructor(container: HTMLElement) {
        this.container = container;
        this.duration = this.getDuration();
        this.shouldLoop = container.hasAttribute(LOOP_ATTRIBUTE);
        this.pauseOnHover = container.hasAttribute(PAUSE_ATTRIBUTE);
        this.startTime = null;
        this.pausedTime = null;
        this.rafId = null;
        this.isPaused = false;

        this.bindEvents();
        this.resetAnimation();
      }

      getDuration(): number {
        let element: HTMLElement | null = this.container;
        while (element) {
          const duration = getComputedStyle(element).getPropertyValue(DURATION_PROPERTY);
          if (duration && duration !== '') {
            return parseFloat(duration);
          }
          element = element.parentElement as HTMLElement | null;
        }
        return 1; // Default duration if not found
      }

      bindEvents(): void {
        if (this.pauseOnHover) {
          this.container.addEventListener('mouseenter', () => this.pause());
          this.container.addEventListener('mouseleave', () => this.resume());
        }

        this.container.querySelectorAll<HTMLElement>(':scope > *').forEach((tab) => {
          tab.addEventListener('click', () => this.resetAnimation());
        });

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.resume();
              } else {
                this.pause();
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(this.container);
      }

      animate(timestamp: number): void {
        if (!this.startTime) this.startTime = timestamp;
        if (this.isPaused) return;

        const elapsed = timestamp - this.startTime;
        const progress = Math.min(elapsed / (this.duration * 1000), 1);

        this.updateCurrentTab(progress);

        if (progress < 1) {
          this.rafId = requestAnimationFrame(this.animate.bind(this));
        } else {
          this.switchTab();
        }
      }

      updateCurrentTab(progress: number): void {
        const currentTab = this.container.querySelector<HTMLElement>(':scope > .w--current');
        if (currentTab) {
          currentTab.style.setProperty('--auto-tabs-progress', `${progress * 100}%`);
        }
      }

      switchTab(): void {
        const currentTab = this.container.querySelector<HTMLElement>(':scope > .w--current');
        if (!currentTab) return;

        let nextTab = currentTab.nextElementSibling as HTMLElement;
        if (!nextTab && this.shouldLoop) {
          nextTab = this.container.querySelector(':scope > *:first-child') as HTMLElement;
        }

        if (nextTab) {
          nextTab.click();
          this.resetAnimation();
        }
      }

      resetAnimation(): void {
        this.startTime = null;
        this.pausedTime = null;
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        this.rafId = requestAnimationFrame(this.animate.bind(this));
      }

      pause(): void {
        if (!this.isPaused) {
          this.isPaused = true;
          this.pausedTime = performance.now();
          if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        }
      }

      resume(): void {
        if (this.isPaused) {
          this.isPaused = false;
          if (this.pausedTime && this.startTime) {
            this.startTime += performance.now() - this.pausedTime;
          }
          this.rafId = requestAnimationFrame(this.animate.bind(this));
        }
      }
    }

    function initializeTabSwitching(): void {
      const tabContainers = document.querySelectorAll(`[${ATTRIBUTE_NAME}]`);
      tabContainers.forEach((container) => {
        new TabAnimation(container as HTMLElement);
      });
    }

    return {
      init: initializeTabSwitching,
    };
  })();

  // Usage
  WebflowTools.init();
}
