import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/swiper-bundle.css';

const testimonials = [
  {
    name: "Priya & Rahul",
    date: "February 2024",
    venue: "The Royal Palace, Mumbai",
    image: "/images/testimonials/couple1.jpg",
    text: "Sort My Shaadi transformed our wedding planning journey. The AI-powered venue recommendations were spot-on!",
    rating: 5
  },
  {
    name: "Anita & Vikram",
    image: "/images/testimonials/couple2.jpg",
    text: "The decor options were amazing, and the booking process was seamless. Highly recommend!",
    location: "Mumbai"
  },
  // Add more testimonials...
];

function TestimonialCarousel() {
  return (
    <section className="bg-[#ffffff] text-[#1f2937] py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[var(--bg-gradient-1)]" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--accent-3)] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#1f2937] mb-4">
            Love Stories We've Been Part Of
          </h2>
          <p className="text-xl text-[#6b7280]">
            Real couples, real celebrations
          </p>
        </motion.div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="w-[400px]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-[#fce4ec] p-8 rounded-2xl shadow-lg"
              >
                <div className="relative mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937]/60 to-transparent rounded-xl" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-[#1f2937] font-serif text-xl">{testimonial.name}</h3>
                    <p className="text-[#1f2937]/80 text-sm">{testimonial.venue}</p>
                  </div>
                </div>
                
                <p className="text-[#1f2937] italic mb-4">
                  "{testimonial.text}"
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#1f2937]">
                    {Array(5).fill('★').map((star, i) => (
                      <span key={i} className={i < testimonial.rating ? 'text-[#1f2937]' : 'text-gray-300'}>
                        {star}
                      </span>
                    ))}
                  </span>
                  <span className="text-[#1f2937]">{testimonial.date}</span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
