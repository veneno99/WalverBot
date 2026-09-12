import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { CrownMark } from '@/components/walver/CrownMark';
import { Navigation, ADD_WALVER, SUPPORT_SERVER } from '@/components/walver/Navigation';
import { setupCommands, setupSections, syntaxRows } from '@/data/setup-guide';

function CommandChip({ command, argument }: { command: string; argument?: string }) {
  return (
    <code className="docs-command-chip" data-testid={`chip-command-${command.replaceAll(/[^a-z0-9]+/gi, '-').toLowerCase()}`}>
      <span className="docs-command-slash">{command}</span>
      {argument && <span className="docs-command-argument"> {argument}</span>}
    </code>
  );
}

function AlertCard({ tone, title, children }: { tone: 'warning' | 'info'; title: string; children: string }) {
  return (
    <aside className={`docs-alert docs-alert-${tone}`} data-testid={`alert-${tone}`}>
      <span className="docs-alert-label">{title}</span>
      <p>{children}</p>
    </aside>
  );
}

function DocsSidebar({ mobileOpen, closeSidebar }: { mobileOpen: boolean; closeSidebar: () => void }) {
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    const sections = setupSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: [0.1, 0.4, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {mobileOpen && <button className="docs-sidebar-scrim" type="button" aria-label="Close documentation menu" onClick={closeSidebar} data-testid="button-close-sidebar-overlay" />}
      <aside className={`docs-sidebar ${mobileOpen ? 'is-open' : ''}`} aria-label="Documentation sections">
        <div className="docs-sidebar-heading">
          <span className="docs-sidebar-kicker"><BookOpen size={14} /> Documentation</span>
          <button className="docs-sidebar-close focus-ring" type="button" aria-label="Close documentation menu" onClick={closeSidebar} data-testid="button-close-sidebar"><X size={18} /></button>
        </div>
        <p className="docs-sidebar-intro">Configure Walver with a few focused commands.</p>
        <nav className="docs-toc">
          {setupSections.map((section) => (
            <a
              href={`#${section.id}`}
              className={activeSection === section.id ? 'active' : ''}
              onClick={closeSidebar}
              key={section.id}
              data-testid={`link-sidebar-${section.id}`}
            >
              <span className="docs-toc-number">{section.kicker}</span>
              <span>{section.label}</span>
              <ChevronRight size={14} />
            </a>
          ))}
        </nav>
        <div className="docs-sidebar-note">
          <span className="docs-sidebar-note-dot" />
          <span>Slash commands are ready when you are.</span>
        </div>
      </aside>
    </>
  );
}

function ConfigurationBlock({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <div className="docs-config-block">
      <div className="docs-config-heading">
        <div>
          <span className="docs-section-eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="docs-config-content">{children}</div>
    </div>
  );
}

