"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const DEFAULT_ROOT_MARGIN = "256px";

type RafRoot = Element | null | { current: Element | null } | (() => Element | null);

function resolveElement(root: RafRoot): Element | null {
  if (!root) return null;
  if (typeof root === "function") return root() ?? null;
  if (typeof root === "object" && "current" in root) return root.current ?? null;
  return root;
}

interface VisibilityGateOptions {
  root?: RafRoot;
  rootMargin?: string;
  threshold?: number;
  observeTab?: boolean;
  observeOffscreen?: boolean;
  onChange?: (active: boolean) => void;
}

interface VisibilityGate {
  readonly isActive: boolean;
  observe: (nextRoot?: RafRoot) => void;
  destroy: () => void;
}

function createVisibilityGate({
  root = null,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0,
  observeTab = true,
  observeOffscreen = true,
  onChange,
}: VisibilityGateOptions = {}): VisibilityGate {
  let tabVisible =
    typeof document === "undefined" ? true : !document.hidden;
  let onscreen = true;
  let destroyed = false;
  let observer: IntersectionObserver | null = null;

  const isActive = () => {
    if (destroyed) return false;
    if (observeTab && !tabVisible) return false;
    if (observeOffscreen && resolveElement(root) && !onscreen) return false;
    return true;
  };

  let lastActive = isActive();

  const emit = () => {
    if (destroyed) return;
    const next = isActive();
    if (next === lastActive) return;
    lastActive = next;
    onChange?.(next);
  };

  const onVisibilityChange = () => {
    tabVisible = !document.hidden;
    emit();
  };

  if (observeTab && typeof document !== "undefined") {
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  const bindObserver = () => {
    if (!observeOffscreen || typeof IntersectionObserver === "undefined") {
      return;
    }

    const el = resolveElement(root);
    if (!el) return;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onscreen = entry.isIntersecting;
        }
        emit();
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
  };

  bindObserver();

  return {
    get isActive() {
      return isActive();
    },

    observe(nextRoot?: RafRoot) {
      if (destroyed) return;
      if (nextRoot != null) root = nextRoot;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      onscreen = true;
      bindObserver();
      emit();
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (observeTab && typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    },
  };
}

interface SuspendedRafOptions {
  onFrame: (time: number) => void;
  root?: RafRoot;
  rootMargin?: string;
  threshold?: number;
  observeTab?: boolean;
  observeOffscreen?: boolean;
}

interface SuspendedRaf {
  start: () => void;
  stop: () => void;
  readonly isRunning: boolean;
  readonly isActive: boolean;
  observe: (nextRoot?: RafRoot) => void;
  destroy: () => void;
}

function createSuspendedRaf({
  onFrame,
  root = null,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0,
  observeTab = true,
  observeOffscreen = true,
}: SuspendedRafOptions): SuspendedRaf {
  if (typeof onFrame !== "function") {
    throw new TypeError("createSuspendedRaf: onFrame is required");
  }

  let rafId: number | null = null;
  let running = false;
  let destroyed = false;

  const stopRaf = () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const tick = (time: number) => {
    rafId = null;
    if (destroyed || !running || !gate.isActive) return;
    onFrame(time);
    if (!destroyed && running && gate.isActive) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const sync = () => {
    if (destroyed) return;
    if (running && gate.isActive) {
      if (rafId == null) {
        rafId = requestAnimationFrame(tick);
      }
    } else {
      stopRaf();
    }
  };

  const gate = createVisibilityGate({
    root,
    rootMargin,
    threshold,
    observeTab,
    observeOffscreen,
    onChange: sync,
  });

  return {
    start() {
      if (destroyed) return;
      running = true;
      sync();
    },

    stop() {
      running = false;
      stopRaf();
    },

    get isRunning() {
      return running;
    },

    get isActive() {
      return gate.isActive;
    },

    observe(nextRoot?: RafRoot) {
      gate.observe(nextRoot);
      sync();
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      running = false;
      stopRaf();
      gate.destroy();
    },
  };
}

const IMAGES = [
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1200&auto=format&fit=crop"
];

const defaultImages: InfinitePerspectiveSliderItem[] = [
  { number: "01", src: IMAGES[0], title: "Inspire", desc: "Nature and calm beginnings" },
  { number: "02", src: IMAGES[1], title: "Stillness", desc: "Moments of quiet and beauty" },
  { number: "03", src: IMAGES[2], title: "Texture", desc: "Light, grain and motion" },
  { number: "04", src: IMAGES[3], title: "Flow", desc: "Soft forms and gentle tone" },
  { number: "05", src: IMAGES[4], title: "Depth", desc: "Warmth and perspective" },
  { number: "06", src: IMAGES[5], title: "Motion", desc: "Energy, waves and drift" },
  { number: "07", src: IMAGES[6], title: "Distort", desc: "Abstract visuals" },
  { number: "08", src: IMAGES[7], title: "Frame", desc: "A cinematic still" },
  { number: "09", src: IMAGES[8], title: "Contrast", desc: "A study in light" },
  { number: "10", src: IMAGES[9], title: "Minimal", desc: "Pared-back composition" },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const DEFAULT_CARD_WIDTH = 320;
const DEFAULT_CARD_GAP = 24;
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1025;
const MOBILE_CARD_WIDTH = 240;
const MOBILE_CARD_GAP = 16;
const TABLET_CARD_WIDTH = 380;
const TABLET_CARD_GAP = 20;

const ACTIVE_CONTENT_CLEAR_DELTA = 2;
const TEXT_LEAVE_STAGGER = 0.04;

interface InfinitePerspectiveSliderItemData {
  src?: string;
  number?: string | number;
  title?: string;
  desc?: string;
  description?: string;
}

type InfinitePerspectiveSliderItem = string | InfinitePerspectiveSliderItemData;

const getItemData = (
  item: InfinitePerspectiveSliderItem
): InfinitePerspectiveSliderItemData =>
  typeof item === "string" ? { src: item } : item;

interface CardSetter {
  x: (value: number | string) => void;
  rotateY: (value: number | string) => void;
}

interface SliderConfig {
  cardWidth: number;
  scrollSpeed: number;
  scrollLerp: number;
  velocityLerp: number;
  rotationSensitivity: number;
  rotationDamp: number;
  rotationLerp: number;
  maxRotation: number;
  scrollStopDelay: number;
  textEnterDuration: number;
  textLeaveDuration: number;
  textStagger: number;
}

interface InfinitePerspectiveSliderCompProps {
  images?: InfinitePerspectiveSliderItem[];
  cardWidth?: number;
  cardGap?: number;
  perspective?: number;
  scrollSpeed?: number;
  scrollLerp?: number;
  velocityLerp?: number;
  rotationSensitivity?: number;
  rotationDamp?: number;
  rotationLerp?: number;
  maxRotation?: number;
  scrollStopDelay?: number;
  textEnterDuration?: number;
  textLeaveDuration?: number;
  textStagger?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  showScrollIndicator?: boolean;
}

function InfinitePerspectiveSliderComp({
  images = defaultImages,
  cardWidth = DEFAULT_CARD_WIDTH,
  cardGap = DEFAULT_CARD_GAP,
  perspective = 2200,
  scrollSpeed = 1.0,
  scrollLerp = 0.1,
  velocityLerp = 0.09,
  rotationSensitivity = 0.025,
  rotationDamp = 0.1,
  rotationLerp = 0.12,
  maxRotation = 80,
  scrollStopDelay = 180,
  textEnterDuration = 0.35,
  textLeaveDuration = 0.35,
  textStagger = 0.06,
  autoPlay = true,
  autoPlaySpeed = 0.8,
  showScrollIndicator = false,
}: InfinitePerspectiveSliderCompProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInViewRef = useRef(false);
  const isHoveredRef = useRef(false);

  const stripRef = useRef<HTMLDivElement | null>(null);
  const settersRef = useRef<CardSetter[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeHoverIndexRef = useRef<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef<number | null>(null);

  const leaveHandlersRef = useRef<Record<number, () => void>>({});
  const enterHandlersRef = useRef<Record<number, () => void>>({});

  const [viewportWidth, setViewportWidth] = useState(DEFAULT_CARD_WIDTH * 4);

  const isMobileViewport = viewportWidth < MOBILE_BREAKPOINT;
  const isTabletViewport =
    viewportWidth >= MOBILE_BREAKPOINT && viewportWidth < TABLET_BREAKPOINT;

  const resolvedCardWidth = isMobileViewport
    ? MOBILE_CARD_WIDTH
    : isTabletViewport
      ? TABLET_CARD_WIDTH
      : cardWidth;

  const resolvedCardGap = isMobileViewport
    ? MOBILE_CARD_GAP
    : isTabletViewport
      ? TABLET_CARD_GAP
      : cardGap;

  const cardStep = resolvedCardWidth + resolvedCardGap;

  const cardHeight = isMobileViewport
    ? "390px"
    : isTabletViewport
      ? "420px"
      : "450px";

  const stateRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    smoothVelocity: 0,
    rotationVelocity: 0,
    currentRotation: 0,
    prevDirection: 0,
    isDragging: false,
    lastX: 0,
  });
  const configRef = useRef<SliderConfig>({
    cardWidth: resolvedCardWidth,
    scrollSpeed,
    scrollLerp,
    velocityLerp,
    rotationSensitivity,
    rotationDamp,
    rotationLerp,
    maxRotation,
    scrollStopDelay,
    textEnterDuration,
    textLeaveDuration,
    textStagger,
  });

  configRef.current = {
    cardWidth: resolvedCardWidth,
    scrollSpeed,
    scrollLerp,
    velocityLerp,
    rotationSensitivity,
    rotationDamp,
    rotationLerp,
    maxRotation,
    scrollStopDelay,
    textEnterDuration,
    textLeaveDuration,
    textStagger,
  };

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const clearActiveContent = useCallback(() => {
    const activeIndex = activeHoverIndexRef.current;

    if (activeIndex === null) return;

    const leaveHandler = leaveHandlersRef.current[activeIndex];

    if (leaveHandler) {
      leaveHandler();
    }

    activeHoverIndexRef.current = null;
  }, []);

  const markScrolling = useCallback(() => {
    isScrollingRef.current = true;
    clearActiveContent();

    if (scrollStopTimerRef.current) {
      window.clearTimeout(scrollStopTimerRef.current);
    }

    scrollStopTimerRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
      scrollStopTimerRef.current = null;

      const hoveredIndex = hoveredIndexRef.current;

      if (hoveredIndex === null) return;

      const enterHandler = enterHandlersRef.current[hoveredIndex];

      if (enterHandler) {
        enterHandler();
      }
    }, configRef.current.scrollStopDelay);
  }, [clearActiveContent]);

  const initSetters = () => {
    if (!stripRef.current) return;

    settersRef.current = Array.from(stripRef.current.children).map(
      (element) =>
        ({
          x: gsap.quickSetter(element, "x", "px"),
          rotateY: gsap.quickSetter(element, "rotateY", "deg"),
        }) as CardSetter
    );
  };

  const positionCards = useCallback(
    (offset: number, rotation: number) => {
      const strip = stripRef.current;

      if (!strip || !images.length) return;

      const cards = strip.children;
      const setters = settersRef.current;

      const count = images.length;
      const loopWidth = count * cardStep;

      const viewW = window.innerWidth;
      const centerX = viewW / 2;
      const centreOffset = centerX - configRef.current.cardWidth / 2;

      for (let index = 0; index < cards.length; index += 1) {
        let x = index * cardStep - offset + centreOffset;

        x = ((x % loopWidth) + loopWidth) % loopWidth;

        if (x > loopWidth - cardStep) {
          x -= loopWidth;
        }

        setters[index]?.x(x);
        setters[index]?.rotateY(rotation);
      }
    },
    [cardStep, images]
  );

  useEffect(() => {
    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInViewRef.current = entry.isIntersecting;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const state = stateRef.current;
    const loopWidth = images.length * cardStep;
    const reducedMotion = prefersReducedMotion();

    initSetters();

    const tick = () => {
      if (reducedMotion) {
        state.current = state.target;
        state.velocity = 0;
        state.smoothVelocity = 0;
        state.rotationVelocity = 0;
        state.currentRotation = 0;
      } else {
        const config = configRef.current;

        if (
          autoPlay &&
          isInViewRef.current &&
          !isHoveredRef.current &&
          !state.isDragging &&
          !isScrollingRef.current
        ) {
          state.target += autoPlaySpeed;
        }

        state.current = lerp(state.current, state.target, config.scrollLerp);
        state.velocity = state.target - state.current;

        state.smoothVelocity = lerp(
          state.smoothVelocity,
          state.velocity,
          config.velocityLerp
        );

        state.rotationVelocity = lerp(
          state.rotationVelocity,
          state.velocity,
          config.rotationDamp
        );

        const absVel = Math.abs(state.rotationVelocity);
        const sign = Math.sign(state.rotationVelocity);
        const targetRotation = sign * absVel * config.rotationSensitivity;

        state.currentRotation = lerp(
          state.currentRotation,
          targetRotation,
          config.rotationLerp
        );
      }

      const finalRotation = clamp(state.currentRotation, -configRef.current.maxRotation, configRef.current.maxRotation);

      if (Math.abs(state.current - state.target) < 0.05) {
        const shift = Math.round(state.current / loopWidth) * loopWidth;

        state.current -= shift;
        state.target -= shift;
      }

      positionCards(state.current, finalRotation);
    };

    const onWheel = (event: WheelEvent) => {
      const delta = event.deltaY;

      if (Math.abs(delta) >= ACTIVE_CONTENT_CLEAR_DELTA) {
        markScrolling();
      }

      state.target += delta * configRef.current.scrollSpeed;
    };

    const onDown = (clientX: number) => {
      state.isDragging = true;
      state.lastX = clientX;
      markScrolling();
    };

    const onMove = (clientX: number) => {
      if (!state.isDragging) return;

      const delta = clientX - state.lastX;

      state.lastX = clientX;

      if (Math.abs(delta) >= ACTIVE_CONTENT_CLEAR_DELTA) {
        markScrolling();
      }

      state.target += -delta * configRef.current.scrollSpeed;
    };

    const onUp = () => {
      state.isDragging = false;
    };

    const handleMouseDown = (event: MouseEvent) => onDown(event.clientX);
    const handleMouseMove = (event: MouseEvent) => onMove(event.clientX);
    const handleMouseUp = () => onUp();

    const handleTouchStart = (event: TouchEvent) =>
      onDown(event.touches[0].clientX);
    const handleTouchMove = (event: TouchEvent) =>
      onMove(event.touches[0].clientX);
    const handleTouchEnd = () => onUp();

    const onResize = () => {
      markScrolling();
      initSetters();
      positionCards(state.current, state.currentRotation);
    };

    state.current = 0;
    state.target = 0;
    state.velocity = 0;
    state.smoothVelocity = 0;
    state.rotationVelocity = 0;
    state.currentRotation = 0;
    state.prevDirection = 0;

    activeHoverIndexRef.current = null;
    hoveredIndexRef.current = null;
    isScrollingRef.current = false;

    positionCards(0, 0);
    gsap.set(cardRefs.current, { opacity: 1 });

    const loop = createSuspendedRaf({
      root: stripRef,
      onFrame: tick,
    });
    loop.start();

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      loop.destroy();

      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }

      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cardStep, images, positionCards, markScrolling]);

  useEffect(() => {
    if (!images.length) return;

    interface AnimationEntry {
      image: HTMLElement;
      handleImageEnter: () => void;
      handleImageLeave: () => void;
      numberSplit: InstanceType<typeof SplitText>;
      titleSplit: InstanceType<typeof SplitText>;
      descriptionSplit: InstanceType<typeof SplitText>;
    }

    const animations: AnimationEntry[] = [];

    leaveHandlersRef.current = {};
    enterHandlersRef.current = {};
    activeHoverIndexRef.current = null;
    hoveredIndexRef.current = null;

    cardRefs.current.forEach((card, index) => {
      const image = imageRefs.current[index];
      const title = titleRefs.current[index];

      if (!card || !image || !title) return;

      gsap.set(title, {
        autoAlpha: 1,
      });

      const handleImageEnter = () => {
        hoveredIndexRef.current = index;
      };

      const handleImageLeave = () => {
        if (hoveredIndexRef.current === index) {
          hoveredIndexRef.current = null;
        }
      };

      image.addEventListener("mouseenter", handleImageEnter);
      image.addEventListener("mouseleave", handleImageLeave);

      animations.push({
        image,
        handleImageEnter,
        handleImageLeave,
      });
    });

    return () => {
      animations.forEach(({ image, handleImageEnter, handleImageLeave }) => {
        image.removeEventListener("mouseenter", handleImageEnter);
        image.removeEventListener("mouseleave", handleImageLeave);
      });

      leaveHandlersRef.current = {};
      enterHandlersRef.current = {};
      activeHoverIndexRef.current = null;
      hoveredIndexRef.current = null;
    };
  }, [images]);

  return (
    <div
      ref={containerRef}
      className="relative h-[390px] sm:h-[420px] md:h-[450px] w-full overflow-hidden bg-zinc-950 text-white"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div className="pointer-events-none relative flex h-full items-start pt-0 overflow-hidden max-[1025px]:items-start" style={{ perspective }}>
        <div
          ref={stripRef}
          className="transform-3d relative w-full"
          style={{ height: cardHeight }}
        >
          {images.map((item, index) => {
            const { src, number, title, desc, description } = getItemData(item);

            return (
              <div
                key={index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="pointer-events-auto absolute left-0 top-0 opacity-0 will-change-transform"
                style={{
                  width: resolvedCardWidth,
                  height: cardHeight,
                  transformOrigin: "center center",
                  transform: "translateZ(1px)",
                }}
              >
                <div
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  className="relative h-[320px] sm:h-[350px] md:h-[375px] w-full overflow-hidden bg-zinc-900"
                >
                  <img
                    src={src}
                    alt={`slide-${index}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                </div>

                <div className="mt-2.5">
                  <div
                    ref={(element) => {
                      titleRefs.current[index] = element;
                    }}
                    className="text-[20px] capitalize leading-snug tracking-normal text-white opacity-100 font-normal"
                    style={{
                      fontSize: "20px",
                      textTransform: "capitalize",
                      fontWeight: 400,
                      letterSpacing: "0px",
                    }}
                  >
                    {title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showScrollIndicator && (
        <div className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-[1vw] text-zinc-400">
          scroll

          <svg
            width="20"
            height="28"
            className="size-[1.5vw] max-[1025px]:size-[3vw] max-md:size-[4vw]"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>{`
              .chev1 { animation: fadeDown 1.4s ease-in-out infinite; }
              .chev2 { animation: fadeDown 1.4s ease-in-out 0.22s infinite; }
              .chev3 { animation: fadeDown 1.4s ease-in-out 0.44s infinite; }

              @keyframes fadeDown {
                0%   { opacity: 0.08; transform: translateY(-3px); }
                50%  { opacity: 0.55; transform: translateY(2px); }
                100% { opacity: 0.08; transform: translateY(-3px); }
              }
            `}</style>

            <polyline
              className="chev1 stroke-current"
              points="2,2 10,9 18,2"
              stroke="white"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <polyline
              className="chev2 stroke-current"
              points="2,10 10,17 18,10"
              stroke="white"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <polyline
              className="chev3 stroke-current"
              points="2,18 10,25 18,18"
              stroke="white"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export interface InfinitePerspectiveSliderProps {
  images?: InfinitePerspectiveSliderItem[];
  cardWidth?: number;
  cardGap?: number;
  perspective?: number;
  scrollSpeed?: number;
  scrollLerp?: number;
  velocityLerp?: number;
  rotationSensitivity?: number;
  rotationDamp?: number;
  rotationLerp?: number;
  maxRotation?: number;
  scrollStopDelay?: number;
  textEnterDuration?: number;
  textLeaveDuration?: number;
  textStagger?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  showScrollIndicator?: boolean;
}

export default function InfinitePerspectiveSlider(props: InfinitePerspectiveSliderProps) {
  return (
    <div className="flex w-full flex-col justify-center bg-zinc-950 text-white">
      <InfinitePerspectiveSliderComp {...props} />
    </div>
  );
}
