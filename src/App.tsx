import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
// Supabase import removed

function Logo() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 fade-in-1 flex justify-center items-center"
      style={{
        padding: '24px 40px',
        background: 'rgba(10, 14, 26, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div
        style={{
          fontSize: '18px',
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
      className="w-full flex items-center justify-center h-screen"
      style={{
        backgroundColor: 'var(--obsidian-midnight)',
        padding: '0 40px'
      }}
    >
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full h-full">
        <h1
          className="fade-in-1"
          style={{
            fontSize: 'clamp(28px, 6vw, 36px)',
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
            fontSize: '14px',
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
            className="animate-pulse"
            style={{
              color: 'var(--desert-gold)',
              fontSize: '32px',
              animation: 'pulse-scroll 2s infinite'
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
      className="w-full flex items-center justify-center py-60"
      style={{
        backgroundColor: 'var(--obsidian-midnight)',
        padding: '0 40px'
      }}
    >
      <div className="text-center">
        <p
          className="fade-in-1"
          style={{
            fontSize: 'clamp(24px, 5vw, 32px)',
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
            fontSize: 'clamp(20px, 4vw, 26px)',
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
            fontSize: '14px',
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      console.info('--- TRANSMISSION INITIATED ---');
      const payload = {
        from_name: name.trim(),
        user_name: name.trim(),
        reply_to: email.trim(),
        user_email: email.trim(),
        message: reason.trim(),
        to_name: 'HERIT LASATY Team'
      };

      const serviceId = 'service_il2tiok';
      const templateId = 'template_polguvr';
      const publicKey = '3DazTR_pM0ASL7B1c';

      // 1. Dispatch Email
      console.info('Contacting mail server...');
      const emailRes = await emailjs.send(serviceId, templateId, payload, publicKey);
      console.info('EmailJS Status:', emailRes.status, emailRes.text);

      // 2. UI Sequence
      onShowNotification();
      setTimeout(() => {
        setSubmitted(true);
        setName('');
        setEmail('');
        setReason('');
      }, 300);

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
      className="w-full flex flex-col items-center justify-center pt-80 pb-60 overflow-hidden"
      style={{
        backgroundColor: 'var(--obsidian-midnight)',
        padding: '0 40px',
        position: 'relative',
        perspective: '1200px'
      }}
    >
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[1200px] h-[1200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      />

      <div className="mb-20 w-px h-32 bg-gradient-to-b from-transparent via-desert-gold/50 to-transparent relative z-10" />

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
        className="w-full max-w-[680px] relative pointer-events-auto"
      >
        {!submitted ? (
          <div className="relative group">
            <div
              className="absolute -inset-16 border border-desert-gold/20 pointer-events-none"
              style={{
                borderRadius: '4px',
                background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, transparent 50%, rgba(201, 169, 97, 0.15) 100%)',
                boxShadow: '0 100px 200px rgba(0,0,0,0.9), inset 0 0 100px rgba(201,169,97,0.1)',
                transform: 'translateZ(-30px)' // Fixed as per standard CSS
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.25]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l7 23 23 7-23 7-7 23-7-23-23-7 23-7z' fill='none' stroke='%23C9A961' stroke-width='0.4'/%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px'
                }}
              />
              <div
                className="absolute top-0 left-0 w-80 h-80 opacity-80"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A961' stroke-width='1'%3E%3Cpath d='M40 0l11.7 28.3 30.3-2.3-22.3 20.7 22.3 20.7-30.3-2.3L40 80l-11.7-28.3-30.3 2.3 22.3-20.7L-2 28.3l30.3 2.3z'/%3E%3Crect x='25' y='25' width='30' height='30' transform='rotate(45 40 40)' stroke-opacity='0.8'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px',
                  maskImage: 'radial-gradient(circle at top left, black 50%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(circle at top left, black 50%, transparent 95%)'
                }}
              />
              <div
                className="absolute top-0 right-0 w-80 h-80 opacity-80"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A961' stroke-width='1'%3E%3Cpath d='M40 0l11.7 28.3 30.3-2.3-22.3 20.7 22.3 20.7-30.3-2.3L40 80l-11.7-28.3-30.3 2.3 22.3-20.7L-2 28.3l30.3 2.3z'/%3E%3Crect x='25' y='25' width='30' height='30' transform='rotate(45 40 40)' stroke-opacity='0.8'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px',
                  maskImage: 'radial-gradient(circle at top right, black 50%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(circle at top right, black 50%, transparent 95%)'
                }}
              />
              <div className="absolute inset-y-0 left-0 w-8 border-r border-desert-gold/10 opacity-40 bg-[url('data:image/svg+xml,%3Csvg width=%2720%27 height=%2740%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M10 0l10 20-10 20L0 20z%27 fill=%27none%27 stroke=%27%23C9A961%27 stroke-width=%270.5%27/%3E%3C/svg%3E')] bg-[length:20px_40px]" />
              <div className="absolute inset-y-0 right-0 w-8 border-l border-desert-gold/10 opacity-40 bg-[url('data:image/svg+xml,%3Csvg width=%2720%27 height=%2740%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M10 0l10 20-10 20L0 20z%27 fill=%27none%27 stroke=%27%23C9A961%27 stroke-width=%270.5%27/%3E%3C/svg%3E')] bg-[length:20px_40px]" />
              <div className="absolute inset-2 border border-desert-gold/10 pointer-events-none" />
            </div>

            <div
              className="relative p-12 md:p-24 border border-desert-gold/40 shadow-[0_-40px_150px_-20px_rgba(201,169,97,0.4)] overflow-hidden"
              style={{
                borderTopLeftRadius: '50% 100%',
                borderTopRightRadius: '50% 100%',
                background: 'radial-gradient(circle at 50% 5%, rgba(201, 169, 97, 0.25) 0%, rgba(10, 14, 26, 0.4) 100%)',
                boxShadow: 'inset 0 4px 30px rgba(255,255,255,0.25), 0 -20px 120px rgba(0,0,0,1)',
                transform: 'translateZ(20px)'
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.25] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50h100M50 0v100M25 25l50 50M75 25l-50 50' stroke='%23C9A961' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%23C9A961'/%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px'
                }}
              />
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.05) 50%, transparent 55%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 12s infinite linear',
                  willChange: 'background-position'
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderTopLeftRadius: '50% 100%',
                  borderTopRightRadius: '50% 100%',
                  boxShadow: 'inset 0 40px 120px rgba(0,0,0,1), inset 0 0 200px rgba(201,169,97,0.08)',
                  margin: '1px',
                  transform: 'translateZ(-10px)'
                }}
              />

              <div className="text-center mb-20 relative z-10" style={{ transform: "translateZ(40px)" }}>
                <div className="flex justify-center items-center gap-6 mb-16">
                  <motion.div animate={{ height: [0, 48, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-px bg-gradient-to-t from-desert-gold/80 to-transparent" />
                  <div className="relative">
                    <div className="w-10 h-10 rotate-45 border border-desert-gold/60 flex items-center justify-center shadow-[0_0_20px_rgba(201,169,97,0.3)]">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-5 h-5 rotate-45 bg-desert-gold/30 border border-desert-gold/80 shadow-[0_0_30px_rgba(201,169,97,0.5)]"
                      />
                    </div>
                  </div>
                  <motion.div animate={{ height: [0, 48, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-px bg-gradient-to-t from-desert-gold/80 to-transparent" />
                </div>

                <h2
                  className="fade-in-1 mb-6"
                  style={{
                    fontSize: 'clamp(36px, 10vw, 48px)',
                    fontWeight: 400,
                    color: 'var(--cream-primary)',
                    letterSpacing: '4px',
                    fontFamily: "'Bodoni Moda', serif",
                    fontStyle: 'italic',
                    textShadow: '0 10px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  The Gate
                </h2>
                <div className="w-12 h-px bg-desert-gold/40 mx-auto mb-8" />
                <p
                  className="fade-in-1 mx-auto max-w-[440px]"
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: 'var(--text-secondary)',
                    letterSpacing: '1.5px',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  HERIT LASATY is reserved for those who understand its value. Request consideration.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="fade-in-2 space-y-16 relative z-10">
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent pb-4 outline-none transition-all placeholder:opacity-50 focus:border-cream-primary"
                  style={{
                    borderBottom: '1px solid var(--moonlit-steel)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    letterSpacing: '3px',
                    textTransform: 'uppercase'
                  }}
                />
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent pb-4 outline-none transition-all placeholder:opacity-50 focus:border-cream-primary"
                  style={{
                    borderBottom: '1px solid var(--moonlit-steel)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    letterSpacing: '3px',
                    textTransform: 'uppercase'
                  }}
                />
                <textarea
                  placeholder="WHY DO YOU SEEK HERIT LASATY?"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-transparent pb-4 outline-none transition-all placeholder:opacity-50 focus:border-cream-primary resize-none"
                  style={{
                    borderBottom: '1px solid var(--moonlit-steel)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    letterSpacing: '3px',
                    textTransform: 'uppercase'
                  }}
                />

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 transition-all duration-700 hover:shadow-[0_0_30px_rgba(201,169,97,0.2)]"
                    style={{
                      border: '1px solid var(--desert-gold)',
                      color: 'var(--text-primary)',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      letterSpacing: '4px',
                      fontWeight: 300,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.6 : 1,
                      textTransform: 'uppercase'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.backgroundColor = 'var(--desert-gold)';
                        e.currentTarget.style.color = 'var(--obsidian-midnight)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    {loading ? 'SENDING...' : 'SUBMIT REQUEST'}
                  </button>
                  <p className="text-center mt-8 text-[11px] text-desert-gold tracking-[1px] opacity-80">
                    We will respond within 48 hours if alignment is found.
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="fade-in-1 text-center py-20 px-6">
            <h3 style={{ fontSize: '22px', fontWeight: 300, color: 'var(--cream-primary)', letterSpacing: '4px', lineHeight: 1.6, textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
              Request received.
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--desert-gold)', marginTop: '32px', letterSpacing: '1px', opacity: 0.8 }}>
              We will contact you within 48 hours if alignment is found.
            </p>
          </div>
        )}
      </motion.div>

      <div className="text-center mt-24 text-[14px] text-desert-gold tracking-[0.5px]">
        herit@heritlasaty.com
      </div>
    </section>
  );
}

function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Logo />
      <HeroSection />
      <MythSection />
      <CTASection onShowNotification={() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }} />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none p-6"
          >
            <div className="bg-[#0A0E1A]/95 backdrop-blur-xl border-y border-desert-gold/30 py-12 w-full text-center shadow-[0_0_150px_rgba(0,0,0,1)]">
              <p className="text-[14px] tracking-[6px] text-desert-gold uppercase mb-4">Request Received</p>
              <p className="text-[11px] tracking-[2px] text-cream-primary uppercase opacity-70">
                We will contact you within 48 hours if alignment is found.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
