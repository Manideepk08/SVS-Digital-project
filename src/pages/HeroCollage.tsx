import React, { useRef, useEffect, useState } from "react";
import { Printer } from 'lucide-react';

const productMockups = [
  { src: "/product images/mugs , cups , bottles.png", name: "Custom Mug", style: "left-[150px] top-[80px] w-[180px] h-[220px] z-10 animate-float delay-0" },
  { src: "/product images/t-shirts.png", name: "Custom T-Shirt", style: "right-[200px] top-[400px] w-[180px] h-[220px] z-10 animate-float delay-200" },
  { src: "/product images/bussiness cards.png", name: "Business Cards", style: "left-[-40px] bottom-[80px] w-[180px] h-[220px] z-10 animate-float delay-400" },
];

const heroImages = [
  { src: "/hero section images/preview 1.webp", style: "right-[1000px] top-[70px] w-[300px] h-[180px] z-20 animate-float delay-0" },
  { src: "/hero section images/preview 2.webp", style: "left-[900px] bottom-[300px] w-[260px] h-[180px] z-20 animate-float delay-200" },
  { src: "/hero section images/preview 3.webp", style: "right-[-100px] bottom-[100px] w-[260px] h-[180px] z-20 animate-float delay-400" },
];

const features = [
  {
    icon: "🎨",
    title: "Fully Customizable",
    desc: "Easy to customize colors, fonts, and layouts to match your brand perfectly.",
    in: "animate-jump-in-left",
    out: "animate-jump-out-left"
  },
  {
    icon: "📱",
    title: "Mobile Responsive",
    desc: "Looks stunning on all devices with optimized mobile shopping experience.",
    in: "animate-jump-in-up",
    out: "animate-jump-out-up"
  },
  {
    icon: "🚀",
    title: "Conversion Optimized",
    desc: "Built with proven e-commerce best practices to maximize your sales.",
    in: "animate-jump-in-right",
    out: "animate-jump-out-right"
  }
];

export default function HeroCollage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [reverse, setReverse] = useState(false);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setReverse(currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setShowFeatures(true);
        else setShowFeatures(false);
      },
      { threshold: 0.2 }
    );
    if (featuresRef.current) observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[700px] flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 overflow-hidden">
      {/* Floating animation keyframes and jump-in/out keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .delay-0 { animation-delay: 1.2s; }
        .delay-200 { animation-delay: 2.6s; }
        .delay-400 { animation-delay: 4.2s; }
        @keyframes jump-in-left {
          0% { opacity: 0; transform: translateX(-160px) scale(0.7); }
          60% { opacity: 1; transform: translateX(20px) scale(1.1); }
          80% { transform: translateX(-10px) scale(0.98); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes jump-in-right {
          0% { opacity: 0; transform: translateX(160px) scale(0.7); }
          60% { opacity: 1; transform: translateX(-20px) scale(1.1); }
          80% { transform: translateX(10px) scale(0.98); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes jump-in-up {
          0% { opacity: 0; transform: translateY(120px) scale(0.7); }
          60% { opacity: 1; transform: translateY(-20px) scale(1.1); }
          80% { transform: translateY(10px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes jump-out-left {
          0% { opacity: 1; transform: translateX(0) scale(1); }
          40% { opacity: 1; transform: translateX(-10px) scale(0.98); }
          60% { opacity: 1; transform: translateX(20px) scale(1.1); }
          100% { opacity: 0; transform: translateX(-160px) scale(0.7); }
        }
        @keyframes jump-out-right {
          0% { opacity: 1; transform: translateX(0) scale(1); }
          40% { opacity: 1; transform: translateX(10px) scale(0.98); }
          60% { opacity: 1; transform: translateX(-20px) scale(1.1); }
          100% { opacity: 0; transform: translateX(160px) scale(0.7); }
        }
        @keyframes jump-out-up {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          40% { opacity: 1; transform: translateY(10px) scale(0.98); }
          60% { opacity: 1; transform: translateY(-20px) scale(1.1); }
          100% { opacity: 0; transform: translateY(120px) scale(0.7); }
        }
        .animate-jump-in-left { animation: jump-in-left 1.2s cubic-bezier(.4,0,.2,1) forwards; }
        .animate-jump-in-right { animation: jump-in-right 1.2s cubic-bezier(.4,0,.2,1) forwards; }
        .animate-jump-in-up { animation: jump-in-up 1.2s cubic-bezier(.4,0,.2,1) forwards; }
        .animate-jump-out-left { animation: jump-out-left 1.2s cubic-bezier(.4,0,.2,1) forwards; }
        .animate-jump-out-right { animation: jump-out-right 1.2s cubic-bezier(.4,0,.2,1) forwards; }
        .animate-jump-out-up { animation: jump-out-up 1.2s cubic-bezier(.4,0,.2,1) forwards; }
      `}</style>
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7vw] font-extrabold text-white opacity-10 select-none pointer-events-none whitespace-nowrap tracking-widest z-0" style={{letterSpacing: '0.2em'}}>SVSDIGITALS</div>
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-16 pb-8 px-4">
        {/* Floating Elements */}
        <div className="relative w-full h-[600px] mx-auto">
          {/* Centered Logo and Text Overlay */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-30 text-center pointer-events-none select-none px-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
                <Printer className="h-10 w-10 text-white" />
              </div>
              <div>
                <span className="text-4xl md:text-5xl font-extrabold text-gray-900">SVS</span>
                <span className="text-4xl md:text-5xl font-extrabold text-green-500">digitals</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 drop-shadow-lg">Professional Printing & Digital Services in Hyderabad</h1>
          </div>
          {/* Product Mockups with floating animation and larger images, no price */}
          {productMockups.map((mockup, i) => (
            <div key={i} className={`absolute bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-4 ${mockup.style} transition-transform duration-300 hover:-translate-y-2`}>
              <img src={mockup.src} alt={mockup.name} className="w-32 h-32 object-contain rounded-lg mb-2" />
              <div className="font-bold text-gray-700 text-center mb-1 text-lg">{mockup.name}</div>
            </div>
          ))}
          {/* Hero Section Images with floating animation */}
          {heroImages.map((img, i) => (
            <div key={i} className={`absolute rounded-xl shadow-lg overflow-hidden ${img.style} flex flex-col`}>
              <img src={img.src} alt={`Hero Preview ${i+1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {/* Features Section with scroll-triggered jump-in/out animation */}
        <div ref={featuresRef} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`bg-white rounded-xl shadow p-8 flex flex-col items-center transition-all duration-700 ${showFeatures ? feature.in : feature.out}`}
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-200 text-3xl mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 