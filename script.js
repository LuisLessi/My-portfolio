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

// Project Filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Selecionar todos os projetos por categoria
  const dataProjects = document.querySelectorAll('.data-project');
  const fullstackProjects = document.querySelectorAll('.fullstack-project');
  const frontendProjects = document.querySelectorAll('.frontend-project');
  const allProjects = document.querySelectorAll('.data-project, .fullstack-project, .frontend-project');
  
  // Função auxiliar para mostrar projeto
  function showProject(project) {
    // Remove o atributo style completamente para usar o padrão do Bootstrap
    project.removeAttribute('style');
  }
  
  // Função auxiliar para ocultar projeto
  function hideProject(project) {
    project.style.display = 'none';
  }
  
  // Inicializar: Mostrar apenas projetos de Data por padrão
  dataProjects.forEach(showProject);
  fullstackProjects.forEach(hideProject);
  frontendProjects.forEach(hideProject);
  
  // Ativar botão Data
  const dataBtn = document.querySelector('[data-filter="data"]');
  if (dataBtn) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    dataBtn.classList.add('active');
  }
  
  // Função para filtrar projetos
  function filterProjects(filterType) {
    if (filterType === 'all') {
      // Mostrar todos os projetos
      allProjects.forEach(showProject);
    } else if (filterType === 'data') {
      // Mostrar apenas Data, ocultar outros
      dataProjects.forEach(showProject);
      fullstackProjects.forEach(hideProject);
      frontendProjects.forEach(hideProject);
    } else if (filterType === 'fullstack') {
      // Mostrar apenas Full Stack
      fullstackProjects.forEach(showProject);
      dataProjects.forEach(hideProject);
      frontendProjects.forEach(hideProject);
    } else if (filterType === 'frontend') {
      // Mostrar apenas Front-end
      frontendProjects.forEach(showProject);
      dataProjects.forEach(hideProject);
      fullstackProjects.forEach(hideProject);
    }
    
    // Re-inicializar AOS para animar os elementos
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }
  
  // Adicionar event listeners aos botões de filtro
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover active de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adicionar active ao botão clicado
      this.classList.add('active');
      
      // Filtrar projetos
      const filterValue = this.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });
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