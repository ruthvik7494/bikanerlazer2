import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  reviewsCount: number;
  photosCount?: number;
  rating: number;
  date: string;
  content: string;
  avatar?: string;
  verified?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "abhishek singh rajpurohit",
    role: "Local Guide",
    reviewsCount: 7,
    photosCount: 33,
    rating: 5,
    date: "2 years ago",
    content: "Exceptional metal CNC cutting service in Bikaner! Bikaner Laser Metal CNC Cutting surpassed my expectations with their precision and craftsmanship. They skillfully cut and crafted a beautiful name plate design from metal, showcasing a remarkable attention to detail. Highly recommend for anyone seeking quality metalwork!",
    verified: true,
  },
  {
    id: 2,
    name: "Rahul Chaudhary",
    role: "Local Guide",
    reviewsCount: 2,
    photosCount: 41,
    rating: 5,
    date: "a year ago",
    content: "Industrial equipment and manufacture/ machinary restoration export and 2D 3D design all work off ms ss GI plate",
    verified: true,
  },
  {
    id: 3,
    name: "tina buter",
    role: "Customer",
    reviewsCount: 2,
    photosCount: 6,
    rating: 5,
    date: "a year ago",
    content: "The custom cutting services offered by Bikaner Laser Metal CNC Cutting are outstanding. I had stainless steel parts cut with perfect precision. Very happy with their work and turnaround time.",
    verified: false,
  },
  {
    id: 4,
    name: "Abhas Pathak",
    role: "Local Guide",
    reviewsCount: 11,
    rating: 5,
    date: "a year ago",
    content: "I approached bikaner laser metal cnc cutting for precision steel cutting of an industrial project and their team exceeded my expectations. Their cnc cutting machines are state-of-the-art and they completed the work with exceptional accuracy and on time . highly recommended :)",
    verified: true,
  },
  {
    id: 5,
    name: "Sachin Rawat",
    role: "Local Guide",
    reviewsCount: 23,
    photosCount: 8,
    rating: 5,
    date: "a year ago",
    content: "This workshop creates magic . I gave him a complex task and what an amazing product he made . The craftsmanship is very unique and the finish is elegant . Must try for those who all want to creat magic with steel / metal art .",
    verified: true,
  },
  {
    id: 6,
    name: "Customer Review",
    role: "Local Guide",
    reviewsCount: 12,
    rating: 5,
    date: "6 months ago",
    content: "Highly recommend this princely craftsmanship to elevate any space!",
    verified: true,
  },
  {
    id: 7,
    name: "Business Client",
    role: "Local Guide",
    reviewsCount: 5,
    rating: 5,
    date: "8 months ago",
    content: "Value for money and good work",
    verified: true,
  }
];

const GoogleReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/10 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6">
              <div className="flex">
                <span className="text-[#4285F4] font-bold text-4xl sm:text-5xl tracking-tighter">G</span>
                <span className="text-[#EA4335] font-bold text-4xl sm:text-5xl tracking-tighter">o</span>
                <span className="text-[#FBBC05] font-bold text-4xl sm:text-5xl tracking-tighter">o</span>
                <span className="text-[#4285F4] font-bold text-4xl sm:text-5xl tracking-tighter">g</span>
                <span className="text-[#34A853] font-bold text-4xl sm:text-5xl tracking-tighter">l</span>
                <span className="text-[#EA4335] font-bold text-4xl sm:text-5xl tracking-tighter">e</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-display font-bold text-foreground/90 tracking-tight">Few of the reviews from our clients</h2>
            </div>
            
            <div className="flex items-center gap-6 bg-card/50 px-6 py-3 rounded-2xl border border-border/50 shadow-sm">
              <span className="text-5xl font-bold tracking-tighter">5.0</span>
              <div className="flex flex-col items-start">
                <div className="flex text-[#FBBC05] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">75 reviews</span>
              </div>
            </div>
          </div>


        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="flex gap-6 overflow-hidden py-4">
            <AnimatePresence initial={false} custom={direction}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {/* We'll show 3 cards at a time on desktop, 1 on mobile */}
                {[0, 1, 2].map((offset) => {
                  const index = (currentIndex + offset) % reviews.length;
                  const review = reviews[index];
                  return (
                    <motion.div
                      key={`${review.id}-${offset}`}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      className={`bg-card border border-border p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full ${offset > 0 ? 'hidden md:flex' : 'flex'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xl overflow-hidden border border-border">
                              {review.avatar ? (
                                <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                              ) : (
                                review.name.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-0.5 shadow-sm border border-border">
                              <svg viewBox="0 0 24 24" className="w-full h-full">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                              </svg>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="font-semibold text-foreground capitalize line-clamp-1">{review.name}</h4>
                              {review.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{review.date}</span>
                            </div>
                            <div className="flex text-[#FBBC05] mt-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-muted-foreground opacity-20">
                           <MessageSquare className="w-5 h-5" />
                        </div>
                      </div>

                      <p className="text-sm text-foreground/80 leading-relaxed mb-4 flex-grow line-clamp-4">
                        {review.content}
                      </p>

                    </motion.div>

                  );
                })}
              </div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={slidePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={slideNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:bg-primary/50 ${
                i === currentIndex ? 'w-8 bg-primary' : 'bg-primary/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
