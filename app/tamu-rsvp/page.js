'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Send,
  Copy,
  Check,
  UserPlus,
  Trash2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  MessageCircle,
  Users,
  Edit3,
  ArrowLeft,
} from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import {
  CastleIllustration,
  CornerFloral,
  BottomFloralBouquet,
} from '@/components/FloralOrnaments';

const DEFAULT_TEMPLATES = {
  islami: `Kepada Yth.
Bapak/Ibu/Saudara/i
*{nama}*
_____________________

_Assalamu'alaikum Warahmatullahi Wabarakatuh_

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami :

*${weddingData.bride.fullName.trim()}* & *${weddingData.groom.fullName.trim()}*

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :

{link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini.
Terima kasih banyak atas perhatiannya.

_Wassalamu'alaikum Warahmatullahi Wabarakatuh_

Kami yang berbahagia,
*${weddingData.bride.nickname} & ${weddingData.groom.nickname}*`,

  formal: `Kepada Yth.
Bapak/Ibu/Saudara/i
*{nama}*

Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*${weddingData.bride.fullName.trim()} & ${weddingData.groom.fullName.trim()}*

Informasi lengkap mengenai waktu dan lokasi acara dapat diakses melalui tautan undangan digital berikut:

{link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Hormat kami,
*${weddingData.bride.nickname} & ${weddingData.groom.nickname}*`,

  santai: `Halo *{nama}*! 👋✨

Kami punya kabar bahagia! Insya Allah kami akan melangsungkan pernikahan:

💍 *${weddingData.bride.nickname} & ${weddingData.groom.nickname}*
📅 Selasa, 08 Desember 2026

Kami mengundangmu untuk hadir dan berbagi kebahagiaan di hari spesial kami. Detail lengkap acara & lokasi bisa dibuka di link undangan ini yaa:

{link}

Kehadiran dan doa restumu sangat berarti bagi kami. Sampai ketemu di acara nanti! 🤍🙏`,
};

