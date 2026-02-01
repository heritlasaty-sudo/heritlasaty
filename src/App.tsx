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
        // Precise timing for premium feel
        onShowNotification();
        setTimeout(() => {
          setSubmitted(true);
          setName('');
          setEmail('');
          setReason('');
        }, 150); // Faster transition for seamless feel
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
      className="w-full flex flex-col items-center justify-center pt-24 md:pt-48 pb-0 overflow-hidden relative"
      style={{
        backgroundColor: 'var(--obsidian-midnight)',
      }}
    >
      {/* Heritage Glow Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201, 169, 97, 0.08) 0%, transparent 70%)',
          zIndex: 0
        }}
      />

      <div className="mb-12 md:mb-20 w-px h-24 md:h-32 bg-gradient-to-b from-transparent via-desert-gold/50 to-transparent relative z-10" />

      <div className="w-full max-w-[760px] px-6 md:px-10 relative z-10">
        {!submitted ? (
          <div className="relative">
            {/* The Moroccan Outer Frame (Golden Glow) */}
            <div
              className="absolute -inset-4 md:-inset-12 border border-desert-gold/30"
              style={{
                borderRadius: '4px',
                boxShadow: '0 0 40px rgba(201, 169, 97, 0.1)',
                background: 'rgba(10, 14, 26, 0.4)'
              }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-desert-gold/60" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-desert-gold/60" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-desert-gold/60" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-desert-gold/60" />

              {/* Patterned Spandrels */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23C9A961' stroke-width='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px'
                }}
              />
            </div>

            {/* The Horseshoe Arch Container */}
            <div
              className="relative p-10 md:p-24 border-2 border-desert-gold/60 shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden"
              style={{
                borderTopLeftRadius: '50% 100%',
                borderTopRightRadius: '50% 100%',
                background: 'linear-gradient(180deg, rgba(201, 169, 97, 0.18) 0%, rgba(10, 14, 26, 1) 100%)',
                boxShadow: 'inset 0 0 50px rgba(201, 169, 97, 0.1), 0 0 100px rgba(0,0,0,1)',
              }}
            >
              {/* Internal Decorative Arch Line */}
              <div
                className="absolute inset-2 md:inset-4 border border-desert-gold/20 pointer-events-none"
                style={{
                  borderTopLeftRadius: '50% 100%',
                  borderTopRightRadius: '50% 100%',
                }}
              />

              <div className="text-center mb-16 relative">
                <div className="flex justify-center items-center gap-6 mb-12">
                  <div className="w-10 h-10 rotate-45 border-2 border-desert-gold/60 flex items-center justify-center">
                    <div className="w-4 h-4 rotate-45 bg-desert-gold/40 shadow-[0_0_15px_rgba(201,169,97,0.5)]" />
                  </div>
                </div>

                <h2
                  className="mb-8"
                  style={{
                    fontSize: 'clamp(32px, 8vw, 52px)',
                    fontWeight: 400,
                    color: 'var(--cream-primary)',
                    letterSpacing: '6px',
                    fontFamily: "'Bodoni Moda', serif",
                    fontStyle: 'italic',
                    textShadow: '0 4px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  The Gate
                </h2>

                <div className="w-16 h-px bg-desert-gold/40 mx-auto mb-10" />

                <p
                  className="mx-auto max-w-[440px]"
                  style={{
                    fontSize: 'clamp(14px, 3.5vw, 15px)',
                    lineHeight: '2',
                    color: 'var(--text-secondary)',
                    letterSpacing: '2px',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  HERIT LASATY is reserved for those who understand its value. Request consideration.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12 relative z-10 h-full">
                <div className="space-y-10">
                  <input
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-transparent pb-4 outline-none border-b border-moonlit-steel focus:border-desert-gold transition-colors text-center"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      letterSpacing: '4px',
                      textTransform: 'uppercase'
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent pb-4 outline-none border-b border-moonlit-steel focus:border-desert-gold transition-colors text-center"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      letterSpacing: '4px',
                      textTransform: 'uppercase'
                    }}
                  />
                  <textarea
                    name="reason"
                    placeholder="WHY DO YOU SEEK HERIT LASATY?"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    rows={2}
                    className="w-full bg-transparent pb-4 outline-none border-b border-moonlit-steel focus:border-desert-gold transition-colors text-center resize-none"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                      lineHeight: '1.8'
                    }}
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 border border-desert-gold text-text-primary bg-transparent transition-all duration-500 hover:bg-desert-gold hover:text-obsidian-midnight active:scale-[0.98]"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '6px',
                      fontWeight: 300,
                      textTransform: 'uppercase'
                    }}
                  >
                    {loading ? 'TRANSMITTING...' : 'SUBMIT REQUEST'}
                  </button>
                  <p className="text-center mt-8 text-[11px] text-desert-gold/80 tracking-[2px] uppercase">
                    Refinement within 48 hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 px-6"
          >
            <div className="w-16 h-16 rotate-45 border-2 border-desert-gold/60 mx-auto mb-12 flex items-center justify-center">
              <div className="w-6 h-6 bg-desert-gold/40 shadow-[0_0_20px_rgba(201,169,97,0.5)]" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 300, color: 'var(--cream-primary)', letterSpacing: '6px', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
              Request Received.
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--desert-gold)', marginTop: '24px', letterSpacing: '1px', opacity: 0.8 }}>
              We will contact you shortly if our souls resonate.
            </p>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-24 mb-16 text-[14px] text-desert-gold tracking-[1.5px] relative z-10 w-full">
        herit@heritlasaty.com
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
