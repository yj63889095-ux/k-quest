"use client";

import { Button } from "@/components/ui/Button";
import { QuestCard } from "@/components/QuestCard";
import Link from "next/link";
import { ArrowRight, Star, Shield, Globe } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Home() {
  const { t } = useStore();

  const latestQuests = [
    {
      id: "1",
      title: "Exclusive Dining Reservation in Hongdae",
      reward: "$50.00",
      location: "Mapo-gu, Seoul",
      time: "Concierge Service",
      difficulty: "Medium" as const,
      category: "Dining",
    },
    {
      id: "2",
      title: "Private Photo Session at Haeundae Beach",
      reward: "$120.00",
      location: "Haeundae, Busan",
      time: "2 Hours",
      difficulty: "Easy" as const,
      category: "Photography",
    },
    {
      id: "3",
      title: "VIP Transport Guide: Gangnam to Incheon",
      reward: "$80.00",
      location: "Gangnam, Seoul",
      time: "Transport",
      difficulty: "Medium" as const,
      category: "Transport",
    },
  ];

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white overflow-x-hidden">
      {/* Hero Section - Full Screen Cinematic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#1A1A1A] z-10" />
          {/* Placeholder for a high-end video or image */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center animate-fade-in scale-105 transition-transform duration-[20s]" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full">
          <p className="text-[#D4AF37] text-xs md:text-sm lg:text-base uppercase tracking-[0.3em] mb-4 md:mb-6 animate-fade-in delay-100">
            {t.hero.subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white mb-6 md:mb-8 leading-tight animate-fade-in delay-200">
            {t.hero.title}
          </h1>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl font-light mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300 px-4">
            {t.hero.description}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 animate-fade-in delay-300 w-full md:w-auto">
            <Link href="/quests" className="w-full md:w-auto">
              <Button variant="primary" size="lg" className="w-full md:min-w-[200px]">
                {t.hero.explore}
              </Button>
            </Link>
            <Link href="/company" className="w-full md:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full md:min-w-[200px] hover:bg-white hover:text-black transition-colors"
                style={{ color: 'white', borderColor: 'white', borderWidth: '1px' }}
              >
                {t.hero.philosophy}
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-[#1A1A1A] relative">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 border border-[#333] hover:border-[#D4AF37] transition-colors duration-500 group">
              <Star className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif mb-4 text-white">Premium Quality</h3>
              <p className="text-gray-400 font-light">Curated tasks ensuring the highest standard of service and satisfaction.</p>
            </div>
            <div className="p-8 border border-[#333] hover:border-[#D4AF37] transition-colors duration-500 group">
              <Shield className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif mb-4 text-white">Secure & Private</h3>
              <p className="text-gray-400 font-light">Your transactions and data are protected with enterprise-grade security.</p>
            </div>
            <div className="p-8 border border-[#333] hover:border-[#D4AF37] transition-colors duration-500 group">
              <Globe className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif mb-4 text-white">Global Access</h3>
              <p className="text-gray-400 font-light">Seamlessly connect with Korea from anywhere in the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection (Latest Quests) */}
      <section className="py-32 bg-[#111] border-t border-[#333]">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-2">{t.quest.subtitle}</p>
              <h2 className="text-4xl md:text-5xl font-serif text-white">{t.quest.title}</h2>
            </div>
            <Link href="/quests" className="group flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors mt-6 md:mt-0">
              <span className="uppercase tracking-widest text-sm">{t.common.viewDetails}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestQuests.map((quest) => (
              <QuestCard key={quest.id} {...quest} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
