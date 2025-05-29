import './styles/main.scss';
import moment from 'moment';
import tools from '../data/main.json';

interface Tool {
  id: number;
  name: string;
  description: string;
  image?: string;
}

// Add current date and time to header
const header =
  document.querySelector('header') || document.createElement('header');
if (!document.querySelector('header')) {
  document.body.insertBefore(header, document.body.firstChild);
}

const dateTimeElement = document.createElement('div');
dateTimeElement.className = 'datetime-display';
dateTimeElement.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
header.appendChild(dateTimeElement);

// Add dark/light mode toggle button
const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Toggle Theme';
toggleBtn.className = 'toggle-theme-btn';
toggleBtn.style.marginLeft = '1rem';
toggleBtn.style.height = '30px';
toggleBtn.style.borderRadius = '5px';
toggleBtn.style.backgroundColor = 'transparent';
toggleBtn.style.fontWeight = 'bold';
toggleBtn.style.color = '#fff';
header.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// Set initial theme from localStorage or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

// If your JSON is an array of tools
const main = document.getElementById('tool-container');
if (main) {
  (tools as Tool[]).forEach((tool) => {
    const div = document.createElement('div');
    div.className = 'tool';
    div.innerHTML = `
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      ${tool.image ? `<img src="${tool.image}" alt="${tool.name}">` : ''}
    `;
    main.appendChild(div);
  });
}
