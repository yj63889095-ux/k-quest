"use client";

import { Button } from "@/components/ui/Button";
import { Download, TrendingUp, CreditCard, ArrowUpRight } from "lucide-react";
import { useStore } from "@/lib/store";

export default function WalletPage() {
    const { t, userEmail } = useStore();

    const transactions = [
        {
            id: 1,
            type: "Deposit",
            title: "Quest Completed: Hongdae Guide",
            amount: "+ $15.00",
            date: "OCT 25, 2023",
            status: "Completed",
        },
        {
            id: 2,
            type: "Deposit",
            title: "Quest Completed: Haeundae Photo",
            amount: "+ $5.00",
            date: "OCT 24, 2023",
            status: "Completed",
        },
        {
            id: 3,
            type: "Withdrawal",
            title: "Transfer to Bank Account",
            amount: "- $10.00",
            date: "OCT 20, 2023",
            status: "Processing",
        },
    ];

    return (
        <main className="min-h-screen bg-[#1A1A1A] pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-[1000px]">
                <div className="flex justify-between items-end mb-12 border-b border-[#333] pb-6">
                    <div>
                        <p className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-2">{t.wallet.subtitle}</p>
                        <h1 className="text-4xl font-serif text-white">{t.wallet.title}</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-sm mb-1">{t.wallet.totalBalance}</p>
                        <p className="text-4xl font-serif text-[#D4AF37]">$20.00 <span className="text-sm text-gray-500">USD</span></p>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Performer Card */}
                    <div className="bg-[#262626] border border-[#333] p-8 hover:border-[#D4AF37] transition-colors duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-3 bg-[#1A1A1A] rounded-none border border-[#333]">
                                <CreditCard className="w-6 h-6 text-[#D4AF37]" />
                            </div>
                            <Button variant="ghost" size="sm" className="text-xs group-hover:text-[#D4AF37]">
                                {t.common.manage} <ArrowUpRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                        <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">{t.wallet.availableWithdrawal}</p>
                        <h3 className="text-3xl font-serif text-white mb-8">$20.00</h3>
                        <div className="flex gap-4">
                            <Button variant="primary" className="flex-1">{t.common.withdraw}</Button>
                        </div>
                    </div>

                    {/* Admin Card - Only visible to Admin */}
                    {(userEmail === 'admin@kquest.com' || userEmail === 'admin') && (
                        <div className="bg-gradient-to-br from-[#262626] to-[#111] border border-[#D4AF37]/30 p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#1A1A1A] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                {t.wallet.adminAccess}
                            </div>
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-3 bg-[#1A1A1A] rounded-none border border-[#D4AF37]/50">
                                    <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                            </div>
                            <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-2">{t.wallet.platformRevenue} (30%)</p>
                            <h3 className="text-3xl font-serif text-white mb-8">$1,250.00</h3>
                            <Button
                                variant="outline"
                                className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A]"
                                onClick={() => useStore.getState().addToast(t.common.settle + " - Demo Mode", "success")}
                            >
                                {t.common.settle}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Transactions */}
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-2xl font-serif text-white">{t.wallet.transactionHistory}</h2>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#D4AF37]">
                        <Download className="w-4 h-4 mr-2" /> {t.wallet.export}
                    </Button>
                </div>

                <div className="bg-[#262626] border border-[#333]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#333] text-gray-500 text-xs uppercase tracking-widest">
                                <th className="py-4 px-6 font-normal">{t.wallet.table.date}</th>
                                <th className="py-4 px-6 font-normal">{t.wallet.table.type}</th>
                                <th className="py-4 px-6 font-normal w-1/3">{t.wallet.table.description}</th>
                                <th className="py-4 px-6 font-normal text-right">{t.wallet.table.amount}</th>
                                <th className="py-4 px-6 font-normal text-right">{t.wallet.table.status}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {t.wallet.transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-[#333] hover:bg-[#333]/30 transition-colors last:border-0">
                                    <td className="py-4 px-6 text-gray-400 text-sm">{tx.date}</td>
                                    <td className="py-4 px-6 text-white text-sm">
                                        <span className={`inline-block px-2 py-1 text-[10px] uppercase tracking-wider border ${tx.type === 'Deposit' || tx.type === '입금' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-gray-600 text-gray-400'}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-white text-sm font-medium">{tx.title}</td>
                                    <td className={`py-4 px-6 text-sm text-right font-serif ${tx.amount.startsWith('+') ? 'text-[#D4AF37]' : 'text-white'}`}>
                                        {tx.amount}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <span className="text-xs text-gray-500">{tx.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
