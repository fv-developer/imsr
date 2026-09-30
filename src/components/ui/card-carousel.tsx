"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 2000,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 40px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 225px;
  }
  
  @media (min-width: 640px) {
    .swiper-slide {
      width: 440px;
      height: 330px;
    }
  }

  @media (min-width: 1024px) {
    .swiper-slide {
      width: 540px;
      height: 410px;
    }
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .swiper-pagination-bullet {
    width: 10px !important;
    height: 4px !important;
    border-radius: 9999px !important;
    background-color: #cbd5e1 !important;
    opacity: 0.6 !important;
    transition: all 0.3s ease !important;
  }

  .swiper-pagination-bullet-active {
    width: 15px !important;
    height: 4px !important;
    border-radius: 9999px !important;
    background-color: #00937e !important;
    opacity: 1 !important;
  }
  `
  return (
    <section className="w-full">
      <style>{css}</style>
      <div className="w-full">
        <Swiper
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          spaceBetween={16}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          pagination={showPagination ? { clickable: true } : false}
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : undefined
          }
          modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full rounded-none overflow-hidden bg-white p-2.5 shadow-md border border-zinc-200">
                <div className="relative w-full h-full rounded-none overflow-hidden bg-zinc-950">
                  <Image
                    src={image.src}
                    fill
                    className="object-cover object-center brightness-95"
                    alt={image.alt || "Placement Gallery"}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
