"use client";


import { QuestCard } from "@/components/QuestCard";
import { Button } from "@/components/ui/Button";
import { Search, SlidersHorizontal, Map as MapIcon, List } from "lucide-react";
import { useStore } from "@/lib/store";
import { useState } from "react";

export default function QuestsPage() {
    const { t } = useStore();
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    return (
        <main className="min-h-screen bg-[#1A1A1A] pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-[1400px]">
                {/* Header */}
                <div className="text-center mb-20">
                    <p className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-4">{t.quest.subtitle}</p>
                    <h1 className="text-5xl md:text-6xl font-serif text-white mb-8">
                        {t.quest.title}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light">
                        {t.quest.description}
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="sticky top-24 z-30 bg-[#1A1A1A]/95 backdrop-blur-md py-6 mb-12 border-b border-[#333]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <input
                                    type="text"
                                    placeholder={t.common.search}
                                    className="w-full bg-[#262626] border border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-600"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            <Button variant="ghost" className="text-xs border border-[#D4AF37] text-[#1A1A1A] bg-[#D4AF37]">
                                {t.filters.all}
                            </Button>
                            <button className="p-3 border border-[#333] text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                                <SlidersHorizontal className="w-4 h-4" />
                            </button>
                            <div className="h-8 w-[1px] bg-[#333] mx-2" />
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 border transition-colors ${viewMode === 'list' ? 'bg-[#D4AF37] text-[#1A1A1A] border-[#D4AF37]' : 'border-[#333] text-white hover:border-[#D4AF37]'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`p-3 border transition-colors ${viewMode === 'map' ? 'bg-[#D4AF37] text-[#1A1A1A] border-[#D4AF37]' : 'border-[#333] text-white hover:border-[#D4AF37]'}`}
                            >
                                <MapIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {viewMode === 'list' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fade-in">
                        {t.data.quests.map((quest) => (
                            <QuestCard
                                key={quest.id}
                                {...quest}
                                difficulty={quest.difficulty as "Easy" | "Medium" | "Hard"}
                                category={quest.category || "Exclusive"}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="relative w-full h-[600px] bg-[#262626] border border-[#333] rounded-sm overflow-hidden animate-fade-in group">
                        {/* Simulated Map Background */}
                        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2662&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />

                        {/* Map Pins */}
                        {t.data.quests.map((quest, idx) => (
                            <div
                                key={quest.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                                style={{
                                    top: `${30 + (idx * 20)}%`,
                                    left: `${20 + (idx * 25)}%`
                                }}
                            >
                                <div className="w-4 h-4 bg-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)] animate-pulse" />
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-[#1A1A1A] border border-[#D4AF37] p-3 opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none z-10">
                                    <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-1">{quest.category}</p>
                                    <p className="text-white text-xs font-serif truncate">{quest.title}</p>
                                    <p className="text-gray-400 text-[10px] mt-1">{quest.reward}</p>
                                </div>
                            </div>
                        ))}

                        <div className="absolute bottom-8 right-8 bg-[#1A1A1A]/90 p-4 border border-[#333] max-w-xs">
                            <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2">{t.filters.mapTitle}</p>
                            <p className="text-gray-400 text-xs">{t.filters.mapDesc}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