function DocsFooter() {
  return (
    <>
      <section className="docs-cta-wrap" aria-labelledby="docs-cta-title">
        <div className="shell">
          <div className="docs-cta-panel">
            <div>
              <span className="eyebrow">Your server, your rules</span>
              <h2 id="docs-cta-title">Ready to make Walver yours?</h2>
            </div>
            <a href={ADD_WALVER} target="_blank" rel="noreferrer" className="button-primary" data-testid="link-docs-cta-add">Add Walver <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>
      <footer className="docs-footer">
        <div className="shell">
          <div className="footer-main">
            <div className="footer-brand">
              <Link href="/" className="brand" data-testid="link-docs-footer-brand"><CrownMark /><span>WALVER</span></Link>
              <p>A sharper command center for the communities that never stop moving.</p>
            </div>
            <div className="footer-col">
              <h3>Explore</h3>
              <Link href="/" data-testid="link-docs-footer-home">Home</Link>
              <Link href="/setup-guide" data-testid="link-docs-footer-setup">Setup Guide</Link>
              <Link href="/#commands" data-testid="link-docs-footer-commands">Commands</Link>
            </div>
            <div className="footer-col">
              <h3>Support</h3>
              <a href={SUPPORT_SERVER} target="_blank" rel="noreferrer" data-testid="link-docs-footer-support">Support Server</a>
              <a href={ADD_WALVER} target="_blank" rel="noreferrer" data-testid="link-docs-footer-add">Add Walver</a>
            </div>
            <div className="footer-col">
              <h3>Legal</h3>
              <Link href="/terms-of-services" data-testid="link-docs-footer-terms">Terms of Service</Link>
              <Link href="/privacy-policy" data-testid="link-docs-footer-privacy">Privacy Policy</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Walver Bot. All rights reserved.</span>
            <span className="mono">BUILT FOR THE COMMUNITY / 1547548274892742726</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function SetupGuide() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const closeSidebar = () => setMobileSidebarOpen(false);
  const scrollToStart = () => document.getElementById('getting-started')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="walver-page docs-page">
      <Navigation />
      <div className="docs-hero shell">
        <span className="eyebrow">Walver / Setup Guide</span>
        <h1>Walver Bot Documentation</h1>
        <p>A fully customizable, multi-purpose and modular Discord bot. Welcome to the documentation.</p>
        <button className="button-primary docs-start-button" type="button" onClick={scrollToStart} data-testid="button-get-started">Get Started <ArrowRight size={16} /></button>
      </div>

      <div className="docs-mobile-toolbar shell">
        <button className="docs-mobile-sidebar-toggle focus-ring" type="button" onClick={() => setMobileSidebarOpen(true)} aria-expanded={mobileSidebarOpen} data-testid="button-open-sidebar">
          <Menu size={17} /> On this page
        </button>
        <span className="mono">SETUP / 01—05</span>
      </div>

      <div className="docs-layout shell">
        <DocsSidebar mobileOpen={mobileSidebarOpen} closeSidebar={closeSidebar} />
        <article className="docs-content">
          <section className="docs-section docs-section-first" id="getting-started">
            <div className="docs-section-heading">
              <span className="docs-section-index">01</span>
              <div><span className="docs-section-eyebrow">First steps</span><h2>Getting Started</h2></div>
            </div>
            <p>Walver is built around Discord’s native command surface. Invite the bot, make sure it can see the channels you want to configure, then use a slash command to begin.</p>
            <div className="docs-steps">
              <div><span>01</span><div><strong>Invite Walver</strong><p>Add the bot with the permissions it needs for your server.</p></div></div>
              <div><span>02</span><div><strong>Open a staff channel</strong><p>Run setup commands somewhere only your team can access.</p></div></div>
              <div><span>03</span><div><strong>Choose a target</strong><p>Use a channel mention when a command asks where events should land.</p></div></div>
            </div>
            <AlertCard tone="warning" title="Warning">{"Do not literally type out < >, [ ], or | into Discord."}</AlertCard>
          </section>

          <section className="docs-section" id="command-syntax">
            <div className="docs-section-heading">
              <span className="docs-section-index">02</span>
              <div><span className="docs-section-eyebrow">Read the notation</span><h2>Command Syntax</h2></div>
            </div>
            <p>Every reference uses a small syntax vocabulary. Start with the slash, then fill in only the arguments the command asks for.</p>
            <AlertCard tone="info" title="Info">{"Walver strictly uses Discord Slash Commands (/)."}</AlertCard>
            <div className="docs-syntax-card">
              <div className="docs-syntax-example"><span className="docs-syntax-prompt">$</span><CommandChip command="/welcome" argument="set target:<#channel>" /></div>
              <table className="docs-syntax-table">
                <thead><tr><th>Notation</th><th>Meaning</th></tr></thead>
                <tbody>{syntaxRows.map((row) => <tr key={row.token}><td><code>{row.token}</code></td><td>{row.meaning}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section className="docs-section docs-config-section" id="channels">
            <div className="docs-section-heading">
              <span className="docs-section-index">03</span>
              <div><span className="docs-section-eyebrow">Basic server configuration</span><h2>Channels</h2></div>
            </div>
            <p>Give Walver a clear home for operational updates. These targets keep noisy events out of general chat and make them useful to staff.</p>
            {setupCommands.channels.map((item) => (
              <ConfigurationBlock title={item.command === '/logging' ? 'Logging target' : 'Welcome target'} eyebrow={item.command} key={item.command}>
                <CommandChip command={item.command} argument={item.argument} />
                <p>{item.description}</p>
              </ConfigurationBlock>
            ))}
          </section>

          <section className="docs-section docs-config-section" id="reaction-roles">
            <div className="docs-section-heading">
              <span className="docs-section-index">04</span>
              <div><span className="docs-section-eyebrow">Basic server configuration</span><h2>Reaction Roles</h2></div>
            </div>
            <p>Build self-serve role menus without hand-wiring every response. Reaction Roles uses an interactive wizard to guide you through setup.</p>
            {setupCommands.reactionRoles.map((item, index) => (
              <ConfigurationBlock title={index === 0 ? 'Create a role channel' : 'Launch the wizard'} eyebrow={item.command} key={item.argument}>
                <CommandChip command={item.command} argument={item.argument} />
                <p>{item.description}</p>
              </ConfigurationBlock>
            ))}
          </section>

          <section className="docs-section docs-config-section docs-section-last" id="modlogs">
            <div className="docs-section-heading">
              <span className="docs-section-index">05</span>
              <div><span className="docs-section-eyebrow">Basic server configuration</span><h2>Modlogs</h2></div>
            </div>
            <p>Keep moderation activity visible to the people who need it, without exposing internal records to the rest of your server.</p>
            {setupCommands.modlogs.map((item) => (
              <ConfigurationBlock title="Create staff logs" eyebrow={item.command} key={item.argument}>
                <CommandChip command={item.command} argument={item.argument} />
                <p>{item.description}</p>
                <div className="docs-success-note"><Check size={15} /> Staff-only by default</div>
              </ConfigurationBlock>
            ))}
          </section>
        </article>
      </div>
      <DocsFooter />
    </main>
  );
}