"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Model from "./Model";
import TextOverlay from "./TextOverlay";

gsap.registerPlugin(ScrollTrigger);

const PANEL_TRIGGER_BOXES = [0, 2, 4, 6];

function buildEnterTimeline(panel) {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.out", duration: 0.45 },
  });
  const hero = panel.querySelector(".slide-hero");
  const headers = panel.querySelectorAll(".slide-col-header:not(.slide-col-header--spacer)");
  const items = panel.querySelectorAll(".slide-col-item");

  tl.set(panel, { autoAlpha: 1 })
    .from(hero, { y: 48, autoAlpha: 0, duration: 0.55 }, 0)
    .from(headers, { y: 28, autoAlpha: 0, stagger: 0.07 }, 0.12)
    .from(items, { y: 18, autoAlpha: 0, stagger: 0.02, duration: 0.38 }, 0.22);

  return tl;
}

function buildExitTimeline(panel) {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.in", duration: 0.28 },
  });
  const hero = panel.querySelector(".slide-hero");
  const headers = panel.querySelectorAll(".slide-col-header:not(.slide-col-header--spacer)");
  const items = panel.querySelectorAll(".slide-col-item");

  tl.to(items, { y: -12, autoAlpha: 0, stagger: 0.02, duration: 0.25 }, 0)
    .to(headers, { y: -16, autoAlpha: 0, stagger: 0.04, duration: 0.2 }, 0.05)
    .to(hero, { y: -30, autoAlpha: 0, duration: 0.35 }, 0.1)
    .set(panel, { autoAlpha: 0 }, 0.45);

  return tl;
}

const CurvedScroll = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray(".curved-scroll-box");
      const panels = gsap.utils.toArray(".text-panel");

      gsap.set(panels, { autoAlpha: 0 });

      boxes.forEach((box, index) => {
        const isLeft = index % 2 === 0;
        const radius = window.innerWidth * 0.2;

        ScrollTrigger.create({
          trigger: box,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const progress = self.progress;
            const theta = progress * Math.PI;
            const xOffset = Math.sin(theta) * radius;
            const finalX = isLeft ? -xOffset : xOffset;
            gsap.set(box, { x: finalX });
          },
        });
      });

      const enterTimelines = panels.map((panel) => buildEnterTimeline(panel));
      const exitTimelines = panels.map((panel) => buildExitTimeline(panel));

      let activeIndex = -1;

      const setActivePanel = (next) => {
        if (next === activeIndex) return;

        const prev = activeIndex;
        if (prev >= 0) {
          exitTimelines[prev].restart();
        }

        activeIndex = next;

        if (next >= 0) {
          enterTimelines[next].restart();
        }
      };

      PANEL_TRIGGER_BOXES.forEach((boxIndex, panelIndex) => {
        const box = boxes[boxIndex];
        const endBox = boxes[boxIndex + 1];
        if (!box) return;

        ScrollTrigger.create({
          trigger: box,
          endTrigger: endBox ?? box,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActivePanel(panelIndex),
          onEnterBack: () => setActivePanel(panelIndex),
          onLeave: () => {
            if (activeIndex === panelIndex) setActivePanel(-1);
          },
          onLeaveBack: () => {
            if (activeIndex === panelIndex) setActivePanel(-1);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="fixed inset-0 z-10 size-full">
        <Model />
      </div>
      <TextOverlay />
      <div className="h-screen w-full" />
      <div className="relative flex flex-col items-center gap-[10vh]">
        <div className="curved-scroll-box backface-hidden mr-[25vw] size-[17vw] transform-gpu overflow-clip rounded-[2vw]">
          <img
            src="/assets/1.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="curved-scroll-box backface-hidden ml-[25vw] size-[17vw] transform-gpu overflow-hidden rounded-[2vw]">
          <img
            src="/assets/2.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="curved-scroll-box backface-hidden mr-[25vw] size-[17vw] transform-gpu overflow-hidden rounded-[2vw]">
          <img
            src="/assets/3.avif"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="curved-scroll-box backface-hidden ml-[25vw] size-[17vw] transform-gpu overflow-hidden rounded-[2vw]">
          <img
            src="/assets/4.avif"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="curved-scroll-box backface-hidden mr-[25vw] size-[17vw] transform-gpu overflow-hidden rounded-[2vw]">
          <img
            src="/assets/5.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="curved-scroll-box backface-hidden ml-[25vw] size-[17vw] transform-gpu overflow-hidden rounded-[2vw]">
          <img
            src="/assets/6.avif"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="curved-scroll-box backface-hidden mr-[25vw] size-[17vw] transform-gpu overflow-hidden rounded-[2vw]">
          <img
            src="/assets/7.avif"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="curved-scroll-box backface-hidden ml-[25vw] size-[17vw] transform-gpu overflow-hidden rounded-[2vw]">
          <img
            src="/assets/8.avif"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="h-screen w-full" />
    </section>
  );
};

export default CurvedScroll;
