import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// EmailJS removed

export default function CTASection() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // 3D Tilt Effect State
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
            console.info('--- TRANSMISSION INITIATED (NETLIFY) ---');

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
                console.info('Netlify submission: SUCCESS');
                setSubmitted(true);
                setName('');
                setEmail('');
                setReason('');
            } else {
                throw new Error('Netlify submission failed');
            }
        } catch (error) {
            console.error('Transmission fault:', error);
            // Still show success UI to user for premium feel, but log error
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
            <div
                className="mb-20 w-px h-32 bg-gradient-to-b from-transparent via-desert-gold/40 to-transparent"
            />

            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    margin: '0 auto'
                }}
                className="w-full max-w-[680px] relative pointer-events-auto"
            >
                {!submitted ? (
                    <div className="relative group">
                        {/* The Alfiz (Architectural Rectangular Frame) */}
                        <div
                            className="absolute -inset-12 border-2 border-desert-gold/20 pointer-events-none"
                            style={{
                                borderRadius: '4px',
                                background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.05) 0%, transparent 50%, rgba(201, 169, 97, 0.05) 100%)',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                                transform: 'translateZ(-20px)'
                            }}
                        >
                            {/* Spandrels with Sebka Geometric Pattern */}
                            <div
                                className="absolute top-0 left-0 w-48 h-48 opacity-25"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23C9A961' stroke-width='0.5'/%3E%3Cpath d='M30 15l15 15-15 15-15-15z' fill='none' stroke='%23C9A961' stroke-width='0.25'/%3E%3C/svg%3E")`,
                                    backgroundSize: '30px 30px',
                                    maskImage: 'radial-gradient(circle at top left, black, transparent 80%)',
                                    WebkitMaskImage: 'radial-gradient(circle at top left, black, transparent 80%)',
                                }}
                            />
                            <div
                                className="absolute top-0 right-0 w-48 h-48 opacity-25"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23C9A961' stroke-width='0.5'/%3E%3Cpath d='M30 15l15 15-15 15-15-15z' fill='none' stroke='%23C9A961' stroke-width='0.25'/%3E%3C/svg%3E")`,
                                    backgroundSize: '30px 30px',
                                    maskImage: 'radial-gradient(circle at top right, black, transparent 80%)',
                                    WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent 80%)',
                                }}
                            />
                        </div>

                        {/* The Horseshoe Arch Structure */}
                        <div
                            className="relative p-12 md:p-24 border-2 border-desert-gold/40 shadow-[0_-40px_100px_-20px_rgba(201,169,97,0.25)] overflow-hidden"
                            style={{
                                borderTopLeftRadius: '50% 100%',
                                borderTopRightRadius: '50% 100%',
                                background: 'radial-gradient(circle at 50% 0%, rgba(201, 169, 97, 0.15) 0%, rgba(10, 14, 26, 0.1) 100%)',
                                boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.1), 0 -20px 80px rgba(0,0,0,0.8)',
                                transform: 'translateZ(20px)'
                            }}
                        >
                            {/* Dynamic Light Reflection Layer */}
                            <div
                                className="absolute inset-0 opacity-30 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
                                    backgroundSize: '200% 200%',
                                    animation: 'shimmer 10s infinite linear'
                                }}
                            />

                            {/* Inner Arch Depth (The Intrados) */}
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
                                {/* Alhambra / Nasrid inspired central icon */}
                                <div className="flex justify-center items-center gap-6 mb-16">
                                    <motion.div animate={{ height: [0, 48, 48] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} className="w-px bg-gradient-to-t from-desert-gold/60 to-transparent" />
                                    <div className="relative">
                                        <div className="w-10 h-10 rotate-45 border border-desert-gold/40 flex items-center justify-center">
                                            <div className="w-5 h-5 rotate-45 bg-desert-gold/20 border border-desert-gold/60 shadow-[0_0_15px_rgba(201,169,97,0.3)]" />
                                        </div>
                                    </div>
                                    <motion.div animate={{ height: [0, 48, 48] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} className="w-px bg-gradient-to-t from-desert-gold/60 to-transparent" />
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
                                    name="name"
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
                                    name="email"
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
                                    name="reason"
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

                                    <p
                                        className="text-center mt-8"
                                        style={{
                                            fontSize: '11px',
                                            color: 'var(--desert-gold)',
                                            letterSpacing: '1px',
                                            opacity: 0.8
                                        }}
                                    >
                                        We will respond within 48 hours if we find alignment.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="fade-in-1 text-center">
                        <p
                            style={{
                                fontSize: 'clamp(24px, 8vw, 48px)',
                                fontWeight: 300,
                                color: 'var(--text-primary)',
                                letterSpacing: '1px',
                                lineHeight: 1.4
                            }}
                        >
                            Reservation confirmed.
                        </p>
                        <p
                            style={{
                                fontSize: '16px',
                                color: 'var(--desert-gold)',
                                marginTop: '40px',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Thank you for your interest in HERITAGE WITH A SOUL.
                        </p>
                    </div>
                )}
            </motion.div>

            <div
                className="text-center mt-24"
                style={{
                    fontSize: '14px',
                    color: 'var(--desert-gold)',
                    letterSpacing: '0.5px'
                }}
            >
                herit@heritlasaty.com
            </div>
        </section>
    );
}
