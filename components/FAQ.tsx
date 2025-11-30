'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
    HelpCircle,
    ChevronDown,
    ChevronUp,
    Wallet,
    Coins,
    Zap,
    Shield,
    Settings,
    Users,
    Building2,
    DollarSign,
    BarChart3,
    Lock
} from 'lucide-react'

interface FAQItemProps {
    question: string
    answer: string
    icon: React.ReactNode
    isOpen: boolean
    onToggle: () => void
}

function FAQItem({ question, answer, icon, isOpen, onToggle }: FAQItemProps) {
    return (
        <div className="border-2 border-card-border rounded-xl overflow-hidden transition-all hover:border-primary/50">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 text-left bg-card-bg hover:bg-card-bg/80 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                        {icon}
                    </div>
                    <span className="font-semibold text-foreground">{question}</span>
                </div>
                <div className="text-muted-foreground">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </button>
            {isOpen && (
                <div className="px-4 pb-4 pt-2 bg-card-bg/50">
                    <p className="text-muted-foreground leading-relaxed pl-12">{answer}</p>
                </div>
            )}
        </div>
    )
}

export function FAQ() {
    const t = useTranslations('faq')
    const [openItems, setOpenItems] = useState<Set<string>>(new Set())

    const toggleItem = (id: string) => {
        const newOpenItems = new Set(openItems)
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id)
        } else {
            newOpenItems.add(id)
        }
        setOpenItems(newOpenItems)
    }

    const investorFAQs = [
        {
            id: 'what-is',
            question: t('investor.whatIs.question'),
            answer: t('investor.whatIs.answer'),
            icon: <HelpCircle className="w-5 h-5" />
        },
        {
            id: 'how-to-invest',
            question: t('investor.howToInvest.question'),
            answer: t('investor.howToInvest.answer'),
            icon: <Wallet className="w-5 h-5" />
        },
        {
            id: 'what-are-tokens',
            question: t('investor.whatAreTokens.question'),
            answer: t('investor.whatAreTokens.answer'),
            icon: <Coins className="w-5 h-5" />
        },
        {
            id: 'how-rewards',
            question: t('investor.howRewards.question'),
            answer: t('investor.howRewards.answer'),
            icon: <DollarSign className="w-5 h-5" />
        },
        {
            id: 'claim-rewards',
            question: t('investor.claimRewards.question'),
            answer: t('investor.claimRewards.answer'),
            icon: <Zap className="w-5 h-5" />
        },
        {
            id: 'security',
            question: t('investor.security.question'),
            answer: t('investor.security.answer'),
            icon: <Shield className="w-5 h-5" />
        }
    ]

    const adminFAQs = [
        {
            id: 'create-project',
            question: t('admin.createProject.question'),
            answer: t('admin.createProject.answer'),
            icon: <Building2 className="w-5 h-5" />
        },
        {
            id: 'manage-project',
            question: t('admin.manageProject.question'),
            answer: t('admin.manageProject.answer'),
            icon: <Settings className="w-5 h-5" />
        },
        {
            id: 'deposit-revenue',
            question: t('admin.depositRevenue.question'),
            answer: t('admin.depositRevenue.answer'),
            icon: <DollarSign className="w-5 h-5" />
        },
        {
            id: 'withdraw-sales',
            question: t('admin.withdrawSales.question'),
            answer: t('admin.withdrawSales.answer'),
            icon: <Coins className="w-5 h-5" />
        },
        {
            id: 'update-energy',
            question: t('admin.updateEnergy.question'),
            answer: t('admin.updateEnergy.answer'),
            icon: <BarChart3 className="w-5 h-5" />
        },
        {
            id: 'permissions',
            question: t('admin.permissions.question'),
            answer: t('admin.permissions.answer'),
            icon: <Users className="w-5 h-5" />
        },
        {
            id: 'transfer-ownership',
            question: t('admin.transferOwnership.question'),
            answer: t('admin.transferOwnership.answer'),
            icon: <Lock className="w-5 h-5" />
        }
    ]

    return (
        <section className="py-12" id="faq">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg mb-4">
                    <HelpCircle className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                    {t('title')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>
            </div>

            {/* Investor FAQ Section */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/70 text-white">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {t('investorTitle')}
                    </h3>
                </div>
                <div className="space-y-3">
                    {investorFAQs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            icon={faq.icon}
                            isOpen={openItems.has(`investor-${faq.id}`)}
                            onToggle={() => toggleItem(`investor-${faq.id}`)}
                        />
                    ))}
                </div>
            </div>

            {/* Admin FAQ Section */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-secondary/70 text-white">
                        <Settings className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {t('adminTitle')}
                    </h3>
                </div>
                <div className="space-y-3">
                    {adminFAQs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            icon={faq.icon}
                            isOpen={openItems.has(`admin-${faq.id}`)}
                            onToggle={() => toggleItem(`admin-${faq.id}`)}
                        />
                    ))}
                </div>
            </div>

            {/* Additional Help */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 text-center">
                <h4 className="text-lg font-bold text-foreground mb-2">
                    {t('needMoreHelp')}
                </h4>
                <p className="text-muted-foreground">
                    {t('needMoreHelpDesc')}
                </p>
            </div>
        </section>
    )
}