export default function GuestGeneratorPage() {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://yana-yuzlan.vercel.app/');
  const [templateKey, setTemplateKey] = useState('islami');
  const [captionTemplate, setCaptionTemplate] = useState(DEFAULT_TEMPLATES.islami);
  const [copiedType, setCopiedType] = useState(null); // 'caption' | 'link' | null
  const [guestList, setGuestList] = useState([]);

  // Ambil domain/origin otomatis saat halaman dibuka di browser & muat data tersimpan dari localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);

      const savedTemplate = localStorage.getItem('wedding_caption_template');
      if (savedTemplate) {
        setCaptionTemplate(savedTemplate);
      }

      const savedGuests = localStorage.getItem('wedding_guest_list');
      if (savedGuests) {
        try {
          setGuestList(JSON.parse(savedGuests));
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  // Simpan perubahan caption ke localStorage
  const handleCaptionChange = (val) => {
    setCaptionTemplate(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedding_caption_template', val);
    }
  };

  // Ganti preset template
  const selectPreset = (key) => {
    setTemplateKey(key);
    setCaptionTemplate(DEFAULT_TEMPLATES[key]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedding_caption_template', DEFAULT_TEMPLATES[key]);
    }
  };

  // Buat URL undangan dengan parameter ?to=
  const generateInvitationUrl = (targetName) => {
    const cleanBase = baseUrl.replace(/\/+$/, '');
    const cleanName = (targetName || 'Tamu Undangan').trim();
    const encodedName = encodeURIComponent(cleanName);
    return `${cleanBase}/?to=${encodedName}`;
  };

  // Buat pesan final dengan mengganti {nama} dan {link}
  const generateFinalMessage = (targetName) => {
    const finalName = (targetName || 'Nama Tamu').trim();
    const finalLink = generateInvitationUrl(finalName);

    let msg = captionTemplate
      .replace(/\{nama\}/gi, finalName)
      .replace(/\{link\}/gi, finalLink);

    // Jika user menghapus placeholder {link} dari template, pastikan link tetap disertakan jika belum ada
    if (!captionTemplate.includes('{link}') && !msg.includes(finalLink)) {
      msg += `\n\n${finalLink}`;
    }

    return msg;
  };

  // Bersihkan nomor WA (ubah 08xx jadi 628xx)
  const formatPhone = (phone) => {
    if (!phone) return '';
    let digits = phone.replace(/[^0-9]/g, '');
    if (digits.startsWith('0')) {
      digits = '62' + digits.slice(1);
    }
    return digits;
  };

  // Langsung share ke WhatsApp
  const shareToWhatsApp = (targetName = guestName, targetPhone = guestPhone) => {
    const nameToUse = targetName.trim() || 'Tamu Undangan';
    const message = generateFinalMessage(nameToUse);
    const encodedMessage = encodeURIComponent(message);
    const cleanPhone = formatPhone(targetPhone);

    const waUrl = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
  };

  // Salin teks caption lengkap atau link saja
  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Simpan nama ke daftar tamu di bawah agar mudah dikelola
  const addGuestToList = (e) => {
    e?.preventDefault();
    if (!guestName.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: guestName.trim(),
      phone: guestPhone.trim(),
    };

    const updated = [newEntry, ...guestList];
    setGuestList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedding_guest_list', JSON.stringify(updated));
    }
  };

  const removeGuestFromList = (id) => {
    const updated = guestList.filter((g) => g.id !== id);
    setGuestList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedding_guest_list', JSON.stringify(updated));
    }
  };

  const previewName = guestName.trim() || 'Bapak/Ibu Tamu Undangan';
  const previewLink = generateInvitationUrl(previewName);
  const previewMessage = generateFinalMessage(previewName);

  return (
    <main className="min-h-screen bg-[#4a121f] text-stone-800 py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Top Back Link */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#fbf5ea] hover:text-wedding-gold-light transition-colors bg-white/10 px-3.5 py-2 rounded-full border border-wedding-gold/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lihat Undangan Utama</span>
          </Link>

          <span className="text-[11px] text-wedding-gold-light font-medium tracking-wider uppercase">
            Generator Tamu WA
          </span>
        </div>

        {/* Main Card (Warm Cream Card on Maroon Background) */}
        <div className="royal-white-card rounded-[36px] overflow-hidden relative">
          <CornerFloral position="top-left" />
          <CornerFloral position="top-right" />

          <div className="p-6 sm:p-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-7">
              <CastleIllustration size="small" className="-mb-3" />
              <p className="font-serif text-[11px] uppercase tracking-[0.22em] text-stone-600 font-semibold">
                KIRIM UNDANGAN DIGITAL
              </p>
              <h1 className="font-script text-4xl sm:text-5xl text-wedding-blue my-1">
                {weddingData.bride.nickname} &amp; {weddingData.groom.nickname}
              </h1>
              <p className="font-sans text-xs text-stone-600 max-w-sm mx-auto mt-1">
                Masukkan nama tamu, sesuaikan caption undangan, lalu tekan tombol{' '}
                <strong className="text-wedding-blue">Share ke WhatsApp</strong>.
              </p>
            </div>

            {/* STEP 1: Input Nama Tamu */}
            <div className="bg-[#fffdf9] rounded-2xl p-5 border border-wedding-gold/50 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-wedding-blue text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif text-sm sm:text-base font-bold text-stone-800">
                  Masukkan Nama Tamu
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nama Tamu / Grup <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Contoh: Bapak Budi & Keluarga / Grup Alumni"
                    className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-[#fbf5ea] border border-wedding-gold/50 focus:outline-none focus:ring-2 focus:ring-wedding-blue text-stone-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nomor WhatsApp Tamu{' '}
                    <span className="text-stone-400 font-normal">
                      (Opsional — kosongkan jika ingin pilih kontak langsung di WA)
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#fbf5ea] border border-wedding-gold/40 focus:outline-none focus:ring-2 focus:ring-wedding-blue text-stone-800"
                  />
                </div>

                {/* Generated Link Preview */}
                <div className="p-3 rounded-xl bg-[#fbf5ea] border border-dashed border-wedding-gold/60 flex items-center justify-between gap-2">
                  <div className="truncate text-[11px] text-stone-600">
                    <span className="font-semibold text-wedding-blue">Link Tamu: </span>
                    <span className="underline">{previewLink}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => copyText(previewLink, 'link')}
                      className="px-2.5 py-1 rounded-lg bg-white border border-wedding-gold/40 text-[11px] font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1"
                    >
                      {copiedType === 'link' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-wedding-blue" />
                          <span>Salin Link</span>
                        </>
                      )}
                    </button>
                    <a
                      href={previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Tes buka link undangan tamu ini"
                      className="p-1.5 rounded-lg bg-white border border-wedding-gold/40 text-stone-700 hover:text-wedding-blue"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: Edit Caption Undangan */}
            <div className="bg-[#fffdf9] rounded-2xl p-5 border border-wedding-gold/50 shadow-sm mb-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-wedding-blue text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-serif text-sm sm:text-base font-bold text-stone-800 flex items-center gap-1.5">
                    <span>Edit Caption Undangan</span>
                    <Edit3 className="w-3.5 h-3.5 text-wedding-gold-dark" />
                  </h2>
                </div>

                {/* Pilihan Preset Caption */}
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => selectPreset('islami')}
                    className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                      templateKey === 'islami'
                        ? 'bg-wedding-blue text-white'
                        : 'bg-[#fbf5ea] text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Islami
                  </button>
                  <button
                    type="button"
                    onClick={() => selectPreset('formal')}
                    className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                      templateKey === 'formal'
                        ? 'bg-wedding-blue text-white'
                        : 'bg-[#fbf5ea] text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Formal
                  </button>
                  <button
                    type="button"
                    onClick={() => selectPreset('santai')}
                    className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                      templateKey === 'santai'
                        ? 'bg-wedding-blue text-white'
                        : 'bg-[#fbf5ea] text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Santai
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 mb-2 leading-relaxed">
                Gunakan kode <code className="px-1.5 py-0.5 rounded bg-wedding-blue-soft text-wedding-blue font-bold">{'{nama}'}</code> untuk posisi nama tamu otomatis, dan <code className="px-1.5 py-0.5 rounded bg-wedding-blue-soft text-wedding-blue font-bold">{'{link}'}</code> untuk posisi link undangan otomatis.
              </p>

              <textarea
                rows={10}
                value={captionTemplate}
                onChange={(e) => handleCaptionChange(e.target.value)}
                className="w-full p-3.5 rounded-xl text-xs sm:text-sm bg-[#fbf5ea] border border-wedding-gold/50 focus:outline-none focus:ring-2 focus:ring-wedding-blue text-stone-800 leading-relaxed font-sans"
              />

              <div className="flex items-center justify-between mt-2.5">
                <button
                  type="button"
                  onClick={() => selectPreset(templateKey)}
                  className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-wedding-blue font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Caption ke Default</span>
                </button>

                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Perubahan caption tersimpan otomatis</span>
                </span>
              </div>
            </div>

            {/* STEP 3: Tombol Share ke WhatsApp & Salin Caption */}
            <div className="bg-[#fffdf9] rounded-2xl p-5 border border-wedding-gold/50 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-wedding-blue text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif text-sm sm:text-base font-bold text-stone-800">
                  Kirim / Share ke WhatsApp
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                <button
                  type="button"
                  onClick={() => shareToWhatsApp(guestName, guestPhone)}
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Share ke WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => copyText(previewMessage, 'caption')}
                  className="w-full py-3.5 px-5 rounded-xl bg-wedding-blue hover:bg-wedding-blue-dark text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 border border-wedding-gold/40"
                >
                  {copiedType === 'caption' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Caption Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-wedding-gold-light" />
                      <span>Salin Caption &amp; Link</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={addGuestToList}
                disabled={!guestName.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#fbf5ea] hover:bg-wedding-blue-soft text-wedding-blue font-semibold text-xs border border-wedding-gold/50 flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Simpan Nama Ini ke Daftar Tamu di Bawah</span>
              </button>

              {/* Live Preview Box */}
              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                  Preview Pesan WhatsApp ({previewName}):
                </p>
                <div className="p-3.5 rounded-xl bg-[#e9fbe5] border border-emerald-200 text-xs text-stone-800 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto font-sans">
                  {previewMessage}
                </div>
              </div>
            </div>

            {/* Daftar Tamu Tersimpan (Jika ada) */}
            {guestList.length > 0 && (
              <div className="bg-[#fffdf9] rounded-2xl p-5 border border-wedding-gold/50 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-stone-800 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-wedding-blue" />
                    <span>Daftar Tamu Tersimpan ({guestList.length})</span>
                  </h3>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {guestList.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[#fbf5ea] border border-wedding-gold/40 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="font-serif text-xs sm:text-sm font-bold text-stone-800 truncate">
                          {item.name}
                        </p>
                        {item.phone && (
                          <p className="text-[11px] text-stone-500">{item.phone}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => shareToWhatsApp(item.name, item.phone)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm"
                        >
                          <Send className="w-3 h-3" />
                          <span>Share WA</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            copyText(generateFinalMessage(item.name), `list-${item.id}`)
                          }
                          className="p-1.5 rounded-lg bg-white border border-wedding-gold/40 text-stone-700 hover:text-wedding-blue"
                          title="Salin Caption"
                        >
                          {copiedType === `list-${item.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => removeGuestFromList(item.id)}
                          className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50"
                          title="Hapus Tamu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full -mb-1 relative z-10">
            <BottomFloralBouquet />
          </div>
        </div>
      </div>
    </main>
  );
}
