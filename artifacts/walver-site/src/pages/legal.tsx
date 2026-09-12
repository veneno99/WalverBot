import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { CrownMark } from '@/components/walver/CrownMark';
import { ADD_WALVER, Navigation, SUPPORT_SERVER } from '@/components/walver/Navigation';

type LegalSection = {
  title: string;
  paragraphs: string[];
};

const privacySections: LegalSection[] = [
  {
    title: 'Information Walver receives',
    paragraphs: [
      'Walver may process the Discord server, channel, role, user, and message metadata needed to deliver the commands and configuration features you enable. Walver does not ask you to provide a password or payment information.',
      'Some commands may create server configuration records, moderation notes, logs, tickets, or economy activity. The information available to Walver depends on the permissions and commands your server administrators choose to use.',
    ],
  },
  {
    title: 'How information is used',
    paragraphs: [
      'Information is used to operate Walver, respond to commands, maintain requested server settings, provide moderation and utility features, and keep the bot secure and reliable.',
      'Walver does not sell personal information. Access to server data is limited to what is needed to provide the feature that requested it and to maintain the service.',
    ],
  },
  {
    title: 'Retention and deletion',
    paragraphs: [
      'Configuration and feature data is retained only while it is needed to operate the relevant Walver feature. Server administrators can use the available cleanup commands, including /wipedata where applicable, or request help through the Support Server.',
      'Removing Walver from a server stops new command activity. Some records may remain briefly in backups or security logs before they are automatically removed in the normal course of operations.',
    ],
  },
  {
    title: 'Your choices',
    paragraphs: [
      'Server administrators control whether Walver is added, which permissions it receives, and which configuration commands are enabled. Members can contact the server team or use the Support Server for questions about a Walver feature.',
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    title: 'Using Walver',
    paragraphs: [
      'Walver is a Discord bot that provides moderation, utility, economy, community, music, and entertainment features. By adding or using Walver, you agree to use it lawfully and follow Discord’s rules and the rules of the server where it is installed.',
      'Server administrators are responsible for selecting appropriate permissions, configuring destinations for logs and notifications, and making sure their community understands the tools that are enabled.',
    ],
  },
  {
    title: 'Acceptable use',
    paragraphs: [
      'Do not use Walver to harass, abuse, impersonate, spam, distribute malicious content, evade moderation, or interfere with Discord or another user’s access to a server. Do not attempt to disrupt, reverse engineer, or gain unauthorized access to the service.',
    ],
  },
  {
    title: 'Availability and changes',
    paragraphs: [
      'Walver is provided as-is and may change as features are improved, repaired, or retired. Availability can be affected by Discord, hosting providers, maintenance, or events outside Walver’s control.',
      'We may update these terms when the service changes. Continued use of Walver after an update means you accept the revised terms.',
    ],
  },
  {
    title: 'Responsibility',
    paragraphs: [
      'Walver is a tool for server management, not a replacement for human judgment. Server owners and moderators remain responsible for their decisions, configurations, community rules, and compliance with applicable policies.',
    ],
  },
];

function LegalFooter() {
  return (
    <footer className="legal-footer">
      <div className="shell">
        <div className="legal-footer-main">
          <Link href="/" className="brand" data-testid="link-legal-footer-brand">
            <CrownMark />
            <span>WALVER</span>
          </Link>
          <div className="legal-footer-links">
            <Link href="/" data-testid="link-legal-footer-home">Home</Link>
            <Link href="/setup-guide" data-testid="link-legal-footer-setup">Setup Guide</Link>
            <Link href="/?section=commands#commands" data-testid="link-legal-footer-commands">Commands</Link>
            <Link href="/terms-of-services" data-testid="link-legal-footer-terms">Terms of Service</Link>
            <Link href="/privacy-policy" data-testid="link-legal-footer-privacy">Privacy Policy</Link>
          </div>
        </div>
        <div className="legal-footer-bottom">
          <span>© 2026 Walver Bot. All rights reserved.</span>
          <a href={SUPPORT_SERVER} target="_blank" rel="noreferrer">Support Server <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </footer>
  );
}

function LegalPage({ title, eyebrow, intro, sections, testId }: { title: string; eyebrow: string; intro: string; sections: LegalSection[]; testId: string }) {
  return (
    <main className="walver-page legal-page" data-testid={testId}>
      <Navigation />
      <header className="legal-hero shell">
        <Link href="/" className="legal-back-link" data-testid="link-legal-back">
          <ArrowLeft size={14} /> Back to Walver
        </Link>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <article className="legal-content shell">
        <div className="legal-meta">
          <span className="mono">WALVER BOT</span>
          <span>Last updated September 11, 2026</span>
        </div>
        {sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <div className="legal-contact">
          <div>
            <span className="eyebrow">Need help?</span>
            <h2>Questions about Walver?</h2>
          </div>
          <a href={SUPPORT_SERVER} target="_blank" rel="noreferrer" className="button-secondary" data-testid="link-legal-support">
            Visit Support Server <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="legal-add">
          <span>Ready to configure your server?</span>
          <a href={ADD_WALVER} target="_blank" rel="noreferrer" className="button-primary" data-testid="link-legal-add">
            Add Walver <ArrowUpRight size={15} />
          </a>
        </div>
      </article>
      <LegalFooter />
    </main>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      eyebrow="Walver / Privacy"
      intro="A clear overview of the information Walver may process to provide Discord bot features."
      sections={privacySections}
      testId="page-privacy-policy"
    />
  );
}

export function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      eyebrow="Walver / Terms"
      intro="The rules for adding and using Walver Bot in your Discord community."
      sections={termsSections}
      testId="page-terms-of-service"
    />
  );
}