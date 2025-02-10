document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.querySelector('.terminal');
  const history = document.createElement('div');
  history.className = 'terminal-history';
  terminal.prepend(history);

  const commandHistory = [];
  let historyIndex = -1;

  const inputContainer = document.createElement('div');
  inputContainer.className = 'terminal-input-container flex items-center';

  const promptSpan = document.createElement('span');
  promptSpan.innerHTML = createPrompt();
  inputContainer.appendChild(promptSpan);

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'terminal-input bg-transparent border-none outline-none text-gray-200 flex-1 ml-2';
  input.spellcheck = false;
  input.autofocus = true;
  inputContainer.appendChild(input);

  terminal.appendChild(inputContainer);

  function createPrompt() {
    return `<span class="text-green-400">➜</span> <span class="text-cyan-300">~/portfolio</span> <span style="color: #82AAFF;">git:(</span><span class="text-red-500">main</span><span style="color: #82AAFF;">)</span> `;
  }

  function createResponse(text, isCommand = false) {
    const response = document.createElement('div');
    response.className = 'mb-2 font-mono';
    if (isCommand) {
      response.innerHTML = `${createPrompt()}<span class="command">${text}</span>`;
    } else {
      response.innerHTML = `${text}`;
    }
    return response;
  }

  function appendToHistory(lines, isCommand = false) {
    if (typeof lines === 'string') lines = [lines];
    lines.forEach(line => {
      history.appendChild(createResponse(line, isCommand));
    });
  }

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const cmd = input.value;

      commandHistory.unshift(cmd);
      historyIndex = -1;

      appendToHistory(cmd, true);

      const result = command(cmd);
      
      if (result === 'clear') {
        history.innerHTML = '';
      } else {
        appendToHistory(result);
      }
      
      input.value = '';
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  input.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (commandHistory.length > 0) {
          historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
          input.value = commandHistory[historyIndex];
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > -1) {
          historyIndex--;
          input.value = historyIndex === -1 ? '' : commandHistory[historyIndex];
        }
        break;
    }
  });

  appendToHistory(commands.welcome);
});