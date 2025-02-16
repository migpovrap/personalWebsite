function getAutocompleteSuggestions(partial, command) {
  const current = getCurrentDirectory();
  const items = Object.keys(current);
  
  // Filter based on command type
  const filtered = items.filter(item => {
    if (command === 'cd') {
      // Only directories for cd
      return !current[item].type && item.toLowerCase().startsWith(partial.toLowerCase());
    } else if (command === 'cat') {
      // Only files for cat
      return current[item].type === 'file' && item.toLowerCase().startsWith(partial.toLowerCase());
    }
    return false;
  });
  
  return filtered;
}

function autocomplete(input) {
  const [command, partial = ''] = input.toLowerCase().trim().split(' ');
  
  if (!['cd', 'cat'].includes(command)) {
    return input;
  }
  
  const suggestions = getAutocompleteSuggestions(partial, command);
  
  if (suggestions.length === 0) {
    return input;
  } else if (suggestions.length === 1) {
    // Complete with the only suggestion
    return `${command} ${suggestions[0]}`;
  } else if (suggestions.length > 1) {
    // Show all suggestions in the terminal history
    const history = document.querySelector('.terminal-history');
    const suggestionDiv = document.createElement('div');
    suggestionDiv.className = 'mb-2 font-mono';
    suggestionDiv.innerHTML = suggestions.join('  ');
    history.appendChild(suggestionDiv);
    return input;
  }
  return input;
}

const fileSystem = {
  root: {
    projects: {
      type: 'directory'
    }
  },
  currentPath: ['root']
};

function updateFileSystem(projects) {
  fileSystem.root.projects = {};
  projects.forEach(project => {
    fileSystem.root.projects[project.name] = {
      type: 'file',
      content: [
        `Name: ${project.name}`,
        `Description: ${project.description}`,
        `Language: ${project.language}`,
        `Stars: ${project.stars}`,
        `URL: <a href="${project.url}" target="_blank" class="text-blue-500 hover:underline">${project.url}</a>`
      ]
    }
  });
}

function getCurrentDirectory() {
  let current = fileSystem;
  fileSystem.currentPath.forEach(dir => {
    current = current[dir];
  });
  return current;
}

function cd(dir) {
  if (!dir || dir === '') {
    return ['Usage: cd <directory>'];
  }

  if (dir === '..') {
    if (fileSystem.currentPath.length > 1) {
      fileSystem.currentPath.pop();
      return [`Changed to ${fileSystem.currentPath.join('/')}`];
    }
    return [''];
  }

  const current = getCurrentDirectory();
  if (current[dir]) {
    if (typeof current[dir] === 'object' && !current[dir].type) {
      fileSystem.currentPath.push(dir);
      return [`Changed to ${fileSystem.currentPath.join('/')}`];
    }
    return ['Not a directory!'];
  }
  return [`not found: ${dir}`];
}

function ls() {
  const current = getCurrentDirectory();
  const contents = Object.keys(current).map(name => {
    if (current[name].type === 'file') {
      return `<i class="fas fa-file"></i> ${name}`;
    }
    return `<i class="fas fa-folder"></i> ${name}`;
  })
  return contents.length ? contents : ['Empty directory'];
}

function cat(file) {
  if (!file || file === '') {
    return ['Usage: cat <file>'];
  }

  const current = getCurrentDirectory();
  const actualFileName = Object.keys(current).find(
    name => name.toLowerCase() === file.toLowerCase()
  );

  if (actualFileName && current[actualFileName].type === 'file') {
    return current[actualFileName].content;
  }
  return [`not found: ${file}`];
}

const commands = {
  help: [
    'Available commands:',
    'help      - Show the help mensage',
    'welcome   - Show the welcome message',
    'whois     - About me',
    'projects  - My projects mostly on github',
    'cv        - Download and view my cv',
    'clear     - Unix clear command',
    'exit      - Returns to the normal website',
    'cd        - Unix cd command',
    'ls        - Unix ls command',
    'cat       - Unix cat command'
  ],

  whois: [
    'Hey, I\'m Miguel Raposo!',
    'A rower at Clube dos Galitos.',
    'That is fascinated with tech in general.',
    'Playing with a HomeLab...',
    'A Nintendo fan'
  ],

  projects: [
    'These are some of the projects that I have developed you can view them using the cd and ls commands.',
    'So far most of them have been done for my classes at IST.'
  ],

  social: [
    'LinkedIn: https://linkedin.com/in/miguelpraposo',
    'GitHub: https://github.com/migpovrap'
  ],

  cv: [
    'Education:',
    '   - B.Sc. in Computer Science and Engineering at Instituto Superior Técnico, Universidade de Lisboa (2023-2026)',
    '   - Science and Tecnology course at Escola Secundária Homen Cristo (2020-2023)',
    '   - Certificate in Advanced English C1 (196/210).',
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
    "Hi I'm Miguel a second year computer science and engineering student at IST,",
    'Tinkering with all things technology and trying to justify a homelab!',
    'Type "help" to see available commands.'
  ]
};

function command(cmd) {
  const autocompletedCmd = autocomplete(cmd);
  if (autocompletedCmd !== cmd) {
    // Update the input field with the autocompleted command
    document.querySelector('.terminal-input').value = autocompletedCmd;
    return []; // Return empty array to not show any message
  }
  const [command, ...args] = cmd.toLowerCase().trim().split(' ');
  switch (command) {
    case 'ls':
      return ls();
    case 'cd':
      return cd(args[0]);
    case 'cat':
      return cat(args[0]);
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
    case 'exit':
      window.location.href = 'index.html';
      break;
    case 'welcome':
      return commands.welcome;
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
