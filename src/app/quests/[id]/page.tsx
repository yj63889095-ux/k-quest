"use client";

import { Button } from "@/components/ui/Button";
import { ArrowLeft, MapPin, Clock, DollarSign, Shield } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";

export default function QuestDetailPage() {
    const params = useParams();
    const { t } = useStore();
    const id = params.id as string;

    // Mock data - in a real app, fetch based on ID
    const quest = {
        id,
        title: t.demo.quest.title,
        description: t.demo.quest.description,
        reward: "$50.00",
        location: t.demo.quest.location,
        time: t.demo.quest.time,
        requester: "Sarah J.",
        category: t.demo.quest.category,
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
    };



    return (
        <main className="min-h-screen bg-[#1A1A1A] flex flex-col lg:flex-row">
            {/* Left: Visual Hero (Fixed on Desktop, Scrollable on Mobile) */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-screen relative lg:fixed lg:left-0 lg:top-0 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div
                    className="w-full h-full bg-cover bg-center scale-105"
                    style={{ backgroundImage: `url(${quest.image})` }}
                />
                <div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-12 z-20">
                    <Link href="/quests" className="inline-flex items-center text-white/80 hover:text-[#D4AF37] mb-4 lg:mb-6 transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t.common.back}
                    </Link>
                    <p className="text-[#D4AF37] text-xs lg:text-sm uppercase tracking-[0.2em] mb-2">{quest.category}</p>
                    <h1 className="text-3xl lg:text-5xl font-serif text-white leading-tight mb-4 lg:mb-6">
                        {quest.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 lg:gap-6 text-xs lg:text-sm text-gray-300">
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-[#D4AF37]" /> {quest.location}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-[#D4AF37]" /> {quest.time}
                        </div>
                        <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-[#D4AF37]" /> {quest.reward}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Scrollable Content */}
            <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen bg-[#1A1A1A] border-l border-[#333]">
                <div className="p-6 md:p-20 max-w-2xl mx-auto">
                    {/* Trust Badge */}
                    <div className="bg-[#262626] border border-[#333] p-4 mb-12 flex items-start gap-4">
                        <Shield className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                        <div>
                            <h3 className="text-white font-medium mb-1">K-Quest Secure Escrow</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                {t.quest.safety}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-serif text-white mb-6">{t.quest.requestDetails}</h2>
                        <p className="text-gray-300 leading-relaxed font-light text-lg">
                            {quest.description}
                        </p>
                    </div>

                    {/* Financial Breakdown */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-serif text-white mb-6">{t.quest.financialBreakdown}</h2>
                        <div className="bg-[#262626] border border-[#333] p-8">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#333]">
                                <span className="text-gray-400">{t.quest.totalReward}</span>
                                <span className="text-2xl font-serif text-white">{quest.reward}</span>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-500">
                                    <span>{t.quest.performerEarnings} (70%)</span>
                                    <span>$35.00</span>
                                </div>
                                <div className="flex justify-between text-[#D4AF37]">
                                    <span>{t.quest.platformFee} (30%)</span>
                                    <span>$15.00</span>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Action */}
                    <div className="sticky bottom-8">
                        <Button className="w-full py-6 text-lg bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#b5952f] shadow-2xl">
                            {t.common.accept}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
