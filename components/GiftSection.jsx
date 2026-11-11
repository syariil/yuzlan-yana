'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Send,
  CreditCard,
  QrCode,
  MapPin,
} from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function GiftSection() {
  const { gifts } = weddingData;
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('bank'); // 'bank' | 'qris' | 'physical'
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [senderName, setSenderName] = useState('');

  const copyToClipboard = (text, type, index = null) => {
    
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } else if (type === 'address') {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const confirmViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo ${weddingData.bride.nickname} & ${weddingData.groom.nickname}, saya ${
        senderName || 'Tamu Undangan'
      } telah mengirimkan kado/tanda kasih untuk pernikahan kalian. Semoga lancar, berkah, dan senantiasa berbahagia!`
    );
    window.open(`https://wa.me/${gifts.physicalGift.phone}?text=${text}`, '_blank');
  };

  return (
    <section id="gift" className="py-20 px-6 bg-wedding-cream text-stone-800 relative z-10">
      <div className="max-w-md mx-auto text-center">
        {/* Gift Header */}
        <AnimateReveal y={30} duration={0.7}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-wedding-gold/15 text-stone-900 mb-4 shadow-sm border border-wedding-gold/30">
            <Gift className="w-7 h-7 text-stone-900" />
          </div>

          <h2 className="font-serif text-3xl font-bold tracking-wide text-stone-900 mb-2">
            Wedding Gift
          </h2>

          <div className="flex items-center justify-center gap-2 my-3">
            <div className="h-[1px] w-8 bg-wedding-gold/60" />
            <span className="text-xs text-wedding-gold-dark">✦</span>
            <div className="h-[1px] w-8 bg-wedding-gold/60" />
          </div>

          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-xs mx-auto mb-6">
            {gifts.description}
          </p>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-wedding-gold-dark transition-all duration-300 shadow-md active:scale-95"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 text-wedding-gold" />
                <span>TUTUP REKENING</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-wedding-gold" />
                <span>KIRIM HADIAH / ANGLAO</span>
              </>
            )}
          </button>
        </AnimateReveal>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 15 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 15 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="mt-8 space-y-6 overflow-hidden text-left"
            >
              {/* Gift Method Tabs */}
              <div className="flex items-center justify-center gap-2 p-1 bg-stone-200/70 rounded-full max-w-xs mx-auto text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('bank')}
                  className={`flex-1 py-1.5 px-3 rounded-full font-medium transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'bank'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Transfer Bank</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('qris')}
                  className={`flex-1 py-1.5 px-3 rounded-full font-medium transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'qris'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QRIS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('physical')}
                  className={`flex-1 py-1.5 px-3 rounded-full font-medium transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'physical'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kado Fisik</span>
                </button>
              </div>

              {/* Tab 1: Bank Accounts */}
              {activeTab === 'bank' && (
                <div className="space-y-4">
                  {gifts.bankAccounts.map((account, idx) => (
                    <motion.div
                      key={account.accountNumber}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className="luxury-card-light double-gold-border rounded-[28px] p-6 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="absolute top-4 right-5 text-xs font-bold uppercase tracking-widest text-wedding-gold-dark bg-wedding-gold/15 px-2.5 py-0.5 rounded-md border border-wedding-gold/30">
                        {account.bank}
                      </div>

                      <p className="font-serif text-lg font-semibold text-stone-900 mb-1">
                        {account.accountHolder}
                      </p>
                      <p className="font-sans text-xl font-bold tracking-widest text-stone-800 mb-4">
                        {account.accountNumber}
                      </p>

                      <button
                        onClick={() =>
                          copyToClipboard(account.accountNumber.replaceAll("-", ""), 'bank', idx)
                        }
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-stone-900 text-white hover:bg-wedding-gold-dark text-xs font-medium transition-colors shadow-sm active:scale-95"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300 font-semibold">
                              Tersalin!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-wedding-gold" />
                            <span>Salin Nomor Rekening</span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tab 2: QRIS / E-Wallet */}
              {activeTab === 'qris' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="luxury-card-light double-gold-border rounded-[28px] p-6 text-center"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-wider mb-3 border border-rose-200">
                    QRIS Pembayaran Digital
                  </span>

                  <p className="font-serif text-base font-bold text-stone-900 mb-1">
                    Scan QRIS untuk Semua Bank & E-Wallet
                  </p>
                  <p className="text-xs text-stone-500 mb-4">
                    Gopay, OVO, Dana, ShopeePay, BCA, Mandiri, BRI, dll.
                  </p>
              <div className="flex justify-center gap-4">

                  {/* QR Box */}
                  <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-inner border border-stone-200 flex flex-col items-center justify-center mb-4">
                    <img
                  src="/images/qris-yana.jpeg"
                  alt="QRIS Yana"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                  <p className="text-[11px] text-stone-500 font-medium">
                    an. {weddingData.bride.nickname}
                  </p>
                  </div>

                  <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-inner border border-stone-200 flex flex-col items-center justify-center mb-4">
                    <img
                  src="/images/qris-yuzlan.jpeg"
                  alt="QRIS yuzlan"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                  <p className="text-[11px] text-stone-500 font-medium">
                    an. {weddingData.groom.nickname}
                  </p>
                  </div>
                </div>  
                </motion.div>
              )}

              {/* Tab 3: Kado Fisik & Alamat */}
              {activeTab === 'physical' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="luxury-card-light double-gold-border rounded-[28px] p-6 text-center"
                >
                  <h4 className="font-serif text-base font-bold tracking-wider text-stone-900 mb-2">
                    KIRIM KADO KE ALAMAT
                  </h4>
                  <p className="text-xs text-stone-800 font-semibold mb-1">
                    an. {gifts.physicalGift.recipient}
                  </p>
                  <p className="text-xs text-stone-600 font-light leading-relaxed px-2 mb-4">
                    {gifts.physicalGift.address}
                  </p>

                  <button
                    onClick={() =>
                      copyToClipboard(gifts.physicalGift.address, 'address')
                    }
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors mb-5 active:scale-95 border border-stone-200"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">
                          Alamat Tersalin!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-600" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* WhatsApp Confirmation Form */}
              <div className="luxury-card-light rounded-2xl p-5 border border-wedding-gold/30">
                <p className="text-xs font-semibold text-stone-800 mb-2 text-center">
                  Konfirmasi Pengiriman Hadiah
                </p>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nama Pengirim"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-gold text-stone-800"
                  />
                  <button
                    onClick={confirmViaWhatsApp}
                    className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-wedding-gold-dark transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-wedding-gold" />
                    <span>Konfirmasi via WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
