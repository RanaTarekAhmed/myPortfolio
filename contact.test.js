
const fs = require('fs');
const path = require('path');
const { initPortfolio } = require('./projectjs.js');

describe('Contact Form Validation', () => {
  let dom;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
    document.body.innerHTML = html;
    initPortfolio();
  });

  test('should show error when name is missing', () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    nameInput.value = '';
    emailInput.value = 'test@example.com';
    messageInput.value = 'Hello';

    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

    expect(status.textContent).toBe('All fields are required');
    expect(status.className).toContain('error');
  });

  test('should show error when email is invalid', () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    nameInput.value = 'Test User';
    emailInput.value = 'invalid-email';
    messageInput.value = 'Hello';

    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

    expect(status.textContent).toBe('Please enter a valid email address');
    expect(status.className).toContain('error');
  });
});
