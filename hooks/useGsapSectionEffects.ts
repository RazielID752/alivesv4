"use client";

import { type RefObject, useEffect } from "react";

type GsapSectionEffectsOptions = Readonly<{
  revealSelector?: string;
  driftSelector?: string;
  titleSelector?: string;
}>;

export function useGsapSectionEffects(
  sectionRef: RefObject<HTMLElement | null>,
  {
    revealSelector = "[data-gsap-reveal]",
    driftSelector = "[data-gsap-drift]",
    titleSelector = "[data-gsap-title]",
  }: GsapSectionEffectsOptions = {},
) {
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let context: { revert: () => void } | undefined;
    let isMounted = true;

    const setupAnimations = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isMounted) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const animatedItems: HTMLElement[] = [];
        const revealItems = gsap.utils.toArray<HTMLElement>(
          revealSelector,
          section,
        );
        const driftItems = gsap.utils.toArray<HTMLElement>(
          driftSelector,
          section,
        );
        const titleItems = gsap.utils.toArray<HTMLElement>(
          titleSelector,
          section,
        );
        const motionIsReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        animatedItems.push(...revealItems, ...driftItems, ...titleItems);

        if (motionIsReduced) {
          return;
        }

        if (titleItems.length > 0) {
          titleItems.forEach((item) => {
            gsap.fromTo(
              item,
              { y: 24 },
              {
                clearProps: "transform",
                duration: 0.9,
                ease: "power3.out",
                immediateRender: false,
                scrollTrigger: {
                  once: true,
                  start: "top 82%",
                  trigger: item,
                },
                y: 0,
              },
            );
          });
        }

        if (revealItems.length > 0) {
          revealItems.forEach((item, index) => {
            gsap.fromTo(
              item,
              { y: 30 },
              {
                clearProps: "transform",
                delay: Math.min(index * 0.05, 0.2),
                duration: 0.8,
                ease: "power3.out",
                immediateRender: false,
                scrollTrigger: {
                  once: true,
                  start: "top 86%",
                  trigger: item,
                },
                y: 0,
              },
            );
          });
        }

        driftItems.forEach((item) => {
          gsap.fromTo(
            item,
            { y: 0 },
            {
              ease: "none",
              scrollTrigger: {
                end: "bottom top",
                scrub: true,
                start: "top bottom",
                trigger: item,
              },
              y: -24,
            },
          );
        });

        return () => {
          gsap.set(animatedItems, { clearProps: "all" });
        };
      }, section);
    };

    setupAnimations();

    return () => {
      isMounted = false;
      context?.revert();
    };
  }, [driftSelector, revealSelector, sectionRef, titleSelector]);
}
