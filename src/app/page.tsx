"use client";

import { Construction } from "lucide-react";

export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center space-y-12">
        {/* Logo Animation */}
        <div className="animate-fade-in">
          <div className="inline-block p-8 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 backdrop-blur-sm mb-8">
            <Construction className="w-20 h-20 text-[#D4AF37] animate-pulse" />
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-6 animate-fade-in delay-100">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
            K-Quest
          </h1>
          <p className="text-2xl md:text-3xl text-[#D4AF37] uppercase tracking-[0.3em] font-light">
            서비스 준비중
          </p>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Coming Soon
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto space-y-4 text-gray-300 animate-fade-in delay-200">
          <p className="text-base md:text-lg leading-relaxed">
            프리미엄 한국 체험 플랫폼을 준비하고 있습니다.
          </p>
          <p className="text-sm md:text-base text-gray-500">
            We are preparing a premium Korean experience platform.
          </p>
        </div>

        {/* Divider */}
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto animate-fade-in delay-300"></div>

        {/* Business Info */}
        <div className="bg-[#1A1A1A]/50 border border-[#333] backdrop-blur-sm rounded-2xl p-8 md:p-12 space-y-6 animate-fade-in delay-400">
          <h2 className="text-xl md:text-2xl font-serif text-white mb-6">사업자 정보</h2>

          <div className="space-y-4 text-sm md:text-base text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 pb-3 border-b border-[#333]">
              <span className="text-gray-500">상호명</span>
              <span className="text-white font-medium">K-Quest</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-2 pb-3 border-b border-[#333]">
              <span className="text-gray-500">대표자</span>
              <span className="text-white font-medium">박세희</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-2 pb-3 border-b border-[#333]">
              <span className="text-gray-500">사업자등록번호</span>
              <span className="text-white font-medium">발급 예정</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-2 pb-3 border-b border-[#333]">
              <span className="text-gray-500">통신판매업 신고번호</span>
              <span className="text-white font-medium">신청 중</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <span className="text-gray-500">이메일</span>
              <span className="text-white font-medium">contact@quest-k.com</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-600 text-sm animate-fade-in delay-500">
          <p>© 2025 K-Quest. All rights reserved.</p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </main>
  );
}
