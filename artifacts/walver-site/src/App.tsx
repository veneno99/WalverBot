import { type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CrownMark } from '@/components/walver/CrownMark';
import { Navigation, ADD_WALVER, SUPPORT_SERVER } from '@/components/walver/Navigation';
import { allCommands, commandGroups, type CommandCategory } from '@/data/commands';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  Gamepad2,
  Music2,
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
  { title: 'Music & Fun', description: 'Keep the atmosphere alive with shared listening, polls, and quick-hit commands.', tags: ['Play', 'Queue', 'Polls', 'Search'], icon: Music2 },
];

function ExternalLink({ href, children, className = '', testId }: { href: string; children: ReactNode; className?: string; testId: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer" data-testid={testId}>{children}</a>;
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="shell hero-layout">
        <div className="hero-copy">
          <span className="eyebrow">The server command center</span>
          <h1 id="hero-title">WAL<span>VER</span><sup style={{ color: '#735044', fontSize: '.2em', verticalAlign: 'top', letterSpacing: 0 }}>01</sup></h1>
          <p>The all-in-one powerhouse for your server! Featuring Moderation, Economy, Mini-games, Tickets, Music, and Utility tools.</p>
          <div className="hero-actions">
            <ExternalLink href={ADD_WALVER} className="button-primary" testId="link-hero-add">ADD WALVER <ArrowRight size={16} /></ExternalLink>
            <ExternalLink href={SUPPORT_SERVER} className="button-secondary" testId="link-hero-support">SUPPORT SERVER <ArrowUpRight size={15} /></ExternalLink>
          </div>
          <div className="hero-meta" data-testid="status-bot-ready">
            <span className="status-dot" aria-hidden="true" />
            <span>READY FOR YOUR NEXT COMMAND</span>
            <span style={{ color: '#4b413c' }}>/</span>
            <span>v2.6.0</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Walver command preview" data-testid="hero-command-preview">
          <div className="art-glow" />
          <div className="art-orbit" />
          <div className="command-window">
            <div className="window-top">
              <span className="mono">walver / command-center</span>
              <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className="window-code">
              <div className="code-line"><span className="num">01</span><span className="key">/configwizard</span></div>
              <div className="code-line"><span className="num">02</span><span className="dim">› checking server permissions...</span></div>
              <div className="code-line"><span className="num">03</span><span className="dim">› loading {allCommands.length} commands...</span></div>
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
            <h2 id="features-title">Less tab-switching.<br /><span className="orange-text">More community.</span></h2>
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
            <h2 id="directory-title">Find the right<br /><span className="orange-text">command fast.</span></h2>
          </div>
          <p className="section-intro">Browse the complete Walver command set. Search by intent or filter by the part of your server you want to improve.</p>
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
                <CircleHelp size={22} className="orange-text" />
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

function Footer() {
  return (
    <>
      <section className="cta-wrap" id="support" aria-labelledby="cta-title">
        <div className="shell">
          <div className="cta-panel">
            <div>
              <span className="eyebrow">Make your server your own</span>
              <h2 id="cta-title">Ready to power up your Discord community?</h2>
            </div>
            <ExternalLink href={ADD_WALVER} className="button-primary" testId="link-footer-add">Add Bot <ArrowUpRight size={16} /></ExternalLink>
          </div>
        </div>
      </section>
      <footer id="legal">
        <div className="shell">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#home" className="brand" data-testid="link-footer-brand"><CrownMark /><span>WALVER</span></a>
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
              <ExternalLink href={ADD_WALVER} testId="link-footer-add-walver">Add Walver</ExternalLink>
            </div>
            <div className="footer-col">
              <h3>Legal</h3>
              <a
                href="https://walver.vercel.app/terms-of-services"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-terms"
              >
                Terms of Service
              </a>
              <a
                href="https://walver.vercel.app/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-privacy"
              >
                Privacy Policy
              </a>
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

function Home() {
  return (
    <main className="walver-page">
      <Navigation />
      <Hero />
      <Features />
      <CommandDirectory />
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