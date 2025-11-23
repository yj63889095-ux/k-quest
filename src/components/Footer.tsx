"use client";

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export function Footer() {
    const { language } = useStore();

    return (
        <footer className="bg-[#111] border-t border-[#333] py-12 mt-auto">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-serif text-white mb-2" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '0.05em' }}>K-Quest</h3>
                        <p className="text-gray-400 text-sm">Premium Concierge Service in Korea</p>
                    </div>

                    <div className="flex gap-8 text-sm text-gray-400">
                        <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
                            {language === 'ko' ? '이용약관' : 'Terms'}
                        </Link>
                        <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
                            {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
                        </Link>
                    </div>

                    <div className="text-center md:text-right flex flex-col gap-1">
                        <p className="text-gray-500 text-xs">
                            &copy; {new Date().getFullYear()} K-Quest
                        </p>
                        <Link href="/company" className="text-gray-600 hover:text-gray-400 text-[10px] transition-colors">
                            {language === 'ko' ? '사업자 정보' : 'Company Info'}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
