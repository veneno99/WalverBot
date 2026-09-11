export type SetupSection = {
  id: string;
  label: string;
  kicker: string;
};

export const setupSections: SetupSection[] = [
  { id: 'getting-started', label: 'Getting Started', kicker: '01' },
  { id: 'command-syntax', label: 'Command Syntax', kicker: '02' },
  { id: 'channels', label: 'Channels', kicker: '03' },
  { id: 'reaction-roles', label: 'Reaction Roles', kicker: '04' },
  { id: 'modlogs', label: 'Modlogs', kicker: '05' },
];

export const syntaxRows = [
  { token: '<foo>', meaning: 'Mandatory argument.' },
  { token: '[foo]', meaning: 'Optional argument.' },
  { token: '[foo|bar]', meaning: 'Choice argument (pick one).' },
];

export const setupCommands = {
  channels: [
    {
      command: '/logging',
      argument: 'channel set target:<#channel>',
      description: 'Track message deletes and role edits in a channel your staff can review.',
    },
    {
      command: '/welcome',
      argument: 'set target:<#channel>',
      description: 'Send join and leave notifications to a channel of your choice.',
    },
  ],
  reactionRoles: [
    {
      command: '/reaction-role',
      argument: 'channel-create',
      description: 'Create the channel where members will choose their roles.',
    },
    {
      command: '/reaction-role',
      argument: 'create',
      description: 'Launch the interactive wizard and configure the role menu.',
    },
  ],
  modlogs: [
    {
      command: '/modlogs',
      argument: 'create',
      description: 'Automatically create a staff-only logging channel with appropriate pre-set permissions.',
    },
  ],
};