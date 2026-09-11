import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { CrownMark } from '@/components/walver/CrownMark';

export const ADD_WALVER = 'https://discord.com/oauth2/authorize?client_id=1547548274892742726&permissions=8&integration_type=0&scope=bot';
export const SUPPORT_SERVER = 'https://discord.gg/cRvZ35uhRA';

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
        <CrownMark />
        <span>WALVER</span>
      </Link>
      <nav className={`nav-links ${mobileOpen ? 'open' : ''}`} aria-label="Primary navigation">
        <Link href="/" className={location === '/' ? 'active' : ''} onClick={closeMenu} data-testid="link-nav-home">Home</Link>
        <Link href="/setup-guide" className={location === '/setup-guide' ? 'active' : ''} onClick={closeMenu} data-testid="link-nav-setup">Setup Guide</Link>
        <ExternalNavLink href={SUPPORT_SERVER} testId="link-nav-support">Support</ExternalNavLink>
        <ExternalNavLink href={ADD_WALVER} testId="link-nav-add">Add Walver</ExternalNavLink>
      </nav>
      <ExternalNavLink href={ADD_WALVER} testId="link-nav-add-desktop">
        <span className="nav-add">Add Walver <ArrowUpRight size={14} /></span>
      </ExternalNavLink>
      <button className="mobile-toggle focus-ring" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}