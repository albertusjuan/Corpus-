'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Monitor, Code, Layers, Mail, Briefcase, Box, ArrowUpRight } from 'lucide-react';
import { products, portfolio } from '@/lib/data';
import RotatingGlobe from '@/components/RotatingGlobe';
import GuidingElement from '@/components/GuidingElement';

// --- Marquee content ---
const MARQUEE_ITEMS = [
  'Web Architecture', '✦', 'Motion Design', '✦',
  'Brutalist Systems', '✦', 'Custom Engineering', '✦',
  'Global Infrastructure', '✦', 'Interactive 3D', '✦',
];

// Duplicated so the CSS loop is seamless
const MARQUEE_FULL = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

// --- Stats ---
const STATS = [
  { num: '12+',  label: 'Projects Deployed' },
  { num: '100%', label: 'On-Time Delivery' },
  { num: '3',    label: 'Years Active' },
  { num: '∞',    label: 'Revisions Committed' },
];

// --- Services ---
const SERVICES = [
  { icon: <Monitor size={22} />, name: 'Business Architectures',   desc: 'Trustworthy, scalable digital storefronts for elite enterprises.' },
  { icon: <Briefcase size={22} />, name: 'Signature Portfolios',   desc: 'Minimalist environments that let your professional work take center stage.' },
  { icon: <Layers size={22} />, name: 'High-Conversion Landing',   desc: 'Surgical precision in user flow and conversion optimization.' },
  { icon: <Code size={22} />, name: 'Custom Engineering',          desc: 'Tailored technical solutions for non-standard digital requirements.' },
  { icon: <Globe size={22} />, name: 'Global Infrastructure',      desc: 'Fast, secure, and globally distributed web systems.' },
  { icon: <Box size={22} />, name: 'Interactive Systems',          desc: 'Complex interactive features and fluid user experiences.' },
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

// --- Main Page ---
export default function SinglePageWebsite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.08], [1, 0.96]);

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
                  Status: Operational
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
                We build elite digital architectures — precise, monochrome, and unapologetically functional.
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
                  Initiate Project <ArrowRight size={16} />
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
              We eliminate the noise.{' '}
              <span style={{ color: 'var(--color-text-muted)' }}>
                Absolute functional clarity for modern brands.
              </span>
            </h2>
            <p style={{
              fontSize: 'var(--text-md)',
              color: 'var(--color-text-muted)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Corpus Project builds minimal, high-performing websites — strict monochrome aesthetics,
              fluid motion, and zero tolerance for bloated page builders.
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
            <span className="label" style={{ letterSpacing: '0.3em' }}>Capabilities</span>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Engineered Solutions</h2>
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
                {/* Ghost number — brutalist index */}
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
            <span className="label" style={{ letterSpacing: '0.3em' }}>Selected Work</span>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Recent Deployments</h2>
          </motion.div>

          <motion.div
            className="grid-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {portfolio.map((item, i) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}
                whileHover="hover"
              >
                {/* Preview frame */}
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
                  {/* Spin overlay */}
                  <motion.div
                    variants={{ hover: { scale: 1.1, opacity: 0.08 } }}
                    style={{
                      position: 'absolute', width: '200%', height: '200%',
                      background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.06) 180deg, transparent 360deg)',
                      animation: 'spin 20s linear infinite',
                      opacity: 0.05,
                    }}
                  />

                  {/* Yellow hover accent bar */}
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

                  {/* CTA button overlay */}
                  <motion.div
                    variants={{
                      hover:   { opacity: 1, y: 0 },
                      initial: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.35 }}
                    style={{ zIndex: 2, position: 'absolute' }}
                  >
                    <button className="btn btn--primary" style={{ padding: '0.7rem 1.4rem', fontSize: '11px' }}>
                      View Module <ArrowUpRight size={14} />
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
                    {item.tag} // ARCHIVE
                  </span>
                </motion.div>

                {/* Meta row */}
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
            <span className="label" style={{ letterSpacing: '0.3em' }}>Acquisition</span>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Tiers of Service</h2>
          </motion.div>

          <motion.div
            className="grid-3"
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
                    Recommended
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
                  <button className={`btn ${i === 1 ? 'btn--primary' : ''}`} style={{ width: '100%' }}>
                    Select Package
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          CONTACT
      =================================================================== */}
      <section id="contact" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div className="contact-grid">
            <motion.div {...fadeUp}>
              {/* Section prefix */}
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
                INITIATE.
              </h2>

              <p style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-muted)',
                marginBottom: '4rem',
                lineHeight: 1.6,
                maxWidth: '360px',
              }}>
                Send your parameters. We review and respond within 24 hours with a precise architectural proposal.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { icon: <Mail size={16} />, label: 'Email', value: 'system@corpusproject.com' },
                  { icon: <Box size={16} />,  label: 'Location', value: 'HQ: Global Node 01' },
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

            {/* Form */}
            <motion.form
              {...fadeUp}
              className="contact-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="form-label">Name</label>
                <input type="text" className="form-input" placeholder="Your Name" />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="Email Address" />
              </div>
              <div>
                <label className="form-label">Project Brief</label>
                <textarea className="form-textarea" placeholder="Describe your objective..."></textarea>
              </div>
              <button type="submit" className="btn btn--primary" style={{ alignSelf: 'stretch' }}>
                Send Message <ArrowRight size={16} />
              </button>
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
