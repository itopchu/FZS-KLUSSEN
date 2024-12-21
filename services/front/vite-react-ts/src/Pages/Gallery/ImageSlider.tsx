import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs, FreeMode, Zoom } from "swiper/modules";
import { Img } from "react-image";
import LazyLoad from "react-lazyload";
import { Gallery } from "../../Providers/Image";

const BACKEND_URL: string = import.meta.env.VITE_URL_BACKEND as string;

export const ImageSlider: React.FC<{
  gallery: Gallery;
  onClose: () => void;
}> = ({ gallery, onClose }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!gallery || !gallery.images) {
    onClose();
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
        backdropFilter: "blur(3em)",
        bgcolor: "rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          zIndex: 1301,
          bgcolor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          padding: 2,
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.8)",
            color: "black",
          },
        }}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>

      <Box
        sx={{
          height: "80%",
          width: "100%",
          position: "relative"
        }}
      >
        <Swiper
          initialSlide={0}
          navigation
          zoom={{ maxRatio: 5 }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs, FreeMode, Zoom]}
          slidesPerView={1}
          spaceBetween={10}
          style={{ width: "100%", height: "100%" }}
          centeredSlides
        >
          {gallery.images.map((image, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LazyLoad once>
                <Img
                  loading="lazy"
                  src={`${BACKEND_URL}/${image}`}
                  alt={`Slide ${index}`}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </LazyLoad>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box
        sx={{
          height: "20%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 0",
          bgcolor: "#000000"
        }}
      >
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          spaceBetween={10}
          modules={[FreeMode, Thumbs]}
          style={{ width: "100%", height: "100%" }}
        >
          {gallery.images.map((image, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <LazyLoad offset={50} once>
                <Img
                  src={`${BACKEND_URL}/${image}`}
                  alt={`Thumbnail ${index}`}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </LazyLoad>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};