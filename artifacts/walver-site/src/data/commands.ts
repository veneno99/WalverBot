export type CommandCategory =
  | 'Community' | 'Welcome' | 'Verification' | 'Utility' | 'Economy'
  | 'Moderation' | 'Tools' | 'Ticket' | 'Core' | 'Fun' | 'Giveaway'
  | 'Birthday' | 'Music' | 'Join To Create' | 'Leveling' | 'Logging'
  | 'Reaction Roles' | 'Search' | 'Server Stats';

export const commandGroups: { category: CommandCategory; commands: string[] }[] = [
  { category: 'Community', commands: ['/app-admin dashboard', '/app-admin list', '/app-admin review', '/app-admin setup', '/apply list', '/apply status', '/apply submit'] },
  { category: 'Welcome', commands: ['/autorole add', '/autorole list', '/autorole remove', '/goodbye setup', '/greet dashboard', '/welcome setup'] },
  { category: 'Verification', commands: ['/autoverify dashboard', '/autoverify setup', '/verification dashboard', '/verification remove', '/verification setup', '/verify'] },
  { category: 'Utility', commands: ['/avatar', '/firstmsg', '/report file', '/report setchannel', '/serverinfo', '/todo add', '/todo complete', '/todo list', '/todo remove', '/todo share add', '/todo share addtask', '/todo share create', '/todo share remove', '/todo share view', '/userinfo', '/weather', '/wipedata'] },
  { category: 'Economy', commands: ['/balance', '/beg', '/buy', '/crime', '/daily', '/deposit', '/economy dashboard', '/eleaderboard', '/fish', '/gamble', '/inventory', '/mine', '/pay', '/rob', '/shop', '/shop-config setrole', '/slut', '/withdraw', '/work'] },
  { category: 'Moderation', commands: ['/ban', '/cases', '/dm', '/kick', '/lock', '/massban', '/masskick', '/say', '/timeout', '/unban', '/unlock', '/untimeout', '/usernotes add', '/usernotes clear', '/usernotes remove', '/usernotes view', '/warn', '/warnings'] },
  { category: 'Tools', commands: ['/baseconvert', '/calculate', '/countdown', '/embedbuilder', '/generatepassword', '/hexcolor', '/poll', '/randomuser', '/shorten', '/time', '/unixtime'] },
  { category: 'Ticket', commands: ['/claim', '/close', '/priority', '/ticket dashboard', '/ticket setup'] },
  { category: 'Core', commands: ['/commands dashboard', '/commands disable', '/commands enable', '/configwizard', '/ping', '/stats', '/support', '/uptime'] },
  { category: 'Fun', commands: ['/count disable', '/count leaderboard', '/count reset', '/count setup', '/count status', '/fight', '/flip', '/roll'] },
  { category: 'Giveaway', commands: ['/gcreate', '/gdelete', '/gend', '/greroll'] },
  { category: 'Birthday', commands: ['/birthday info', '/birthday list', '/birthday next', '/birthday remove', '/birthday set', '/birthday setchannel'] },
  { category: 'Music', commands: ['/join', '/music 247', '/music clear', '/music leave', '/music loop', '/music move', '/music pause', '/music remove', '/music resume', '/music seek', '/music shuffle', '/music skip', '/music stop', '/music volume', '/nowplaying', '/play', '/queue'] },
  { category: 'Join To Create', commands: ['/jointocreate dashboard', '/jointocreate setup'] },
  { category: 'Leveling', commands: ['/leaderboard', '/level dashboard', '/level setup', '/leveladd', '/levelremove', '/levelset', '/rank'] },
  { category: 'Logging', commands: ['/logging channel', '/logging dashboard'] },
  { category: 'Reaction Roles', commands: ['/reactroles dashboard', '/reactroles setup'] },
  { category: 'Search', commands: ['/search define', '/search google', '/search urban'] },
  { category: 'Server Stats', commands: ['/serverstats create', '/serverstats delete', '/serverstats list', '/serverstats update'] },
];

export const allCommands = commandGroups.flatMap((group) => group.commands);