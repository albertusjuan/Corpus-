'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="page-wrapper" style={{ padding: '3rem 0', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '2rem', letterSpacing: '0.2em', fontWeight: 900 }}>CORPUS</h2>
        <p style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '10px', color: 'var(--color-text-muted)' }}>
          © {new Date().getFullYear()} Corpus Project. All Systems Nominal.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
           {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
             <a key={social} href="#" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>{social}</a>
           ))}
        </div>
      </div>
    </footer>
  );
}
