// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  
  // Parallax effect for header
  const scrollPosition = window.pageYOffset;
  document.querySelector('header').style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Scroll down button
document.querySelector('.scroll-down').addEventListener('click', () => {
  window.scrollTo({
    top: document.querySelector('#about').offsetTop - 80,
    behavior: 'smooth'
  });
});

// Form submission with validation
const contactForm = document.getElementById('contactForm');

// Initialize EmailJS with your User ID
emailjs.init('JJF7QTdog0YwWfvqX');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate required fields
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (!name || !email || !message) {
    alert('Please fill in all required fields (marked with *)');
    return;
  }
  
  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Send email via EmailJS
  emailjs.sendForm('service_pq8p64l', 'template_y9np0q3', e.target)
    .then(() => {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.style.position = 'fixed';
      successMessage.style.top = '20px';
      successMessage.style.left = '50%';
      successMessage.style.transform = 'translateX(-50%)';
      successMessage.style.backgroundColor = '#4BB543';
      successMessage.style.color = 'white';
      successMessage.style.padding = '15px 30px';
      successMessage.style.borderRadius = '5px';
      successMessage.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      successMessage.style.zIndex = '1000';
      successMessage.style.display = 'flex';
      successMessage.style.alignItems = 'center';
      successMessage.style.gap = '10px';
      successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you! Your message has been sent successfully.</span>
      `;
      
      document.body.appendChild(successMessage);
      
      // Remove message after 5 seconds
      setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 500);
      }, 5000);
      
      // Reset form
      contactForm.reset();
    }, (error) => {
      console.error('EmailJS Error:', error);
      alert(`Failed to send message. Error: ${error.text || 'Unknown error'}`);
    })
    .finally(() => {
      // Restore button state
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Animation on scroll
const animateElements = document.querySelectorAll('.animate-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-up');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

animateElements.forEach(element => {
  observer.observe(element);
});
// Project Planner Steps
document.querySelectorAll('.next-step').forEach(button => {
  button.addEventListener('click', () => {
    const currentStep = document.querySelector('.planner-step.active');
    const nextStep = currentStep.nextElementSibling;
    
    currentStep.classList.remove('active');
    nextStep.classList.add('active');
  });
});

// Form Submission
document.getElementById('launch-project').addEventListener('click', () => {
  document.querySelector('.project-planner').style.display = 'none';
  document.querySelector('.confirmation').style.display = 'block';
});