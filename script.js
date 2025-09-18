// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    document.querySelector('#mainNav').classList.add('navbar-solid');
  } else {
    document.querySelector('#mainNav').classList.remove('navbar-solid');
  }
});

// View Other Projects functionality - Toggle
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleOtherProjects');
  const otherProjects = document.querySelectorAll('.other-project');
  let otherProjectsVisible = false;
  
  if (toggleButton && otherProjects.length > 0) {
    toggleButton.addEventListener('click', function() {
      otherProjectsVisible = !otherProjectsVisible;
      
      if (otherProjectsVisible) {
        // Mostrar outros projetos
        otherProjects.forEach(project => {
          project.style.display = 'block';
        });
        toggleButton.textContent = 'Hide Other Projects';
        toggleButton.classList.remove('btn-primary');
        toggleButton.classList.add('btn-outline-primary');
        
        // Adicionar indicador visual
        otherProjects.forEach(project => {
          const cardBody = project.querySelector('.card-body');
          if (!cardBody.querySelector('.other-project-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'other-project-indicator mb-2';
            indicator.innerHTML = '<span class="badge bg-warning text-dark">Other Project</span>';
            cardBody.insertBefore(indicator, cardBody.firstChild);
          }
        });
      } else {
        // Ocultar outros projetos
        otherProjects.forEach(project => {
          project.style.display = 'none';
        });
        toggleButton.textContent = 'View Other Projects';
        toggleButton.classList.remove('btn-outline-primary');
        toggleButton.classList.add('btn-primary');
        
        // Remover indicadores visuais
        const indicators = document.querySelectorAll('.other-project-indicator');
        indicators.forEach(indicator => {
          indicator.remove();
        });
      }
      
      // Re-inicializar AOS para animar os novos elementos
      AOS.refresh();
    });
  }
});

// Back to top button
window.addEventListener('scroll', function() {
  const backToTop = document.querySelector('.back-to-top');
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Animate skill bars on scroll
function animateSkills() {
  const skills = document.querySelectorAll('.skill-progress');
  skills.forEach(skill => {
    const width = skill.getAttribute('data-width');
    skill.style.width = width;
  });
}

// Use Intersection Observer to trigger skill animation
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(skillsSection);
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Back to top functionality
document.querySelector('.back-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});