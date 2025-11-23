"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-[#D4AF37] hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    메인으로 돌아가기
                </Link>

                <h1 className="text-4xl font-serif mb-12 text-white border-b border-[#333] pb-6">개인정보 처리방침</h1>

                <div className="space-y-12 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">1. 총칙</h2>
                        <p>
                            K-Quest(이하 "회사")는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령을 준수하며, 회원의 개인정보를 소중히 다루고 있습니다. 회사는 본 개인정보 처리방침을 통해 회원이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">2. 수집하는 개인정보 항목</h2>
                        <p className="mb-4">회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>필수항목:</strong> 이메일 주소, 비밀번호, 이름(닉네임), 국적</li>
                            <li><strong>선택항목:</strong> 프로필 사진, 연락처, 거주 지역</li>
                            <li><strong>결제 및 정산 시:</strong> 신용카드 정보(PG사 위탁), 은행 계좌 정보(수행자 정산용)</li>
                            <li><strong>서비스 이용 과정 자동 수집:</strong> IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 기기 정보</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">3. 개인정보의 수집 및 이용 목적</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>서비스 제공:</strong> 퀘스트 매칭, 콘텐츠 제공, 본인 인증, 구매 및 요금 결제, 정산</li>
                            <li><strong>회원 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지, 가입 의사 확인, 불만처리 등 민원처리</li>
                            <li><strong>마케팅 및 광고:</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 등 광고성 정보 전달 (동의 시)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">4. 개인정보의 보유 및 이용 기간</h2>
                        <p>
                            원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li>로그인 기록: 3개월 (통신비밀보호법)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">5. 개인정보의 파기 절차 및 방법</h2>
                        <p>
                            회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>파기절차:</strong> 회원이 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다.</li>
                            <li><strong>파기방법:</strong> 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">6. 개인정보 보호책임자</h2>
                        <p className="mb-2">회사는 회원의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호책임자를 지정하고 있습니다.</p>
                        <div className="bg-[#262626] p-6 rounded-sm border border-[#333]">
                            <p><strong>책임자:</strong> 정연주</p>
                            <p><strong>직위:</strong> 대표 (CEO)</p>
                            <p><strong>이메일:</strong> support@quest-k.com</p>
                        </div>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-[#333] text-center">
                    <p className="text-gray-500 text-sm">
                        본 방침은 2025년 11월 23일부터 시행됩니다.
                    </p>
                </div>
            </div>
        </main>
    );
}
