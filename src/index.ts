import './styles/main.scss';

import tools from '../data/main.json';

interface Tool {
  id: number;
  name: string;
  description: string;
  image?: string;
}

// If your JSON is an array of tools
const main = document.getElementById('tool-container');
if (main) {
  (tools as Tool[]).forEach(tool => {
    const div = document.createElement('div');
    div.className = 'tool';
    div.innerHTML = `
      <h2>${tool.name}</h2>
      <p>${tool.description}</p>
      ${tool.image ? `<img src="${tool.image}" alt="${tool.name} logo" style="width:100px;">` : ''}
    `;
    main.appendChild(div);
  });
}