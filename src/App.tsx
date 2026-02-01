import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// EmailJS removed
// Supabase import removed

function Logo() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 fade-in-1 flex justify-center items-center"
      style={{
        padding: 'clamp(14px, 3vw, 24px) clamp(16px, 4vw, 40px)',
        background: 'rgba(10, 14, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div
        className="text-[14px] md:text-[18px]"
        style={{
          fontWeight: 300,
          letterSpacing: '5px',
          color: 'var(--cream-primary)',
          textTransform: 'uppercase',
          lineHeight: 1,
          textAlign: 'center'
        }}
      >
        HERIT LASATY
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      className="w-full flex items-center justify-center h-screen px-6 md:px-10"
      style={{
        backgroundColor: 'var(--obsidian-midnight)'
      }}
    >
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full h-full">
        <h1
          className="fade-in-1"
          style={{
            fontSize: 'clamp(32px, 8vw, 64px)',
            fontWeight: 400,
            color: 'var(--cream-primary)',
            margin: 0,
            lineHeight: 1.2,
            fontFamily: "'Bodoni Moda', serif",
            fontStyle: 'italic',
            letterSpacing: '1px'
          }}
        >
          Heritage with a Soul
        </h1>

        <p
          className="fade-in-2 mt-6"
          style={{
            fontSize: 'clamp(10px, 3vw, 14px)',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            margin: 0,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          25 commissions
        </p>

        <div className="mt-20 flex justify-center">
          <div
            className="animate-bounce"
            style={{
              color: 'var(--desert-gold)',
              fontSize: '24px',
            }}
          >
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}

function MythSection() {
  return (
    <section
      className="w-full flex items-center justify-center py-32 md:py-60 px-6 md:px-10"
      style={{
        backgroundColor: 'var(--obsidian-midnight)'
      }}
    >
      <div className="text-center">
        <p
          className="fade-in-1"
          style={{
            fontSize: 'clamp(24px, 5vw, 42px)',
            fontWeight: 400,
            color: 'var(--cream-primary)',
            margin: 0,
            lineHeight: 1.4,
            fontFamily: "'Bodoni Moda', serif",
            fontStyle: 'italic',
            letterSpacing: '1px'
          }}
        >
          Fez tanneries. 1000 AD.
        </p>

        <p
          className="fade-in-2 mt-4"
          style={{
            fontSize: 'clamp(20px, 4vw, 32px)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            margin: 0,
            fontFamily: "'Bodoni Moda', serif",
            fontStyle: 'italic'
          }}
        >
          Vegetable-tanned reserve.
        </p>

        <p
          className="fade-in-3 mt-12"
          style={{
            fontSize: 'clamp(12px, 3.5vw, 14px)',
            fontWeight: 300,
            color: 'var(--desert-gold)',
            margin: 0,
            letterSpacing: '5px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          34.0522°N 4.9827°W
        </p>
      </div>
    </section>
  );
}

function CTASection({ onShowNotification }: { onShowNotification: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'waitlist');
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('reason', reason.trim());

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (response.ok) {
        onShowNotification();
        setTimeout(() => {
          setSubmitted(true);
          setName('');
          setEmail('');
          setReason('');
        }, 150);
      } else {
        throw new Error('Netlify submission failed');
      }
    } catch (err) {
      console.error('Transmission fault:', err);
      onShowNotification();
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center pt-24 md:pt-48 pb-10 overflow-hidden relative"
      style={{
        backgroundColor: 'var(--obsidian-midnight)',
      }}
    >
      {/* Sacred Light & Ethereal Atmosphere */}
      <div
        className="absolute inset-x-0 top-0 h-[1000px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(201, 169, 97, 0.2) 0%, transparent 60%)',
          zIndex: 0
        }}
      />

      {/* Background Zellij Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0l10 30h30l-25 20 10 30-25-20-25 20 10-30-25-20h30z' fill='none' stroke='%23C9A961' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          zIndex: 0
        }}
      />

      <div className="mb-16 md:mb-28 w-px h-32 md:h-48 bg-gradient-to-b from-transparent via-desert-gold/60 to-transparent relative z-10" />

      <div className="w-full max-w-[800px] px-6 md:px-12 relative z-10">
        {!submitted ? (
          <div className="relative">
            {/* The Outer Sebka Frame (Grand Moroccan Portal) */}
            <div
              className="absolute -inset-6 md:-inset-20 border-[0.5px] border-desert-gold/15"
              style={{
                borderRadius: '8px',
                background: 'rgba(10, 14, 26, 0.4)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 120px rgba(0,0,0,0.8), inset 0 0 80px rgba(201,169,97,0.03)'
              }}
            >
              {/* Intricate Sebka (Diamond) Mesh */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='100' viewBox='0 0 60 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 50 L30 100 L0 50 Z' fill='none' stroke='%23C9A961' stroke-width='1'/%3E%3Cpath d='M0 0 L30 50 L0 100' fill='none' stroke='%23C9A961' stroke-width='0.5'/%3E%3Cpath d='M60 0 L30 50 L60 100' fill='none' stroke='%23C9A961' stroke-width='0.5'/%3E%3C/svg%3E")`,
                  backgroundSize: '40px 64px'
                }}
              />

              {/* Ornamental Border Insets */}
              <div className="absolute inset-2 border border-desert-gold/10 pointer-events-none" />

              {/* Corner Symbols (Andalusian Stars) */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-14 h-14 opacity-40 ${i === 0 ? 'top-0 left-0' : i === 1 ? 'top-0 right-0' : i === 2 ? 'bottom-0 left-0' : 'bottom-0 right-0'
                    }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l4.5 15.5L40 20l-15.5 4.5L20 40l-4.5-15.5L0 20l15.5-4.5z' fill='none' stroke='%23C9A961' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    transform: i % 2 === 0 ? 'rotate(0deg)' : 'rotate(45deg)'
                  }}
                />
              ))}
            </div>

            {/* The Golden Arch (Heavenly Passage) */}
            <div
              className="relative p-12 md:p-32 border-[1.5px] border-desert-gold/40 overflow-hidden"
              style={{
                borderTopLeftRadius: '50% 100%',
                borderTopRightRadius: '50% 100%',
                background: 'radial-gradient(circle at 50% 0%, rgba(201, 169, 97, 0.25) 0%, rgba(10, 14, 26, 1) 100%)',
                boxShadow: 'inset 0 0 60px rgba(201,169,97,0.15), 0 40px 100px rgba(0,0,0,1)',
              }}
            >
              {/* Inner Sacred Geometry Halo */}
              <div
                className="absolute inset-4 md:inset-8 border-t border-x border-desert-gold/20 pointer-events-none opacity-60"
                style={{
                  borderTopLeftRadius: '50% 100%',
                  borderTopRightRadius: '50% 100%',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23C9A961' stroke-width='0.2' stroke-dasharray='1,4'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="text-center mb-16 md:mb-24 relative">
                {/* Ritual Symbol */}
                <div className="flex justify-center items-center gap-8 mb-14">
                  <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.5 }} className="h-px bg-gradient-to-r from-transparent to-desert-gold/50" />
                  <div className="w-14 h-14 relative flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border border-desert-gold/40 rotate-45"
                    />
                    <div className="w-8 h-8 border-2 border-desert-gold/70 rotate-45 flex items-center justify-center">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-3 h-3 bg-desert-gold shadow-[0_0_15px_rgba(201,169,97,0.8)]"
                      />
                    </div>
                  </div>
                  <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.5 }} className="h-px bg-gradient-to-l from-transparent to-desert-gold/50" />
                </div>

                <h2
                  className="mb-8"
                  style={{
                    fontSize: 'clamp(38px, 12vw, 64px)',
                    fontWeight: 400,
                    color: 'var(--cream-primary)',
                    letterSpacing: '10px',
                    fontFamily: "'Bodoni Moda', serif",
                    fontStyle: 'italic',
                    textShadow: '0 0 40px rgba(201, 169, 97, 0.3)'
                  }}
                >
                  The Gate
                </h2>

                <div className="flex items-center justify-center gap-4 mb-10">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-desert-gold/40" />
                  <div className="text-desert-gold text-[10px] tracking-[5px] uppercase opacity-60">Established 1000 AD</div>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-desert-gold/40" />
                </div>

                <p
                  className="mx-auto max-w-[500px]"
                  style={{
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    lineHeight: '2.4',
                    color: 'var(--text-secondary)',
                    letterSpacing: '2.5px',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300
                  }}
                >
                  Entrance is granted through alignment. Those who value the rare, the slow, and the sacred are invited to request passage.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-16 md:space-y-24 relative z-10">
                <div className="space-y-14">
                  <div className="relative group/field">
                    <input
                      type="text"
                      name="name"
                      placeholder="YOUR LEGEACY NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-transparent pb-5 outline-none border-b border-desert-gold/20 focus:border-desert-gold transition-all text-center tracking-[6px] placeholder:opacity-30"
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        textTransform: 'uppercase'
                      }}
                    />
                  </div>
                  <div className="relative group/field">
                    <input
                      type="email"
                      name="email"
                      placeholder="VIRTUAL ADDRESS (EMAIL)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent pb-5 outline-none border-b border-desert-gold/20 focus:border-desert-gold transition-all text-center tracking-[6px] placeholder:opacity-30"
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        textTransform: 'uppercase'
                      }}
                    />
                  </div>
                  <div className="relative group/field">
                    <textarea
                      name="reason"
                      placeholder="DESCRIBE YOUR RESONANCE WITH HERIT"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                      rows={2}
                      className="w-full bg-transparent pb-5 outline-none border-b border-desert-gold/20 focus:border-desert-gold transition-all text-center tracking-[5px] placeholder:opacity-30 resize-none overflow-hidden"
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        lineHeight: '2.2'
                      }}
                    />
                  </div>
                </div>

                <div className="pt-12">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 md:py-8 border border-desert-gold/50 text-text-primary bg-transparent relative overflow-hidden group shadow-[0_0_50px_rgba(201,169,97,0.1)]"
                    style={{
                      fontSize: '13px',
                      letterSpacing: '10px',
                      fontWeight: 300,
                      textTransform: 'uppercase',
                      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading && !window.matchMedia("(pointer: coarse)").matches) {
                        e.currentTarget.style.backgroundColor = 'var(--desert-gold)';
                        e.currentTarget.style.color = 'var(--obsidian-midnight)';
                        e.currentTarget.style.boxShadow = '0 0 80px rgba(201, 169, 97, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.boxShadow = '0 0 50px rgba(201, 169, 97, 0.1)';
                    }}
                  >
                    <span className="relative z-10">{loading ? 'TRANSMITTING...' : 'INITIATE REQUEST'}</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  </button>
                  <div className="flex justify-center items-center gap-4 mt-12 opacity-40">
                    <div className="h-px w-8 bg-desert-gold/50" />
                    <span className="text-[9px] tracking-[4px] text-desert-gold uppercase">Traditional Craft • Modern Soul</span>
                    <div className="h-px w-8 bg-desert-gold/50" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-40 px-6 relative"
          >
            {/* Success Glow halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-desert-gold/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-20 h-20 rotate-45 border border-desert-gold/40 mx-auto mb-16 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-8 h-8 bg-desert-gold/40 shadow-[0_0_30px_rgba(201,169,97,0.6)]"
              />
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 300, color: 'var(--cream-primary)', letterSpacing: '8px', textTransform: 'uppercase', fontFamily: "'Bodoni Moda', serif", fontStyle: 'italic' }}>
              Admission Noted.
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--desert-gold)', marginTop: '32px', letterSpacing: '2px', opacity: 0.8, fontFamily: "'Outfit', sans-serif" }}>
              Our archives are processing your request.
            </p>
          </motion.div>
        )}
      </div>


      <div className="text-center mt-32 mb-16 text-[14px] text-desert-gold tracking-[2px] opacity-70 relative z-10 w-full hover:opacity-100 transition-opacity">
        <a href="mailto:herit@heritlasaty.com" className="hover:tracking-[3px] transition-all duration-500">herit@heritlasaty.com</a>
      </div>
    </section>
  );
}


function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div style={{
      overflow: 'hidden',
      backgroundColor: 'var(--obsidian-midnight)',
      minHeight: '100vh',
      width: '100%',
      position: 'relative'
    }}>
      <Logo />
      <HeroSection />
      <MythSection />
      <CTASection onShowNotification={() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }} />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 flex items-center justify-center z-[300] pointer-events-none p-6"
          >
            <div className="bg-[#0A0E1A]/90 border-y border-desert-gold/30 py-16 w-full text-center shadow-[0_0_150px_rgba(0,0,0,1)]">
              <p className="text-[16px] tracking-[8px] text-desert-gold uppercase mb-6">Transmission Received</p>
              <p className="text-[12px] tracking-[3px] text-cream-primary uppercase opacity-60 max-w-sm mx-auto leading-loose">
                Your request has been placed in the archives of Herit Lasaty. Expect a response if alignment is found.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
