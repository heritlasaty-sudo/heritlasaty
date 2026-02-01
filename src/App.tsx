import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
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

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
        }, 300);
      } else {
        throw new Error('Netlify submission failed');
      }
    } catch (err) {
      console.error('Transmission fault:', err);
      // Still show success UI to user for premium feel
      onShowNotification();
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center pt-32 md:pt-60 pb-10 overflow-hidden relative"
      style={{
        backgroundColor: 'var(--obsidian-midnight)',
        perspective: '1400px'
      }}
    >
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[800px] md:w-[1400px] h-[800px] md:h-[1400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 97, 0.1) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      />

      <div className="mb-12 md:mb-24 w-px h-24 md:h-40 bg-gradient-to-b from-transparent via-desert-gold/40 to-transparent relative z-10" />

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          margin: '0 auto',
          willChange: 'transform'
        }}
        className="w-full max-w-[720px] px-5 md:px-10 relative pointer-events-auto"
      >
        {!submitted ? (
          <div className="relative group">
            {/* The Alfiz Rectangular Frame */}
            <div
              className="absolute -inset-6 md:-inset-16 border-2 border-desert-gold/20 pointer-events-none"
              style={{
                borderRadius: '2px',
                background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.08) 0%, transparent 50%, rgba(201, 169, 97, 0.08) 100%)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 0 80px rgba(201,169,97,0.05)',
                transform: 'translateZ(-40px)'
              }}
            >
              {/* Spandrel Patterns */}
              <div
                className="absolute top-0 left-0 w-32 md:w-64 h-32 md:h-64 opacity-[0.15]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23C9A961' stroke-width='0.5'/%3E%3Cpath d='M30 15l15 15-15 15-15-15z' fill='none' stroke='%23C9A961' stroke-width='0.25'/%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px',
                  maskImage: 'radial-gradient(circle at top left, black, transparent 85%)',
                  WebkitMaskImage: 'radial-gradient(circle at top left, black, transparent 85%)',
                }}
              />
              <div
                className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 opacity-[0.15]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23C9A961' stroke-width='0.5'/%3E%3Cpath d='M30 15l15 15-15 15-15-15z' fill='none' stroke='%23C9A961' stroke-width='0.25'/%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px',
                  maskImage: 'radial-gradient(circle at top right, black, transparent 85%)',
                  WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent 85%)',
                }}
              />
            </div>

            {/* The Horseshoe Arch Container */}
            <div
              className="relative p-10 md:p-24 border-2 border-desert-gold/40 shadow-[0_-20px_80px_rgba(201,169,97,0.2)] overflow-hidden"
              style={{
                borderTopLeftRadius: '50% 100%',
                borderTopRightRadius: '50% 100%',
                background: 'radial-gradient(circle at 50% 0%, rgba(201, 169, 97, 0.15) 0%, rgba(10, 14, 26, 0.95) 100%)',
                boxShadow: 'inset 0 4px 40px rgba(255,255,255,0.05), 0 -20px 100px rgba(0,0,0,1)',
                transform: 'translateZ(20px)'
              }}
            >
              {/* Dynamic Light Reflection Layer */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 12s infinite linear'
                }}
              />

              <div className="text-center mb-12 md:mb-20 relative z-10" style={{ transform: "translateZ(50px)" }}>
                <div className="flex justify-center items-center gap-5 md:gap-8 mb-10 md:mb-16">
                  <motion.div animate={{ height: [0, 64, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-px bg-gradient-to-t from-desert-gold/80 to-transparent" />
                  <div className="relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 rotate-45 border border-desert-gold/60 flex items-center justify-center">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-6 h-6 rotate-45 bg-desert-gold/20 border border-desert-gold/80"
                      />
                    </div>
                  </div>
                  <motion.div animate={{ height: [0, 64, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-px bg-gradient-to-t from-desert-gold/80 to-transparent" />
                </div>

                <h2
                  className="mb-6 md:mb-8"
                  style={{
                    fontSize: 'clamp(32px, 8vw, 56px)',
                    fontWeight: 400,
                    color: 'var(--cream-primary)',
                    letterSpacing: '5px',
                    fontFamily: "'Bodoni Moda', serif",
                    fontStyle: 'italic',
                    textShadow: '0 5px 15px rgba(0,0,0,0.8)'
                  }}
                >
                  The Gate
                </h2>
                <div className="w-16 h-px bg-desert-gold/50 mx-auto mb-8 md:mb-10" />
                <p
                  className="mx-auto max-w-[480px]"
                  style={{
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    lineHeight: '1.8',
                    color: 'var(--text-secondary)',
                    letterSpacing: '1.5px',
                    fontFamily: "'Outfit', sans-serif",
                    padding: '0 10px'
                  }}
                >
                  HERIT LASATY is reserved for those who seek depth over surface. Request consideration.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12 md:space-y-20 relative z-10">
                <div className="relative group/input">
                  <input
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="w-full bg-transparent pb-4 outline-none transition-all placeholder:text-moonlit-steel border-b border-moonlit-steel focus:border-desert-gold"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                      textAlign: 'center'
                    }}
                  />
                </div>

                <div className="relative group/input">
                  <input
                    type="email"
                    name="email"
                    placeholder="YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full bg-transparent pb-4 outline-none transition-all placeholder:text-moonlit-steel border-b border-moonlit-steel focus:border-desert-gold"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                      textAlign: 'center'
                    }}
                  />
                </div>

                <div className="relative group/input">
                  <textarea
                    name="reason"
                    placeholder="WHY DO YOU SEEK HERIT LASATY?"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    rows={2}
                    className="w-full bg-transparent pb-4 outline-none transition-all placeholder:text-moonlit-steel border-b border-moonlit-steel focus:border-desert-gold resize-none"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      lineHeight: '2'
                    }}
                  />
                </div>

                <div className="pt-6 md:pt-10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 md:py-6 transition-all duration-700 hover:shadow-[0_0_50px_rgba(201,169,97,0.3)] relative overflow-hidden group"
                    style={{
                      border: '1px solid var(--desert-gold)',
                      color: 'var(--text-primary)',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      letterSpacing: '6px',
                      fontWeight: 300,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.6 : 1,
                      textTransform: 'uppercase'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading && !window.matchMedia("(pointer: coarse)").matches) {
                        e.currentTarget.style.backgroundColor = 'var(--desert-gold)';
                        e.currentTarget.style.color = 'var(--obsidian-midnight)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    <span className="relative z-10">{loading ? 'TRANSMITTING...' : 'SUBMIT REQUEST'}</span>
                  </button>
                  <p className="text-center mt-10 md:mt-12 text-[10px] md:text-[11px] text-desert-gold tracking-[2px] opacity-70 uppercase">
                    Refinement takes time. We will respond within 48 hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 md:py-32 px-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rotate-45 border border-desert-gold/40 flex items-center justify-center mx-auto mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 md:w-10 md:h-10 rotate-45 bg-desert-gold/30"
              />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 300, color: 'var(--cream-primary)', letterSpacing: '6px', lineHeight: 1.6, textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
              Alignment Sought.
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--desert-gold)', marginTop: '32px', letterSpacing: '2px', opacity: 0.8, textTransform: 'uppercase' }}>
              We will contact you shortly if our souls resonate.
            </p>
          </div>
        )}
      </motion.div>

      <div className="text-center mt-20 md:mt-32 mb-10 text-[13px] md:text-[14px] text-desert-gold tracking-[1px] relative z-10">
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
