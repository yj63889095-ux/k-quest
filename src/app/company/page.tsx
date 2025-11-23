"use client";

import { useStore } from "@/lib/store";

export default function CompanyInfoPage() {
    const { language } = useStore();

    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Main Title - Elegant Serif Font */}
                <h1 className="text-5xl font-serif mb-16 text-center text-[#D4AF37]" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, letterSpacing: '0.05em' }}>
                    {language === 'ko' ? 'K-Quest 이야기' : 'About K-Quest'}
                </h1>

                {/* Philosophy Section (Main Focus) */}
                <section className="mb-16">
                    <div className="bg-[#222] p-8 rounded-2xl shadow-lg border border-[#333]">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ color: 'white' }}>
                            {language === 'ko' ? '서비스 철학' : 'Our Philosophy'}
                        </h2>
                        <div className="space-y-6 text-center">
                            <p className="text-white text-lg leading-relaxed font-medium" style={{ color: 'white' }}>
                                {language === 'ko'
                                    ? "K-Quest는 일상의 작은 즐거움을 발견하고 나누는 공간입니다."
                                    : "K-Quest is a space to discover and share the small joys of daily life."}
                            </p>
                            <p className="text-white text-lg leading-relaxed font-medium" style={{ color: 'white' }}>
                                {language === 'ko'
                                    ? "거창한 목표보다는, 누구나 쉽게 참여하고 소소한 성취감을 느낄 수 있는 건강한 퀘스트 문화를 만들어가고자 합니다."
                                    : "We aim to create a healthy quest culture where anyone can easily participate and feel a sense of accomplishment."}
                            </p>
                            <p className="text-white text-lg leading-relaxed font-medium" style={{ color: 'white' }}>
                                {language === 'ko'
                                    ? "우리는 기술을 통해 사람과 사람을 잇고, 신뢰를 바탕으로 한 안전하고 즐거운 거래 경험을 제공합니다."
                                    : "We strive to connect people through technology and provide a safe and enjoyable transaction experience based on trust."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Copyright - Clean & Minimal */}
                <div className="mt-24 pt-8 border-t border-[#333] flex flex-col items-center">
                    <div className="text-center text-gray-600 text-xs">
                        <p>© {new Date().getFullYear()} K-Quest. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
