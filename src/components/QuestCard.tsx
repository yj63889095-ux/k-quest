import { Button } from "@/components/ui/Button";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { useStore } from "@/lib/store";

interface QuestProps {
    id: string;
    title: string;
    reward: string;
    location: string;
    time: string;
    difficulty: "Easy" | "Medium" | "Hard";
    category?: string;
}

export function QuestCard({ id, title, reward, location, time, difficulty, category = "Concierge" }: QuestProps) {
    const { t } = useStore();

    return (
        <div className="group relative bg-[#262626] border border-[#333] hover:border-[#D4AF37] transition-all duration-500 overflow-hidden">
            {/* Image Placeholder Area */}
            <div className="h-64 bg-[#111] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] to-transparent opacity-60 z-10" />
                {/* In a real app, an image would go here. For now, a stylish pattern or solid color */}
                <div className="absolute inset-0 bg-[#1A1A1A] group-hover:scale-105 transition-transform duration-700 flex items-center justify-center text-[#333] font-serif text-4xl opacity-20">
                    K-QUEST
                </div>

                <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-[#D4AF37] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8 relative z-20 -mt-12">
                <div className="bg-[#262626] p-6 border-t border-[#D4AF37] shadow-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 min-h-[3.5rem]">
                            <Link href={`/quests/${id}`}>
                                {title}
                            </Link>
                        </h3>
                        <ArrowUpRight className="h-5 w-5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    <div className="flex items-center gap-6 text-sm text-[#888] mb-6 font-light">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-[#D4AF37]" />
                            {location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-[#D4AF37]" />
                            {time}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#333]">
                        <div>
                            <p className="text-[10px] text-[#666] uppercase tracking-widest mb-1">{t.quest.reward}</p>
                            <p className="text-xl font-serif text-[#D4AF37]">{reward}</p>
                        </div>
                        <Link href={`/quests/${id}`}>
                            <Button variant="link" size="sm" className="px-0 text-xs">
                                {t.common.viewDetails}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
