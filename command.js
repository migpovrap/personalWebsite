const commands = {
  help : [
    'Available commands:',
    'help      - Show the help mensage',
    'whois     - About me',
    'projects  - My projects mostly on github',
    'cv        - Download and view my cv',
    'clear     - Unix clear command',
    'gui       - A simpler version',
    'cd        - Unix cd command',
    'ls        - Unix ls command'
  ],

  whois: [
    'Hey, I\'m Miguel Raposo!',
    'A rower at Clube dos Galitos.',
    'That is fascinated with tech in general.',
    'Playing with a HomeLab...',
    'A Nintendo fan'
  ],

  projects: [
    'These are some of the projects that I have developed:',
    'So far most of them have been done for my classes at IST.'
  ],

  social: [
    'LinkedIn: https://linkedin.com/in/',
    'GitHub: https://github.com/migpovrap'
  ],

  cv: [
    'Education:',
    '   - B.Sc. in Computer Science and Engineering at Instituto Superior Técnico, Universidade de Lisboa (2023-2026)',
    '   - Science and Tecnology course at Escola Secundária Homen Cristo (2020-2023)',
    '   ',
    'Volunteering:',
    '   - Registration Team Member at WebSummit Lisbon 2024',
    'Experience:',
    '   - Rowing Summer Camp coach, Responsible for supervising and coaching kids during their',
    '                               morning rowing practice, helping them develop their skills,',
    '                               stay safe, and most importantly, have fun.',
    '                               In July to August of 2023 anf 2024.'
  ],

  welcome: [
    'Welcome message (Place Holder)',
    'Type "help" to see available commands.'
  ]
};

function command(cmd) {
  cmd = cmd.toLowerCase().trim();
  switch (cmd) {
    case 'clear':
      return 'clear';
    case 'help':
      return commands.help;
    case 'whois':
      return commands.whois;
    case 'projects':
      return commands.projects;
    case 'social':
      return commands.social;
    case 'cv':
      return commands.cv;
    case 'gui':
      window.location.href = 'main.html';
    default:
      return commandNotFound(cmd);
  }
}

function commandNotFound(cmd) {
  if (commands[cmd]) { //If not present in enum commands will retrun a falsely value in js.
    return commands[cmd];
  } else {
    return [`Command not found: ${cmd}`, 'Type "help" for available commands'];
  }
}
