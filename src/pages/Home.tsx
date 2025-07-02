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

  useEffect(() => {
    // Check if features section is in view
    const handleScroll = () => {
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect();
        const inViewNow = rect.top < window.innerHeight && rect.bottom > 0;
        setInView(inViewNow);
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
      <section className="py-16 bg-gray-50" ref={featuresRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SVS Digitals?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
                  className={`text-center p-6 transition-transform duration-500 ease-out ${inView ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    transform: `translateX(${translate}px)`,
                    transitionDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Popular Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From business essentials to special occasions, we offer comprehensive printing solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Complete Digital & Printing Solutions
              </h2>
              <p className="text-gray-600 mb-6">
                We specialize in a wide range of printing services, from corporate materials to 
                personal celebrations, all delivered with professional quality and care.
              </p>
              
              <div className="space-y-4">
                {[
                  'Business Cards & Corporate Materials',
                  'Wedding Cards & Invitations',
                  'Photo Printing & Albums',
                  'Custom T-Shirts & Apparel',
                  'Promotional Items (Mugs, Keychains)',
                  'Brochures & Marketing Materials'
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
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