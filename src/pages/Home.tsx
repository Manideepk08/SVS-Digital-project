import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Award, Clock, Shield, Palette } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeroCollage from "./HeroCollage";

const productImages = [
  { src: "/product images/t-shirts.png", name: "T-Shirts", category: "T-Shirt" },
  { src: "/product images/mugs , cups , bottles.png", name: "Mugs & Bottles", category: "Mug" },
  { src: "/product images/bussiness cards.png", name: "Business Cards", category: "Business Card" },
  { src: "/product images/invitation cards.png", name: "Invitation Cards", category: "Decoration" },
  { src: "/product images/school daires.png", name: "School Diaries", category: "Calendar" },
  { src: "/product images/rings.png", name: "Rings", category: "Decoration" },
  { src: "/product images/wedding card design.png", name: "Wedding Card Design", category: "Decoration" },
  { src: "/product images/cups , bags.png", name: "Cups & Bags", category: "Mug" },
  { src: "/product images/bottles , books.png", name: "Bottles & Books", category: "Mug" },
  { src: "/product images/keychains , certificates.png", name: "Keychains & Certificates", category: "Decoration" },
];

const categories = ["All", "T-Shirt", "Mug", "Business Card", "Calendar", "Decoration"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts =
    selectedCategory === "All"
      ? productImages
      : productImages.filter((p) => p.category === selectedCategory);

  const featuredProducts = products.slice(0, 4);

  // Animation state for features section
  const featuresRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [cursorX, setCursorX] = useState(0.5); // 0 (left) to 1 (right)

  // Animation state for popular services section
  const popularRef = useRef<HTMLDivElement>(null);
  const [popularInView, setPopularInView] = useState(false);

  // Animation state for digital & printing solutions section
  const digitalRef = useRef<HTMLDivElement>(null);
  const [digitalInView, setDigitalInView] = useState(false);

  useEffect(() => {
    // Check if features section is in view
    const handleScroll = () => {
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect();
        const inViewNow = rect.top < window.innerHeight && rect.bottom > 0;
        setInView(inViewNow);
      }
      if (popularRef.current) {
        const rect = popularRef.current.getBoundingClientRect();
        const inViewNow = rect.top < window.innerHeight && rect.bottom > 0;
        setPopularInView(inViewNow);
      }
      if (digitalRef.current) {
        const rect = digitalRef.current.getBoundingClientRect();
        const inViewNow = rect.top < window.innerHeight && rect.bottom > 0;
        setDigitalInView(inViewNow);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Mouse move effect for horizontal animation
    const handleMouseMove = (e: MouseEvent) => {
      if (!featuresRef.current) return;
      const rect = featuresRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Normalize cursor X position within the section (0 = left, 1 = right)
        const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        setCursorX(x);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-[#f9f6f2] min-h-screen">
      <HeroCollage />

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900" ref={featuresRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose SVS Digitals?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Located in Shaikpet, Hyderabad, we provide exceptional printing services with personalized attention.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-8 w-8 text-blue-600" />, bg: "bg-blue-100", title: "Premium Quality", desc: "High-quality materials and professional printing technology for superior results.",
              },
              {
                icon: <Clock className="h-8 w-8 text-green-600" />, bg: "bg-green-100", title: "Quick Service", desc: "Fast turnaround times without compromising on quality and attention to detail.",
              },
              {
                icon: <Palette className="h-8 w-8 text-purple-600" />, bg: "bg-purple-100", title: "Custom Designs", desc: "Personalized designs and custom solutions tailored to your specific needs.",
              },
              {
                icon: <Shield className="h-8 w-8 text-orange-600" />, bg: "bg-orange-100", title: "Local Service", desc: "Conveniently located in Shaikpet, Hyderabad with personalized customer service.",
              },
            ].map((item, idx) => {
              // Calculate translateX based on cursorX: -32px (left) to +32px (right)
              const translate = (cursorX - 0.5) * 64; // -32 to +32
              return (
                <div
                  key={item.title}
                  className={`text-center p-6 bg-blue-950/80 rounded-xl shadow-lg transition-transform duration-700 ease-out ${inView ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    transform: `translateX(${translate}px) translateY(${inView ? 0 : -40}px) rotateZ(${inView ? 0 : -360}deg) scale(${inView ? 1 : 0.8})`,
                    transitionDelay: `${idx * 120}ms`,
                  }}
                >
                  <div className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`} style={{boxShadow: '0 0 32px 0 rgba(0,0,0,0.10), 0 4px 16px 0 rgba(0,0,0,0.08)'}}>{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black" ref={popularRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Popular Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From business essentials to special occasions, we offer comprehensive printing solutions.
            </p>
          </div>
          
          <style>{`
            @keyframes card-slide-in-left {
              0% { opacity: 0; transform: translateX(-80px) scale(0.96); }
              80% { opacity: 1; transform: translateX(8px) scale(1.03); }
              100% { opacity: 1; transform: translateX(0) scale(1); }
            }
            @keyframes card-slide-in-right {
              0% { opacity: 0; transform: translateX(80px) scale(0.96); }
              80% { opacity: 1; transform: translateX(-8px) scale(1.03); }
              100% { opacity: 1; transform: translateX(0) scale(1); }
            }
            .animate-card-slide-in-left { animation: card-slide-in-left 0.9s cubic-bezier(.4,0,.2,1) both; }
            .animate-card-slide-in-right { animation: card-slide-in-right 0.9s cubic-bezier(.4,0,.2,1) both; }
          `}</style>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => {
              // Assign a unique background color for each card
              const cardBgColors = [
                'bg-gradient-to-br from-blue-800 via-blue-700 to-gray-900',
                'bg-gradient-to-br from-green-800 via-green-700 to-gray-900',
                'bg-gradient-to-br from-purple-800 via-purple-700 to-gray-900',
                'bg-gradient-to-br from-pink-800 via-pink-700 to-gray-900',
              ];
              const animationClass = popularInView
                ? (idx < 2 ? 'animate-card-slide-in-left' : 'animate-card-slide-in-right')
                : 'opacity-0';
              return (
                <div
                  className={`${cardBgColors[idx % cardBgColors.length]} rounded-xl shadow-lg p-2 transition-all duration-700 ${animationClass}`}
                  style={popularInView ? { animationDelay: `${idx * 0.18 + 0.2}s` } : {}}
                  key={product.id}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" ref={digitalRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <style>{`
                @keyframes digital-slide-in-left {
                  0% { opacity: 0; transform: translateX(-80px) scale(0.96); }
                  80% { opacity: 1; transform: translateX(8px) scale(1.03); }
                  100% { opacity: 1; transform: translateX(0) scale(1); }
                }
                .animate-digital-slide-in-left { animation: digital-slide-in-left 0.9s cubic-bezier(.4,0,.2,1) both; }
              `}</style>
              <h2 className={`text-3xl font-bold mb-6 text-white transition-all duration-700 ${digitalInView ? 'animate-digital-slide-in-left' : 'opacity-0'}`} style={digitalInView ? { animationDelay: '0.1s' } : {}}>
                Complete Digital & Printing Solutions
              </h2>
              <p className={`mb-6 text-gray-200 text-lg transition-all duration-700 ${digitalInView ? 'animate-digital-slide-in-left' : 'opacity-0'}`} style={digitalInView ? { animationDelay: '0.3s' } : {}}>
                We specialize in a wide range of printing services, from corporate materials to personal celebrations, all delivered with professional quality and care.
              </p>
              <div className="space-y-4">
                {[
                  'Business Cards & Corporate Materials',
                  'Wedding Cards & Invitations',
                  'Photo Printing & Albums',
                  'Custom T-Shirts & Apparel',
                  'Promotional Items (Mugs, Keychains)',
                  'Brochures & Marketing Materials'
                ].map((service, idx) => {
                  const serviceBgColors = [
                    'bg-gradient-to-r from-teal-700 via-teal-600 to-gray-900',
                    'bg-gradient-to-r from-orange-700 via-orange-600 to-gray-900',
                    'bg-gradient-to-r from-indigo-800 via-indigo-700 to-gray-900',
                    'bg-gradient-to-r from-rose-700 via-rose-600 to-gray-900',
                    'bg-gradient-to-r from-lime-700 via-lime-600 to-gray-900',
                    'bg-gradient-to-r from-sky-700 via-sky-600 to-gray-900',
                  ];
                  return (
                    <div
                      key={service}
                      className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-white shadow transition-all duration-700 ${digitalInView ? 'animate-digital-slide-in-left' : 'opacity-0'} ${serviceBgColors[idx % serviceBgColors.length]}`}
                      style={digitalInView ? { animationDelay: `${0.5 + idx * 0.18}s` } : {}}
                    >
                      <Check className="h-5 w-5 text-white" />
                      <span className="font-medium">{service}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6802043/pexels-photo-6802043.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Printing services"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote or visit our shop in Shaikpet, Hyderabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:9700000451"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Call: 97000 00451
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}