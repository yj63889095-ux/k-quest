"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-[#D4AF37] hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    메인으로 돌아가기
                </Link>

                <h1 className="text-4xl font-serif mb-12 text-white border-b border-[#333] pb-6">이용약관</h1>

                <div className="space-y-12 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">제1조 (목적)</h2>
                        <p>
                            본 약관은 K-Quest(이하 "회사")가 제공하는 중개 서비스 및 관련 제반 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">제2조 (용어의 정의)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>"서비스"라 함은 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 회원이 이용할 수 있는 K-Quest 및 관련 제반 서비스를 의미합니다.</li>
                            <li>"회원"이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
                            <li>"의뢰인"이라 함은 서비스를 통해 업무(퀘스트)를 등록하고 수행을 요청하는 회원을 말합니다.</li>
                            <li>"수행자"라 함은 등록된 업무(퀘스트)를 수행하고 그 대가로 보상을 받는 회원을 말합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">제3조 (서비스의 내용)</h2>
                        <p>회사는 다음과 같은 서비스를 제공합니다.</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>퀘스트(업무) 중개 및 매칭 서비스</li>
                            <li>안전 결제(에스크로) 및 정산 서비스</li>
                            <li>회원 간 커뮤니케이션 지원</li>
                            <li>기타 회사가 추가 개발하거나 제휴 등을 통해 회원에게 제공하는 일체의 서비스</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">제4조 (취소 및 환불)</h2>
                        <div className="bg-[#262626] p-6 rounded-sm border border-[#333]">
                            <h3 className="text-white font-bold mb-3">환불 가능 기간</h3>
                            <ul className="list-disc pl-5 space-y-1 mb-4">
                                <li><strong>퀘스트 매칭 전:</strong> 전액 환불 (수수료 없음)</li>
                                <li><strong>매칭 후 24시간 이내:</strong> 전액 환불 가능 (단, 플랫폼 수수료 500원 차감)</li>
                                <li><strong>퀘스트 진행 중:</strong> 양측 협의 후 부분 환불 가능</li>
                                <li><strong>퀘스트 완료 후:</strong> 원칙적으로 환불 불가 (단, 서비스 중대 하자 시 분쟁 조정 절차 따름)</li>
                            </ul>

                            <h3 className="text-white font-bold mb-3">수수료 정책</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>플랫폼 이용료:</strong> 거래액의 10%</li>
                                <li><strong>결제 대행 수수료:</strong> 약 3.6% + 고정비 (PG사 정책에 따름)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">제5조 (책임의 한계)</h2>
                        <p>
                            회사는 통신판매중개자로서 회원 상호간의 거래를 위한 시스템을 제공할 뿐이며, 회원 상호간의 거래 및 퀘스트 수행 내용에 대하여는 보증하지 않습니다. 회원 간 발생한 분쟁에 대해서는 회사의 고의 또는 중대한 과실이 없는 한 책임지지 않습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">제6조 (기타)</h2>
                        <p>
                            본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">제7조 (문의처)</h2>
                        <p>
                            서비스 이용과 관련하여 문의사항이 있으신 경우 아래 연락처로 문의해 주시기 바랍니다.
                        </p>
                        <div className="mt-4 bg-[#262626] p-6 rounded-sm border border-[#333]">
                            <p><strong>이메일:</strong> wkrwkr777@gmail.com</p>
                        </div>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-[#333] text-center">
                    <p className="text-gray-500 text-sm">
                        본 약관은 2025년 11월 23일부터 시행됩니다.
                    </p>
                </div>
            </div>
        </main>
    );
}
