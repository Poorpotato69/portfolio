// Improved cursor trail
document.addEventListener('mousemove', (e) => {
  const cursorTrail = document.createElement('div');
  cursorTrail.classList.add('cursor-trail');
  cursorTrail.style.left = `${e.clientX}px`;
  cursorTrail.style.top = `${e.clientY}px`;
  document.body.appendChild(cursorTrail);
  
  setTimeout(() => {
    cursorTrail.style.opacity = '0';
    cursorTrail.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(0.5)';
    setTimeout(() => cursorTrail.remove(), 200);
  }, 100);
});

// Animated stats
const statsNumbers = document.querySelectorAll('.number');

function animateValue(obj, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    obj.innerText = value + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

statsNumbers.forEach(number => {
  const endValue = parseInt(number.getAttribute('data-value'));
  const suffix = number.getAttribute('data-suffix') || '';
  animateValue(number, 0, endValue, 2000, suffix);
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const animateOnScrollElements = document.querySelectorAll('.service-card, .project-card');
animateOnScrollElements.forEach(element => {
  observer.observe(element);
});

// Improved typing animation
function setupTypingAnimation() {
  const codeElement = document.querySelector('.code-snippet code');
  if (!codeElement) return;

  const originalCode = codeElement.textContent;
  codeElement.textContent = '';
  
  let i = 0;
  const speed = 20; // Lower = faster (milliseconds per character)
  
  function typeWriter() {
    if (i < originalCode.length) {
      codeElement.textContent += originalCode.charAt(i);
      codeElement.parentElement.scrollTop = codeElement.parentElement.scrollHeight;
      i++;
      setTimeout(typeWriter, speed);
      codeElement.classList.add('typing-cursor');
    } else {
      codeElement.classList.remove('typing-cursor');
    }
  }
  
  typeWriter();
}

// Run typing animation when code snippet is in view
const codeSnippet = document.querySelector('.code-snippet');
if (codeSnippet) {
  const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setupTypingAnimation();
        codeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  codeObserver.observe(codeSnippet);
}

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
