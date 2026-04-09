'use client';

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, Globe, Monitor, Code, Layers, Mail, Briefcase, Box, ArrowUpRight } from 'lucide-react';
import { products, portfolio } from '@/lib/data';
import RotatingGlobe from '@/components/RotatingGlobe';
import GuidingElement from '@/components/GuidingElement';

// --- Marquee content ---
const MARQUEE_ITEMS = [
  'Business Websites', '✦', 'Portfolio Websites', '✦',
  'Landing Pages', '✦', 'E-Commerce Websites', '✦',
  'Restaurant Websites', '✦', 'Personal Brand Websites', '✦',
];

// Duplicated so the CSS loop is seamless
const MARQUEE_FULL = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

// --- Stats ---
const STATS = [
  { num: '12+',  label: 'Websites Delivered' },
  { num: '100%', label: 'On-Time Delivery' },
  { num: '3',    label: 'Years Active' },
  { num: '3 Mo', label: 'Up to 3 Months of Retainer' },
];

// --- Services ---
const SERVICES = [
  { icon: <Monitor size={22} />, name: 'Business Websites', desc: 'Professional websites for businesses that want to build trust, explain their services clearly, and attract more customers online.' },
  { icon: <Briefcase size={22} />, name: 'Portfolio Websites', desc: 'Clean and modern websites to showcase your work, projects, services, or personal brand in a simple and credible way.' },
  { icon: <Layers size={22} />, name: 'Landing Pages', desc: 'Focused one-page websites designed to present an offer clearly and encourage visitors to get in touch or take action.' },
  { icon: <Code size={22} />, name: 'Custom Website Solutions', desc: 'Tailored websites built around your business needs, goals, and content without forcing you into a one-size-fits-all template.' },
  { icon: <Globe size={22} />, name: 'Responsive Website Design', desc: 'Websites that look good and work smoothly on desktop, tablet, and mobile so every visitor gets a better experience.' },
  { icon: <Box size={22} />, name: 'Website Support & Updates', desc: 'Ongoing help with edits, improvements, and maintenance after launch so your website stays current and reliable.' },
];

// --- Shared animation variants ---
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { staggerChildren: 0.1 },
};

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  packageType: string;
  projectBrief: string;
};

type SubmissionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

