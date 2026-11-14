'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  Send,
  CreditCard,
  QrCode,
  MapPin,
} from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import { CornerFloral } from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

export default function GiftSection() {
  const { gifts } = weddingData;
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
    <section
      id="gift"
      className="py-14 px-5 royal-blue-bg text-stone-800 relative z-10 overflow-hidden"
    >
      <div className="max-w-md mx-auto">
        <AnimateReveal y={35} duration={0.75} scale={0.97}>
          {/* White Rounded Card inside Dusty Blue Section (Video 00:54) */}
          <div className="royal-white-card rounded-[38px] p-6 sm:p-8 text-center relative overflow-hidden">
            <CornerFloral position="top-left" />
            <CornerFloral position="top-right" />
            <CornerFloral position="bottom-left" />
            <CornerFloral position="bottom-right" />

            <div className="relative z-10">
              {/* Script Title: Amplop Digital */}
              <h2 className="font-script text-4xl sm:text-5xl text-wedding-gold-dark mb-3">
                Amplop Digital
              </h2>

              <p className="font-sans text-xs sm:text-sm text-stone-600 font-normal leading-relaxed max-w-xs mx-auto mb-6">
                {gifts.description}
              </p>

              {/* Gift Method Tabs */}
              <div className="flex items-center justify-center gap-1.5 p-1 bg-wedding-blue-soft rounded-full max-w-xs mx-auto text-xs mb-6 border border-wedding-blue/20">
                <button
                  type="button"
                  onClick={() => setActiveTab('bank')}
                  className={`flex-1 py-1.5 px-2.5 rounded-full font-semibold transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'bank'
                      ? 'bg-wedding-blue text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Rekening</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('qris')}
                  className={`flex-1 py-1.5 px-2.5 rounded-full font-semibold transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'qris'
                      ? 'bg-wedding-blue text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QRIS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('physical')}
                  className={`flex-1 py-1.5 px-2.5 rounded-full font-semibold transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'physical'
                      ? 'bg-wedding-blue text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kado Fisik</span>
                </button>
              </div>

              {/* Tab 1: Bank Accounts */}
              {activeTab === 'bank' && (
                <div className="space-y-4 mb-6">
                  {gifts.bankAccounts.map((account, idx) => (
                    <motion.div
                      key={account.accountNumber}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.35 }}
                      className="bg-white rounded-2xl p-5 text-center border border-wedding-gold/40 shadow-sm"
                    >
                      <p className="font-serif text-base font-bold uppercase tracking-widest text-wedding-blue-dark mb-1">
                        BANK {account.bank}
                      </p>
                      <div className="h-[1px] w-16 bg-wedding-gold/40 mx-auto my-2" />
                      <p className="font-sans text-xs text-stone-500 mb-0.5">
                        No. Rekening
                      </p>
                      <p className="font-sans text-lg sm:text-xl font-bold tracking-wider text-stone-800 mb-1">
                        {account.accountNumber}
                      </p>
                      <p className="font-sans text-xs text-stone-600 font-medium mb-3.5">
                        a.n {account.accountHolder}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            account.accountNumber.replaceAll('-', ''),
                            'bank',
                            idx
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-wedding-blue hover:bg-wedding-blue-dark text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Berhasil Disalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Rekening</span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tab 2: QRIS / E-Wallet (Preserving /images/qris-yana.jpeg & /images/qris-yuzlan.jpeg) */}
              {activeTab === 'qris' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl p-5 text-center border border-wedding-gold/40 shadow-sm mb-6"
                >
                  <p className="font-serif text-sm font-bold text-stone-800 mb-1">
                    Scan QRIS Semua Bank &amp; E-Wallet
                  </p>
                  <p className="text-[11px] text-stone-500 mb-4">
                    Gopay, OVO, Dana, ShopeePay, BCA, Mandiri, BRI, dll.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#fcfbf9] p-3 rounded-xl border border-wedding-gold/30 flex flex-col items-center">
                      <img
                        src="/images/qris-yana.jpeg"
                        alt="QRIS Yana"
                        className="w-40 h-40 object-contain rounded-lg mb-2"
                      />
                      <p className="text-xs text-stone-700 font-semibold">
                        a.n {weddingData.bride.nickname}
                      </p>
                    </div>

                    <div className="bg-[#fcfbf9] p-3 rounded-xl border border-wedding-gold/30 flex flex-col items-center">
                      <img
                        src="/images/qris-yuzlan.jpeg"
                        alt="QRIS Yuzlan"
                        className="w-40 h-40 object-contain rounded-lg mb-2"
                      />
                      <p className="text-xs text-stone-700 font-semibold">
                        a.n {weddingData.groom.nickname}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Kado Fisik */}
              {activeTab === 'physical' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl p-5 text-center border border-wedding-gold/40 shadow-sm mb-6"
                >
                  <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-800 mb-1">
                    Kirim Kado Fisik
                  </h4>
                  <p className="text-xs text-wedding-blue-dark font-semibold mb-1">
                    Penerima : {gifts.physicalGift.recipient}
                  </p>
                  <p className="text-xs text-stone-600 font-normal leading-relaxed px-2 mb-4">
                    {gifts.physicalGift.address}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(gifts.physicalGift.address, 'address')
                    }
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-wedding-blue hover:bg-wedding-blue-dark text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* WhatsApp Confirmation Box */}
              <div className="bg-white/90 rounded-2xl p-4 border border-wedding-gold/30 text-left">
                <p className="text-xs font-semibold text-stone-700 mb-2 text-center">
                  Konfirmasi Pengiriman Tanda Kasih
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nama Anda"
                    className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-[#fcfbf9] border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-blue text-stone-800"
                  />
                  <button
                    type="button"
                    onClick={confirmViaWhatsApp}
                    className="py-2 px-4 rounded-xl bg-wedding-blue hover:bg-wedding-blue-dark text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Konfirmasi WA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimateReveal>
      </div>
    </section>
  );
}
