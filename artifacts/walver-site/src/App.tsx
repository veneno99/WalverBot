import { type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SpadeMark } from '@/components/spade/SpadeMark';
import { Navigation, ADD_SPADE, SUPPORT_SERVER, TOPGG_VOTE } from '@/components/spade/Navigation';
import { allCommands, commandGroups, type CommandCategory } from '@/data/commands';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  ChevronUp,
  Gamepad2,
  ServerCog,
  Search,
  ShieldCheck,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import SetupGuide from '@/pages/setup-guide';

const queryClient = new QueryClient();

type Feature = {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  large?: boolean;
};

const features: Feature[] = [
  { title: 'Moderation & Security', description: 'Keep a clean, safe server without leaving your command line. Cases and notes make every decision traceable.', tags: ['Ban', 'Kick', 'Timeout', 'Warn', 'Cases', 'User Notes'], icon: ShieldCheck, large: true },
  { title: 'Community & Engagement', description: 'Give people more reasons to show up, participate, and stick around.', tags: ['Leveling', 'Giveaways', 'Reaction Roles', 'Server Stats', 'Applications'], icon: Users },
  { title: 'Economy & Games', description: 'Turn idle minutes into momentum with a full server economy and mini-game loop.', tags: ['Beg', 'Daily', 'Work', 'Crime', 'Gamble', 'Shop', 'Rob'], icon: Gamepad2 },
  { title: 'Utility & Tickets', description: 'Reduce the busywork. Guide members to the right place and keep requests moving.', tags: ['Ticket System', 'To-Do Lists', 'Verification', 'Auto-roles', 'Auto-verify'], icon: Ticket },
  { title: 'Server Management', description: 'See the signal in your server. Logs, channels, stats, and configuration in one reliable layer.', tags: ['Logging', 'Welcome', 'Config Wizard', 'Server Stats'], icon: ServerCog },
];

const faqs = [
  { question: 'How many commands does Spade have?', answer: `Spade ships with ${allCommands.length}+ slash commands across moderation, utility, economy, games, and server management.` },
  { question: 'Can I use Spade alongside other bots?', answer: 'Yes. Spade is modular by design. Enable the tools your community needs and keep the rest of your stack intact.' },
  { question: 'What permissions does Spade need?', answer: 'Spade asks for the permissions required by the modules you use. The invite flow lets you review access before adding it.' },
  { question: 'Where can I get help setting up?', answer: 'Join the Spade support server for setup help, release notes, and a direct line to the people building the bot.' },
];

function ExternalLink({ href, children, className = '', testId }: { href: string; children: ReactNode; className?: string; testId: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer" data-testid={testId}>{children}</a>;
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="shell hero-layout">
        <div className="hero-copy">
          <span className="eyebrow">THE SERVER COMMAND CENTER / 01</span>
          <div className="hero-logo-wrap"><img className="hero-logo" src="/assets/spade-logo.png" alt="Spade logo" /></div>
          <h1 id="hero-title">Spade<span>.</span></h1>
          <p className="hero-tagline">The Ultimate Multi-Purpose Discord Bot</p>
          <p>One sharp toolkit for the communities that do more. 150+ commands for moderation, utility, economy, games, and server management.</p>
          <div className="hero-actions">
            <ExternalLink href={ADD_SPADE} className="button-primary" testId="link-hero-add">INVITE SPADE <ArrowRight size={16} /></ExternalLink>
            <ExternalLink href={SUPPORT_SERVER} className="button-secondary" testId="link-hero-support">JOIN SUPPORT SERVER <ArrowUpRight size={15} /></ExternalLink>
          </div>
          <div className="hero-meta" data-testid="status-bot-ready">
            <span className="status-dot" aria-hidden="true" />
            <span>ONLINE & READY</span>
            <span style={{ color: '#334155' }}>/</span>
            <span>v3.0.0</span>
            <span style={{ color: '#334155' }}>/</span>
            <span>99.98% UPTIME</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Spade command preview" data-testid="hero-command-preview">
          <div className="art-glow" />
          <div className="art-orbit" />
          <div className="hero-stat stat-commands"><strong>{allCommands.length}+</strong><span>COMMANDS</span></div>
          <div className="hero-stat stat-servers"><strong>12.4k</strong><span>SERVERS</span></div>
          <div className="hero-stat stat-users"><strong>2.1m</strong><span>USERS</span></div>
          <div className="command-window">
            <div className="window-top">
              <span className="mono">spade / command-center</span>
              <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className="window-code">
              <div className="code-line"><span className="num">01</span><span className="key">/configwizard</span></div>
              <div className="code-line"><span className="num">02</span><span className="dim">› checking server permissions...</span></div>
              <div className="code-line"><span className="num">03</span><span className="dim">› loading {allCommands.length}+ commands...</span></div>
              <div className="code-line"><span className="num">04</span><span className="value">all systems operational</span></div>
              <div className="code-line"><span className="num">05</span><span className="key">/ready</span><span className="window-caret" /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span /> SCROLL TO EXPLORE <ChevronDown size={13} /></div>
    </section>
  );
}

