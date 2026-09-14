import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { SpadeMark } from '@/components/spade/SpadeMark';

export const ADD_SPADE = 'https://discord.com/oauth2/authorize?client_id=1547548274892742726&permissions=8&integration_type=0&scope=bot';
export const SUPPORT_SERVER = 'https://discord.gg/cRvZ35uhRA';
export const TOPGG_VOTE = 'https://top.gg/bot/1547548274892742726/vote';

function ExternalNavLink({ href, children, testId }: { href: string; children: ReactNode; testId: string }) {
  return <a href={href} target="_blank" rel="noreferrer" data-testid={testId}>{children}</a>;
}

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="nav-shell" data-testid="navigation-header">
      <Link href="/" className="brand" onClick={closeMenu} data-testid="link-home">
        <SpadeMark />
        <span>SPADE</span>
      </Link>
      <nav className={`nav-links ${mobileOpen ? 'open' : ''}`} aria-label="Primary navigation">
        <Link href="/" className={location === '/' ? 'active' : ''} onClick={closeMenu} data-testid="link-nav-home">Home</Link>
        <a href="/#features" onClick={closeMenu} data-testid="link-nav-features">Features</a>
        <a href="/#commands" onClick={closeMenu} data-testid="link-nav-commands">Commands <span className="nav-count">150+</span></a>
        <a href="/#faq" onClick={closeMenu} data-testid="link-nav-faq">FAQ</a>
        <Link href="/setup-guide" className={location === '/setup-guide' ? 'active' : ''} onClick={closeMenu} data-testid="link-nav-setup">Setup Guide</Link>
      </nav>
      <ExternalNavLink href={ADD_SPADE} testId="link-nav-add-desktop">
        <span className="nav-add">Add to Discord <ArrowUpRight size={14} /></span>
      </ExternalNavLink>
      <button className="mobile-toggle focus-ring" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}