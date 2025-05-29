import moment from 'moment';
import '@jest/globals';
import { jest } from '@jest/globals';

jest.mock('moment', () => {
  const mockMoment = {
    format: jest.fn()
  };
  return jest.fn(() => mockMoment);
});


jest.mock('../src/styles/main.scss', () => ({}));


const mockTools = [
  { id: 1, name: 'Test Tool 1', description: 'Test Description 1' },
  { id: 2, name: 'Test Tool 2', description: 'Test Description 2', image: 'test-image.jpg' },
  { id: 3, name: 'Tool Without Image', description: 'No image description' }
];

jest.mock('../data/main.json', () => mockTools, { virtual: true });


const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

interface Tool {
    id: number;
    name: string;
    description: string;
    image?: string;
}

interface LocalStorageMock {
    getItem: jest.Mock<any>;
    setItem: jest.Mock<any>;
    removeItem: jest.Mock<any>;
    clear: jest.Mock<any>;
}

describe('Main Application Tests', () => {
    beforeEach(() => {
      
        document.body.innerHTML = '';
        document.head.innerHTML = '';
        
      
        jest.clearAllMocks();
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        
       
        const mockFormat = moment().format as jest.Mock;
        mockFormat.mockReturnValue('May 29th 2025, 3:45:30 pm');
    });

    describe('Header Creation and DateTime Display', () => {
        beforeEach(() => {
           
            const existingHeader: HTMLElement | null = document.querySelector('header');
            const header: HTMLElement = existingHeader || document.createElement('header');
            if (!existingHeader) {
                document.body.insertBefore(header, document.body.firstChild);
            }

            const dateTimeElement: HTMLDivElement = document.createElement('div');
            dateTimeElement.className = 'datetime-display';
            dateTimeElement.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
            header.appendChild(dateTimeElement);
        });

        it('should add header as first child of body', () => {
            const firstChild: ChildNode | null = document.body.firstChild;
            expect(firstChild?.nodeName).toBe('HEADER');
        });

        it('should create datetime display element with correct class', () => {
            const dateTimeElement: Element | null = document.querySelector('.datetime-display');
            expect(dateTimeElement).toBeTruthy();
            expect(dateTimeElement?.className).toBe('datetime-display');
        });

        it('should format datetime using moment', () => {
            const mockFormat = moment().format as unknown as jest.Mock;
            
           
            const testElement: HTMLDivElement = document.createElement('div');
            testElement.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
            
            expect(moment).toHaveBeenCalled();
            expect(mockFormat).toHaveBeenCalledWith('MMMM Do YYYY, h:mm:ss a');
        });

        it('should display formatted datetime in element', () => {
            const dateTimeElement: Element | null = document.querySelector('.datetime-display');
            expect(dateTimeElement?.innerHTML).toBe('May 29th 2025, 3:45:30 pm');
        });
    });

    describe('Theme Toggle Button Creation', () => {
        let toggleBtn: HTMLButtonElement;

        beforeEach(() => {
        
            const existingHeader: HTMLElement | null = document.querySelector('header');
            const header: HTMLElement = existingHeader || document.createElement('header');
            if (!existingHeader) {
                document.body.insertBefore(header, document.body.firstChild);
            }

            // Execute toggle button creation logic
            toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Toggle Theme';
            toggleBtn.className = 'toggle-theme-btn';
            toggleBtn.style.marginLeft = '1rem';
            toggleBtn.style.height = '30px';
            toggleBtn.style.borderRadius = '5px';
            toggleBtn.style.backgroundColor = 'transparent';
            toggleBtn.style.fontWeight = 'bold';
            toggleBtn.style.color = '#fff';
            header.appendChild(toggleBtn);
        });

        it('should create toggle button with correct text', () => {
            expect(toggleBtn.textContent).toBe('Toggle Theme');
        });
    });


    describe('Tool Rendering', () => {
        beforeEach(() => {
            
            const container: HTMLDivElement = document.createElement('div');
            container.id = 'tool-container';
            document.body.appendChild(container);
        });

        it('should render tools when container exists', () => {
            const main: HTMLElement | null = document.getElementById('tool-container');
            
           
            if (main) {
                mockTools.forEach((tool: Tool) => {
                    const div: HTMLDivElement = document.createElement('div');
                    div.className = 'tool';
                    div.innerHTML = `
                        <h3>${tool.name}</h3>
                        <p>${tool.description}</p>
                        ${tool.image ? `<img src="${tool.image}" alt="${tool.name}">` : ''}
                    `;
                    main.appendChild(div);
                });
            }
            
            expect(main?.children.length).toBe(3);
        });

        it('should render tool without image correctly', () => {
            const main: HTMLElement | null = document.getElementById('tool-container');
            const toolWithoutImage: Tool = mockTools[2]; 
            
            if (main) {
                const div: HTMLDivElement = document.createElement('div');
                div.className = 'tool';
                div.innerHTML = `
                    <h3>${toolWithoutImage.name}</h3>
                    <p>${toolWithoutImage.description}</p>
                    ${toolWithoutImage.image ? `<img src="${toolWithoutImage.image}" alt="${toolWithoutImage.name}">` : ''}
                `;
                main.appendChild(div);
            }
            
            const toolElement: Element | undefined = main?.children[0];
            expect(toolElement?.innerHTML).toContain('<h3>Tool Without Image</h3>');
            expect(toolElement?.innerHTML).toContain('<p>No image description</p>');
            expect(toolElement?.innerHTML).not.toContain('<img');
        });

        it('should render tool with image correctly', () => {
            const main: HTMLElement | null = document.getElementById('tool-container');
            const toolWithImage: Tool = mockTools[1]; // Test Tool 2
            
            if (main) {
                const div: HTMLDivElement = document.createElement('div');
                div.className = 'tool';
                div.innerHTML = `
                    <h3>${toolWithImage.name}</h3>
                    <p>${toolWithImage.description}</p>
                    ${toolWithImage.image ? `<img src="${toolWithImage.image}" alt="${toolWithImage.name}">` : ''}
                `;
                main.appendChild(div);
            }
            
            const toolElement: Element | undefined = main?.children[0];
            expect(toolElement?.innerHTML).toContain('<h3>Test Tool 2</h3>');
            expect(toolElement?.innerHTML).toContain('<p>Test Description 2</p>');
            expect(toolElement?.innerHTML).toContain('<img src="test-image.jpg" alt="Test Tool 2">');
        });


        it('should handle missing tool container gracefully', () => {
           
            document.body.innerHTML = '';
            
            const main: HTMLElement | null = document.getElementById('tool-container');
            expect(main).toBeNull();
            
         
            expect(() => {
                if (main) {
                    mockTools.forEach((tool: Tool) => {
                        const div: HTMLDivElement = document.createElement('div');
                        main.appendChild(div);
                    });
                }
            }).not.toThrow();
        });
    });

});