function Features() {
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Everything in one place</span>
          <h2 id="features-title">Less tab-switching.<br /><span className="blue-text">More community.</span></h2>
          </div>
          <p className="section-intro">A focused toolkit for the people who keep Discord servers moving. Configure once, then get back to your community.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => {
            return (
              <article className={`feature-card ${feature.large ? 'large' : ''}`} key={feature.title} data-testid={`card-feature-${index}`}>
                <div className="feature-icon"><feature.icon size={19} /></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-tags">{feature.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <span className="feature-number" aria-hidden="true">0{index + 1}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CommandDirectory() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | CommandCategory>('All');
  const categories = ['All', ...commandGroups.map((group) => group.category)] as ('All' | CommandCategory)[];
  const visibleGroups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return commandGroups
      .filter((group) => activeCategory === 'All' || group.category === activeCategory)
      .map((group) => ({ ...group, commands: group.commands.filter((command) => !needle || command.toLowerCase().includes(needle)) }))
      .filter((group) => group.commands.length > 0);
  }, [activeCategory, query]);
  const clearFilters = () => { setQuery(''); setActiveCategory('All'); };

  return (
    <section className="section directory-section" id="commands" aria-labelledby="directory-title">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Built for busy servers</span>
           <h2 id="directory-title">Find the right<br /><span className="blue-text">command fast.</span></h2>
          </div>
           <p className="section-intro">Browse the complete Spade command set. Search by intent or filter by the part of your server you want to improve.</p>
        </div>
        <div className="directory-toolbar">
          <label className="search-box" htmlFor="command-search">
            <Search size={16} aria-hidden="true" />
            <input id="command-search" type="search" placeholder="Search commands..." value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-command-search" />
          </label>
          {(query || activeCategory !== 'All') && <button className="clear-button focus-ring" type="button" onClick={clearFilters} data-testid="button-clear-filters">Clear filters</button>}
        </div>
        <div className="filter-row" aria-label="Command categories">
          {categories.map((category) => (
            <button key={category} className={`filter-button focus-ring ${activeCategory === category ? 'active' : ''}`} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} data-testid={`button-filter-${category.toLowerCase().replaceAll(' ', '-')}`}>
              {category}
            </button>
          ))}
        </div>
        <div className="directory-layout">
          <aside className="directory-aside" aria-label="Command directory summary">
            <div>
              <p>Directory</p>
              <div className="directory-stat"><strong>{allCommands.length}</strong><span>commands ready</span></div>
            </div>
            <div className="directory-stat"><strong>{commandGroups.length}</strong><span>categories</span></div>
          </aside>
          <div className="command-groups" aria-live="polite">
            {visibleGroups.length ? visibleGroups.map((group) => (
              <article className="command-group" key={group.category} data-testid={`group-commands-${group.category.toLowerCase().replaceAll(' ', '-')}`}>
                <header className="command-group-header">
                  <h3>{group.category}</h3>
                  <span className="command-count">{group.commands.length.toString().padStart(2, '0')} COMMANDS</span>
                </header>
                <div className="command-list">
                  {group.commands.map((command) => <code className="command-chip" key={command} data-testid={`command-${command.replaceAll(/[^a-z0-9]+/gi, '-').toLowerCase()}`}>{command}</code>)}
                </div>
              </article>
            )) : (
              <div className="empty-directory" data-testid="empty-command-results">
                 <CircleHelp size={22} className="blue-text" />
                <strong>No commands match that search.</strong>
                <span>Try a shorter phrase or clear the current filters.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="shell faq-layout">
        <div>
          <span className="eyebrow">Questions, answered</span>
          <h2 id="faq-title">Built to be<br /><span className="blue-text">straightforward.</span></h2>
          <p className="section-intro">No maze of documentation before your first useful command. Add Spade, run the wizard, and make it yours.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={faq.question}>
                <button type="button" className="faq-question focus-ring" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : index)} data-testid={`button-faq-${index}`}>
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                </button>
                {isOpen && <p className="faq-answer">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <>
      <section className="cta-wrap" id="support" aria-labelledby="cta-title">
        <div className="shell">
          <div className="cta-panel">
            <div>
              <span className="eyebrow">Make your server your own</span>
             <h2 id="cta-title">Your server has a lot to do.</h2>
            </div>
             <ExternalLink href={ADD_SPADE} className="button-primary" testId="link-footer-add">Add Spade <ArrowUpRight size={16} /></ExternalLink>
          </div>
        </div>
      </section>
      <footer id="legal">
        <div className="shell">
          <div className="footer-main">
            <div className="footer-brand">
               <a href="#home" className="brand" data-testid="link-footer-brand"><SpadeMark /><span>SPADE</span></a>
               <p>A sharper command center for the communities that never stop moving.</p>
            </div>
            <div className="footer-col">
              <h3>Quick Links</h3>
              <Link href="/" data-testid="link-footer-home">Home</Link>
              <Link href="/setup-guide" data-testid="link-footer-setup">Setup Guide</Link>
              <Link href="/?section=commands#commands" data-testid="link-footer-commands">Commands</Link>
            </div>
            <div className="footer-col">
              <h3>Support</h3>
              <ExternalLink href={SUPPORT_SERVER} testId="link-footer-support">Support Server</ExternalLink>
               <ExternalLink href={ADD_SPADE} testId="link-footer-add-spade">Add Spade</ExternalLink>
               <ExternalLink href={TOPGG_VOTE} testId="link-footer-vote">Vote on Top.gg</ExternalLink>
            </div>
            <div className="footer-col">
              <h3>Legal</h3>
              <a
                 href="https://spade.bot/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-terms"
              >
                Terms of Service
              </a>
              <a
                 href="https://spade.bot/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-privacy"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="footer-bottom">
             <span>© 2026 Spade Bot. All rights reserved.</span>
             <span className="mono">BUILT FOR THE COMMUNITY / SPADE-01</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function Home() {
  return (
    <main className="spade-page">
      <Navigation />
      <Hero />
      <Features />
      <CommandDirectory />
      <FAQ />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/setup-guide" component={SetupGuide} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;