// --- Main Page ---
export default function SinglePageWebsite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.08], [1, 0.96]);

  const pricingRef = useRef<HTMLDivElement>(null);
  const [pricingIndex, setPricingIndex] = useState(0);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    packageType: '',
    projectBrief: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: 'idle',
    message: '',
  });

  const scrollToCard = (index: number) => {
    const next = Math.max(0, Math.min(index, products.length - 1));
    pricingRef.current?.scrollTo({ left: pricingRef.current.offsetWidth * next, behavior: 'smooth' });
    setPricingIndex(next);
  };

  const handlePricingScroll = () => {
    if (!pricingRef.current) return;
    const index = Math.round(pricingRef.current.scrollLeft / pricingRef.current.offsetWidth);
    setPricingIndex(index);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const selectPackage = (packageType: string) => {
    setContactForm((current) => ({
      ...current,
      packageType,
    }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmissionState({ status: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to send your request right now.');
      }

      setSubmissionState({
        status: 'success',
        message: payload.message || 'Your request has been sent to Corpus Project.',
      });
      setContactForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        packageType: '',
        projectBrief: '',
      });
    } catch (error) {
      setSubmissionState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unable to send your request right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="page-wrapper">
      <GuidingElement />

      {/* ===================================================================
          HERO
      =================================================================== */}
      <section style={{
        minHeight: '90vh',
        padding: '4rem 0 6rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container">
          <div className="hero-grid">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              style={{ opacity: heroOpacity, scale: heroScale }}
            >
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}
              >
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid var(--color-border)',
                  padding: '0.4rem 1rem',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--color-text-muted)',
                }}>
                  <span style={{
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-brutal)',
                    display: 'inline-block',
                  }} />
                  Now Booking Projects
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontSize: 'clamp(2.5rem, 12vw, 10rem)',
                  lineHeight: 0.85,
                  fontWeight: 900,
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.06em',
                  textTransform: 'uppercase',
                }}
              >
                CORPUS
              </motion.h1>

              {/* Ghost "PROJECT" — brutalist outlined text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{ marginBottom: '2.5rem' }}
              >
                <span style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: 'clamp(1.5rem, 7.5vw, 6.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.35)',
                  display: 'block',
                  lineHeight: 1,
                }}>
                  PROJECT
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  fontSize: 'clamp(0.9rem, 3.5vw, 1.25rem)',
                  maxWidth: '480px',
                  width: '100%',
                  marginBottom: '3rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                We design simple, modern websites that help businesses, creators, and brands present themselves clearly and professionally online.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="hero-buttons"
              >
                <button
                  className="btn btn--primary"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Your Project <ArrowRight size={16} />
                </button>
                <button
                  className="btn"
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Work
                </button>
              </motion.div>
            </motion.div>

            {/* Right — Globe (background on mobile) */}
            <div className="hero-globe-bg">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div className="hero-globe" style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                  <RotatingGlobe />
                  <motion.div
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: '50%', left: '50%',
                      width: '120%', height: '120%',
                      x: '-50%', y: '-50%',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute', bottom: '40px', left: '50%',
            translateX: '-50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
          }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '1px', height: '36px', background: 'white' }}
          />
        </motion.div>
      </section>

      {/* ===================================================================
          MARQUEE STRIP
      =================================================================== */}
      <div className="marquee-track" role="marquee" aria-hidden="true">
        <div className="marquee-inner">
          {MARQUEE_FULL.map((text, i) => (
            <span
              key={i}
              className={text === '✦' ? 'marquee-item--accent' : 'marquee-item'}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ===================================================================
          ABOUT / STATEMENT
      =================================================================== */}
      <section id="about" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container container--narrow" style={{ margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp}>
            <div style={{
              display: 'inline-flex',
              padding: '1rem',
              border: '1px solid var(--color-border)',
              borderRadius: '50%',
              marginBottom: '2.5rem',
            }}>
              <Globe size={32} style={{ opacity: 0.8 }} />
            </div>
            <h2 style={{
              fontSize: 'var(--text-4xl)',
              marginBottom: '2.5rem',
              lineHeight: 1.15,
              fontWeight: 700,
            }}>
              Simple websites, built with purpose.{' '}
              <span style={{ color: 'var(--color-text-muted)' }}>
                Clear design that helps people understand and trust your brand.
              </span>
            </h2>
            <p style={{
              fontSize: 'var(--text-md)',
              color: 'var(--color-text-muted)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Corpus Project creates clean, modern websites that are easy to use, visually strong, and focused on what matters most — helping your business look professional online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SERVICES
      =================================================================== */}
      <section id="services" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ marginBottom: 'var(--space-8)', borderLeft: '1px solid var(--color-border)', paddingLeft: '2rem' }}
          >
            <span className="label" style={{ letterSpacing: '0.3em' }}>Services</span>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>What We Build</h2>
          </motion.div>

          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                className="card"
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
              >
                <span
                  className="ghost-num"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.5rem',
                    fontSize: '5rem',
                    opacity: 1,
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div style={{ marginBottom: '2rem', color: 'var(--color-text)', opacity: 0.9 }}>
                  {s.icon}
                </div>
                <h3 className="card__title" style={{ fontSize: 'var(--text-xl)' }}>{s.name}</h3>
                <p className="card__body" style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          WORK
      =================================================================== */}
      <section id="work" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ marginBottom: 'var(--space-8)', borderLeft: '1px solid var(--color-border)', paddingLeft: '2rem' }}
          >
            <span className="label" style={{ letterSpacing: '0.3em' }}>Portfolio</span>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Recent Projects</h2>
          </motion.div>

          <motion.div
            className="grid-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {portfolio.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}
                whileHover="hover"
              >
                <motion.div
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    backgroundColor: 'var(--color-surface-alt)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={{
                    borderColor: 'var(--color-brutal)',
                    skewX: -0.8,
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <motion.div
                    variants={{ hover: { scale: 1.1, opacity: 0.08 } }}
                    style={{
                      position: 'absolute', width: '200%', height: '200%',
                      background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.06) 180deg, transparent 360deg)',
                      animation: 'spin 20s linear infinite',
                      opacity: 0.05,
                    }}
                  />

                  <motion.div
                    variants={{
                      hover:   { scaleX: 1 },
                      initial: { scaleX: 0 },
                    }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: '2px',
                      background: 'var(--color-brutal)',
                      transformOrigin: 'left',
                    }}
                  />

                  <motion.div
                    variants={{
                      hover:   { opacity: 1, y: 0 },
                      initial: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.35 }}
                    style={{ zIndex: 2, position: 'absolute' }}
                  >
                    <button className="btn btn--primary" style={{ padding: '0.7rem 1.4rem', fontSize: '11px' }}>
                      View Project <ArrowUpRight size={14} />
                    </button>
                  </motion.div>

                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    fontSize: '9px',
                    color: 'var(--color-border-dark)',
                    zIndex: 1,
                  }}>
                    {`${item.tag} // PROJECT`}
                  </span>
                </motion.div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                      {item.category}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {item.features.slice(0, 2).map((f, fi) => (
                      <span key={fi} className="mono-tag">{f}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          STATS STRIP
      =================================================================== */}
      <section style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="stat-cell"
                whileHover={{ backgroundColor: 'var(--color-surface)' }}
                style={{
                  borderRight: i < 3 ? '1px solid var(--color-border)' : 'none',
                  transition: 'background-color 200ms ease',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-text)',
                }}>
                  {stat.num}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.75rem',
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          PRICING
      =================================================================== */}
      <section id="pricing" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ marginBottom: 'var(--space-8)', borderLeft: '1px solid var(--color-border)', paddingLeft: '2rem' }}
          >
            <span className="label" style={{ letterSpacing: '0.3em' }}>Pricing</span>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Website Packages</h2>
          </motion.div>

          {/* Desktop: 3-column grid */}
          <motion.div
            className="grid-3 pricing-desktop"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                className="card"
                variants={fadeUp}
                style={{
                  border: i === 1 ? '1px solid var(--color-brutal)' : '1px solid var(--color-border)',
                }}
              >
                {i === 1 && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px', left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--color-brutal)',
                    color: 'var(--color-brutal-text)',
                    padding: '2px 14px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}>
                    Most Popular
                  </span>
                )}

                <span className="label" style={{ fontSize: '10px' }}>{p.category}</span>
                <h3 className="card__title" style={{ fontSize: 'var(--text-2xl)', marginBottom: '1.5rem' }}>{p.name}</h3>
                <p className="card__body" style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
                  {p.description}
                </p>

                <ul style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {p.features.map((feat, fi) => (
                    <li key={fi} style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '4px', height: '4px',
                        background: i === 1 ? 'var(--color-brutal)' : 'white',
                        flexShrink: 0,
                      }} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto', paddingTop: '2.5rem', borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      Starting At
                    </span>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
                      {p.price}
                    </p>
                  </div>
                  <button
                    className={`btn ${i === 1 ? 'btn--primary' : ''}`}
                    style={{ width: '100%' }}
                    onClick={() => selectPackage(p.name)}
                    type="button"
                  >
                    {i === 0 ? 'Get Started' : i === 1 ? 'Choose This Package' : 'Request a Quote'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: horizontal card swiper */}
          <div className="pricing-swiper">
            <div
              className="pricing-swiper-track"
              ref={pricingRef}
              onScroll={handlePricingScroll}
            >
              {products.map((p, i) => (
                <div key={p.id} className="pricing-swiper-card">
                  <div
                    className="card"
                    style={{
                      border: i === 1 ? '1px solid var(--color-brutal)' : '1px solid var(--color-border)',
                    }}
                  >
                    {i === 1 && (
                      <span style={{
                        position: 'absolute',
                        top: '-12px', left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--color-brutal)',
                        color: 'var(--color-brutal-text)',
                        padding: '2px 14px',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                      }}>
                        Most Popular
                      </span>
                    )}

                    <span className="label" style={{ fontSize: '10px' }}>{p.category}</span>
                    <h3 className="card__title" style={{ fontSize: 'var(--text-2xl)', marginBottom: '1.5rem' }}>{p.name}</h3>
                    <p className="card__body" style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
                      {p.description}
                    </p>

                    <ul style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {p.features.map((feat, fi) => (
                        <li key={fi} style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '4px', height: '4px',
                            background: i === 1 ? 'var(--color-brutal)' : 'white',
                            flexShrink: 0,
                          }} />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <div style={{ marginTop: 'auto', paddingTop: '2.5rem', borderTop: '1px solid var(--color-border)' }}>
                      <div style={{ marginBottom: '2rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}>
                          Starting At
                        </span>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
                          {p.price}
                        </p>
                      </div>
                      <button
                        className={`btn ${i === 1 ? 'btn--primary' : ''}`}
                        style={{ width: '100%' }}
                        onClick={() => selectPackage(p.name)}
                        type="button"
                      >
                        {i === 0 ? 'Get Started' : i === 1 ? 'Choose This Package' : 'Request a Quote'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Swiper controls */}
            <div className="pricing-controls">
              <button
                className="btn pricing-nav-btn"
                onClick={() => scrollToCard(pricingIndex - 1)}
                disabled={pricingIndex === 0}
                aria-label="Previous plan"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="pricing-dots" role="tablist" aria-label="Pricing plans">
                {products.map((p, i) => (
                  <button
                    key={i}
                    className={`pricing-dot${i === pricingIndex ? ' pricing-dot--active' : ''}`}
                    onClick={() => scrollToCard(i)}
                    role="tab"
                    aria-selected={i === pricingIndex}
                    aria-label={p.name}
                  />
                ))}
              </div>

              <button
                className="btn pricing-nav-btn"
                onClick={() => scrollToCard(pricingIndex + 1)}
                disabled={pricingIndex === products.length - 1}
                aria-label="Next plan"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          CONTACT
      =================================================================== */}
      <section id="contact" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div className="contact-grid">
            <motion.div {...fadeUp}>
              <p style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <span style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-brutal)',
                  display: 'inline-block',
                }} />
                04 / Contact
              </p>

              <h2 style={{
                fontSize: 'var(--text-6xl)',
                marginBottom: '2.5rem',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
              }}>
                LET’S TALK.
              </h2>

              <p style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-muted)',
                marginBottom: '4rem',
                lineHeight: 1.6,
                maxWidth: '360px',
              }}>
                Tell us what you need, and we’ll get back to you with a clear plan, timeline, and package recommendation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { icon: <Mail size={16} />, label: 'Email', value: 'the.corpus.projects@gmail.com' },
                  { icon: <Box size={16} />,  label: 'Location', value: 'Hong Kong Island' },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{
                      width: '40px', height: '40px',
                      border: '1px solid var(--color-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        letterSpacing: '0.15em',
                        marginBottom: '4px',
                      }}>
                        {label}
                      </p>
                      <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              {...fadeUp}
              className="contact-form"
              onSubmit={handleContactSubmit}
            >
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="form-label">Company / Brand</label>
                <input
                  type="text"
                  name="company"
                  className="form-input"
                  placeholder="Business or Brand Name"
                  value={contactForm.company}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="form-label">Phone / WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  className="form-input"
                  placeholder="Contact Number"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="form-label">Package Type</label>
                <input
                  type="text"
                  name="packageType"
                  className="form-input"
                  placeholder="Essential, Advance, or Custom"
                  value={contactForm.packageType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="form-label">Project Brief</label>
                <textarea
                  name="projectBrief"
                  className="form-textarea"
                  placeholder="Tell us about your website or business..."
                  value={contactForm.projectBrief}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn--primary"
                style={{ alignSelf: 'stretch' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight size={16} />
              </button>
              <p
                aria-live="polite"
                style={{
                  minHeight: '1.5rem',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: submissionState.status === 'error' ? '#ff7a7a' : 'var(--color-brutal)',
                }}
              >
                {submissionState.message}
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      ` }} />
    </div>
  );
}
