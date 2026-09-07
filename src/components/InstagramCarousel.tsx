import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/anim/Reveal';
import {
  Instagram,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/radek_vetrovsky/';

interface ReelVideo {
  id: number;
  src: string;
  poster: string;
  title: string;
  category: string;
}

const REEL_VIDEOS: ReelVideo[] = [
  {
    id: 1,
    src: '/videos/reel-1.mp4',
    poster: '/videos/reel-1-poster.jpg',
    title: 'Prodej rekreační chalupy v klidné přírodě',
    category: 'Videoprohlídka',
  },
  {
    id: 2,
    src: '/videos/reel-2.mp4',
    poster: '/videos/reel-2-poster.jpg',
    title: 'Zákulisí práce realitního makléře a natáčení nemovitostí',
    category: 'Zákulisí makléře',
  },
  {
    id: 3,
    src: '/videos/reel-3.mp4',
    poster: '/videos/reel-3-poster.jpg',
    title: 'Příbramáci pozor! Aktuální příležitosti na realitním trhu',
    category: 'Aktuálně Příbram',
  },
  {
    id: 4,
    src: '/videos/reel-4.mp4',
    poster: '/videos/reel-4-poster.jpg',
    title: 'Prodej rodinného domu Příbram a okolí',
    category: 'Prodej domu',
  },
  {
    id: 5,
    src: '/videos/reel-5.mp4',
    poster: '/videos/reel-5-poster.jpg',
    title: 'Kvalitní rekonstrukce bytu – nová moderní koupelna',
    category: 'Rekonstrukce',
  },
  {
    id: 6,
    src: '/videos/reel-6.mp4',
    poster: '/videos/reel-6-poster.jpg',
    title: 'Představení kompletně zařízeného moderního bytu',
    category: 'Prodej bytu',
  },
];

const InstagramCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartPos = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  // Responsive window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? REEL_VIDEOS.length - 1 : prev - 1));
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === REEL_VIDEOS.length - 1 ? 0 : prev + 1));
    setProgress(0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  // Playback coordination when activeIndex or isPlaying changes
  useEffect(() => {
    videoRefs.current.forEach((videoEl, index) => {
      if (!videoEl) return;

      if (index === activeIndex) {
        videoEl.muted = isMuted;
        if (isPlaying) {
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser autoplay policy catch - user needs to interact first
              setIsPlaying(false);
            });
          }
        } else {
          videoEl.pause();
        }
      } else {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    });
  }, [activeIndex, isPlaying, isMuted]);

  // Sync mute state on all video elements
  useEffect(() => {
    videoRefs.current.forEach((videoEl) => {
      if (videoEl) {
        videoEl.muted = isMuted;
      }
    });
  }, [isMuted]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Pointer drag/swipe gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartPos.current) return;
    const deltaX = Math.abs(e.clientX - pointerStartPos.current.x);
    if (deltaX > 8) {
      isDragging.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartPos.current) return;
    const deltaX = e.clientX - pointerStartPos.current.x;
    const threshold = 40;

    if (deltaX > threshold) {
      prevSlide();
    } else if (deltaX < -threshold) {
      nextSlide();
    }

    pointerStartPos.current = null;
    setTimeout(() => {
      isDragging.current = false;
    }, 100);
  };

  // Video progress updater for active reel
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.currentTarget;
    if (target.duration) {
      setProgress((target.currentTime / target.duration) * 100);
    }
  };

  // 3D Geometry calculations
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const getCardStyle = (index: number) => {
    const total = REEL_VIDEOS.length;
    let diff = index - activeIndex;

    // Shortest circular difference
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;

    if (diff === 0) {
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
        filter: 'brightness(1)',
        pointerEvents: 'auto' as const,
      };
    }

    if (diff === 1) {
      const tx = isMobile ? 155 : isTablet ? 230 : 280;
      const tz = isMobile ? -80 : -130;
      const rot = isMobile ? -24 : -30;
      return {
        x: tx,
        z: tz,
        rotateY: rot,
        scale: isMobile ? 0.85 : 0.88,
        opacity: isMobile ? 0.75 : 0.85,
        zIndex: 20,
        filter: 'brightness(0.72)',
        pointerEvents: 'auto' as const,
      };
    }

    if (diff === -1) {
      const tx = isMobile ? -155 : isTablet ? -230 : -280;
      const tz = isMobile ? -80 : -130;
      const rot = isMobile ? 24 : 30;
      return {
        x: tx,
        z: tz,
        rotateY: rot,
        scale: isMobile ? 0.85 : 0.88,
        opacity: isMobile ? 0.75 : 0.85,
        zIndex: 20,
        filter: 'brightness(0.72)',
        pointerEvents: 'auto' as const,
      };
    }

    if (diff === 2) {
      const tx = isMobile ? 260 : isTablet ? 410 : 510;
      const tz = isMobile ? -170 : -250;
      const rot = isMobile ? -42 : -50;
      return {
        x: tx,
        z: tz,
        rotateY: rot,
        scale: isMobile ? 0.7 : 0.75,
        opacity: isMobile ? 0.2 : 0.45,
        zIndex: 10,
        filter: 'brightness(0.45)',
        pointerEvents: 'auto' as const,
      };
    }

    if (diff === -2) {
      const tx = isMobile ? -260 : isTablet ? -410 : -510;
      const tz = isMobile ? -170 : -250;
      const rot = isMobile ? 42 : 50;
      return {
        x: tx,
        z: tz,
        rotateY: rot,
        scale: isMobile ? 0.7 : 0.75,
        opacity: isMobile ? 0.2 : 0.45,
        zIndex: 10,
        filter: 'brightness(0.45)',
        pointerEvents: 'auto' as const,
      };
    }

    // diff === 3 or -3 (back side of panoramic cylinder)
    return {
      x: 0,
      z: -420,
      rotateY: 0,
      scale: 0.5,
      opacity: 0,
      zIndex: 1,
      filter: 'brightness(0.2)',
      pointerEvents: 'none' as const,
    };
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-muted/50 overflow-hidden relative selection:bg-secondary/30">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[350px] bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Editorial Asymmetric Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-10 md:mb-14">
        <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-6 border-b border-border/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                05 — INSTAGRAM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
              Sledujte mě na Instagramu
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-5 lg:pb-1">
              Videoprohlídky nemovitostí, zákulisí makléřské práce a aktuální dění
              na realitním trhu v Příbrami a okolí.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-secondary hover:bg-secondary/90 pl-6 pr-2 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-xl shadow-secondary/25 transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="inline-flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                @radek.vetrovsky
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-secondary transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* 3D Panoramic Carousel Stage */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl md:rounded-3xl"
          style={{
            perspective: isMobile ? '900px' : '1350px',
          }}
        >
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Předchozí video"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-13 md:h-13 rounded-full bg-background/85 hover:bg-background text-foreground border border-border/70 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 hover:border-secondary hover:text-secondary group"
          >
            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Další video"
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-13 md:h-13 rounded-full bg-background/85 hover:bg-background text-foreground border border-border/70 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 hover:border-secondary hover:text-secondary group"
          >
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
          </button>

        {/* 3D Panoramic Cards Ring */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            height: isMobile ? '450px' : isTablet ? '510px' : '570px',
          }}
        >
          {REEL_VIDEOS.map((video, index) => {
            const isCurrent = index === activeIndex;
            const style = getCardStyle(index);

            return (
              <motion.div
                key={video.id}
                animate={{
                  x: style.x,
                  z: style.z,
                  rotateY: style.rotateY,
                  scale: style.scale,
                  opacity: style.opacity,
                  filter: style.filter,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                  mass: 0.85,
                }}
                onClick={() => {
                  if (isDragging.current) return;
                  if (!isCurrent) {
                    goToSlide(index);
                  } else {
                    setIsPlaying((prev) => !prev);
                  }
                }}
                className={`absolute w-[220px] sm:w-[260px] md:w-[295px] aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border transition-colors duration-300 ${
                  isCurrent
                    ? 'border-secondary/60 ring-2 ring-secondary/30 shadow-secondary/15 cursor-pointer'
                    : 'border-border/60 hover:border-secondary/40 cursor-pointer'
                }`}
                style={{
                  zIndex: style.zIndex,
                  transformStyle: 'preserve-3d',
                  pointerEvents: style.pointerEvents,
                }}
              >
                {/* HTML5 Video Element */}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  poster={video.poster}
                  playsInline
                  loop
                  defaultMuted
                  muted={isMuted}
                  preload="auto"
                  aria-label={video.title}
                  onTimeUpdate={isCurrent ? handleTimeUpdate : undefined}
                  className="w-full h-full object-cover bg-black"
                />

                {/* Inactive Card Overlay */}
                {!isCurrent && (
                  <div className="absolute inset-0 bg-black/35 hover:bg-black/20 flex items-center justify-center p-4 transition-colors z-10">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Active Card Controls Overlay */}
                {isCurrent && (
                  <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
                    {/* Center Play/Pause Floating Icon Indicator */}
                    <AnimatePresence>
                      {!isPlaying && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          className="self-center my-auto w-14 h-14 rounded-full bg-black/65 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-2xl pointer-events-none"
                        >
                          <Play className="h-6 w-6 fill-white ml-1" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div />

                    {/* Bottom Minimal Controls Bar */}
                    <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3.5 md:p-4 pt-10 pointer-events-auto">
                      {/* Interactive Buttons Bar */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {/* Play/Pause Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPlaying((prev) => !prev);
                            }}
                            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors border border-white/20"
                            aria-label={isPlaying ? 'Pozastavit' : 'Přehrát'}
                            title={isPlaying ? 'Pozastavit' : 'Přehrát'}
                          >
                            {isPlaying ? (
                              <Pause className="h-3.5 w-3.5 fill-white" />
                            ) : (
                              <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
                            )}
                          </button>

                          {/* Sound Mute/Unmute Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMuted((prev) => !prev);
                            }}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors border ${
                              !isMuted
                                ? 'bg-secondary text-secondary-foreground border-secondary font-bold'
                                : 'bg-black/50 hover:bg-black/70 text-white border-white/20'
                            }`}
                            aria-label={isMuted ? 'Zapnout zvuk' : 'Ztlumit zvuk'}
                            title={isMuted ? 'Zapnout zvuk' : 'Ztlumit zvuk'}
                          >
                            {isMuted ? (
                              <VolumeX className="h-3.5 w-3.5" />
                            ) : (
                              <Volume2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Open in Instagram Link */}
                        <a
                          href={INSTAGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white text-[11px] font-medium backdrop-blur-md border border-white/20 transition-colors"
                        >
                          <Instagram className="h-3 w-3 text-secondary" />
                          <span>Instagram</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      </div>

                      {/* Video Timeline Progress Bar */}
                      <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden mt-2.5">
                        <div
                          className="h-full bg-secondary transition-all duration-100 ease-linear rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>

      {/* Pagination Indicators & Quick Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {REEL_VIDEOS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Přejít na video ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? 'w-7 h-2.5 bg-secondary shadow-sm shadow-secondary/40'
                  : 'w-2.5 h-2.5 bg-foreground/20 hover:bg-foreground/40'
              }`}
            />
          ))}
        </div>

        {/* Direct Link Button */}
        <div className="sm:ml-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-background hover:bg-muted text-foreground border border-border shadow-sm hover:border-secondary hover:text-secondary transition-all"
          >
            <Instagram className="h-3.5 w-3.5 text-secondary" />
            <span>Sledovat @radek.vetrovsky</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramCarousel;
