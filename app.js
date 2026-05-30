

document.addEventListener('DOMContentLoaded', () => {

// Mobile Menu Logica
const menuOpenBtn = document.getElementById('menu-open');
const menuCloseBtn = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
if (mobileMenu.classList.contains('hidden-menu')) {
mobileMenu.classList.remove('hidden-menu');
mobileMenu.classList.add('active-menu');
document.body.style.overflow = 'hidden'; 
} else {
mobileMenu.classList.add('hidden-menu');
mobileMenu.classList.remove('active-menu');
document.body.style.overflow = ''; 
}
}

if (menuOpenBtn) menuOpenBtn.addEventListener('click', toggleMenu);
if (menuCloseBtn) menuCloseBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
link.addEventListener('click', () => {
mobileMenu.classList.add('hidden-menu');
mobileMenu.classList.remove('active-menu');
document.body.style.overflow = '';
});
});



// Lógica do Carrossel
const track = document.getElementById('carousel-track');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const dotsContainer = document.getElementById('carousel-dots');
const cards = Array.from(track.children);

let currentIndex = 0;
let cardsToShow = window.innerWidth >= 1024 ? 2 : 1;

function updateCarousel() {
cardsToShow = window.innerWidth >= 1024 ? 2 : 1;
const maxIndex = cards.length - cardsToShow;
if (currentIndex > maxIndex) currentIndex = maxIndex;
if (currentIndex < 0) currentIndex = 0;

const percentage = -(currentIndex * (100 / cardsToShow));
track.style.transform = `translateX(${percentage}%)`;

updateDots();
}

function setupDots() {
dotsContainer.innerHTML = '';
const maxIndex = cards.length - cardsToShow + 1;
for (let i = 0; i < maxIndex; i++) {
const dot = document.createElement('button');
dot.className = 'carousel-dot w-2 h-2 rounded-full bg-outline-variant transition-all duration-300';
dot.addEventListener('click', () => {
currentIndex = i;
updateCarousel();
});
dotsContainer.appendChild(dot);
}
updateDots();
}

function updateDots() {
const dots = Array.from(dotsContainer.children);
dots.forEach((dot, index) => {
if (index === currentIndex) {
dot.classList.add('active');
} else {
dot.classList.remove('active');
}
});
}

nextBtn.addEventListener('click', () => {
const maxIndex = cards.length - cardsToShow;
if (currentIndex < maxIndex) {
currentIndex++;
} else {
currentIndex = 0; 
}
updateCarousel();
});

prevBtn.addEventListener('click', () => {
if (currentIndex > 0) {
currentIndex--;
} else {
currentIndex = cards.length - cardsToShow;
}
updateCarousel();
});

window.addEventListener('resize', () => {
const oldCardsToShow = cardsToShow;
cardsToShow = window.innerWidth >= 1024 ? 2 : 1;
if (oldCardsToShow !== cardsToShow) {
currentIndex = 0;
setupDots();
}
updateCarousel();
});

setupDots();
updateCarousel();

// ... Código do carrossel aqui ...



// --- Swipe no mobile ---
let startX = 0;
let endX = 0;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const deltaX = endX - startX;
  const threshold = 50; // mínimo de pixels para considerar swipe

  if (deltaX > threshold) {
    // swipe para direita → voltar
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  } else if (deltaX < -threshold) {
    // swipe para esquerda → avançar
    const maxIndex = cards.length - cardsToShow;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  }
}


// Lógica dinâmica do modal do curso
const courseModal = document.getElementById('course-modal');
const saibaMaisBtns = document.querySelectorAll('.btn-saiba-mais');
const modalTitulo = document.getElementById('modal-titulo');
const modalHoras = document.getElementById('modal-horas');
const modalM1 = document.getElementById('modal-m1');
const modalM2 = document.getElementById('modal-m2');
const modalM3 = document.getElementById('modal-m3');
const modalM4 = document.getElementById('modal-m4');
const closeModalX = document.getElementById('close-modal-btn');
const closeModalBtn = document.getElementById('footer-close-btn');

saibaMaisBtns.forEach(btn => {
btn.addEventListener('click', (e) => {
e.preventDefault();

// Get data from attributes
const titulo = btn.getAttribute('data-titulo');
const horas = btn.getAttribute('data-horas');
const m1 = btn.getAttribute('data-m1');
const m2 = btn.getAttribute('data-m2');
const m3 = btn.getAttribute('data-m3');
const m4 = btn.getAttribute('data-m4');

// Update modal content
modalTitulo.textContent = titulo;
modalHoras.textContent = `Carga Horária: ${horas}`;
modalM1.textContent = `Módulo 1: ${m1}`;
modalM2.textContent = `Módulo 2: ${m2}`;
modalM3.textContent = `Módulo 3: ${m3}`;
modalM4.textContent = `Módulo 4: ${m4}`;

// Show modal
courseModal.classList.remove('hidden');
courseModal.classList.add('is-open');
document.body.style.overflow = 'hidden';
});
});

const hideModal = () => {
  courseModal.classList.add('hidden');
  courseModal.classList.remove('is-open');
  document.body.style.overflow = '';
};


if (closeModalX) closeModalX.addEventListener('click', hideModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);

if (courseModal) {
courseModal.addEventListener('click', (e) => {
if (e.target === courseModal) {
hideModal();
}
});
}
});


//Lógica Cookies

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("cookie-popup");
  const acceptBtn = document.getElementById("accept-btn");
  const rejectBtn = document.getElementById("reject-btn");

  // Verifica se já existe escolha
  if (localStorage.getItem("cookieConsent")) {
    popup.style.display = "none";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    popup.style.display = "none";
    // Aqui você pode carregar scripts de cookies opcionais
  });

  rejectBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "rejected");
    popup.style.display = "none";
    // Aqui você bloqueia ou não carrega scripts opcionais
  });
});


//Lógica do formulário de contato

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nomeInput = document.getElementById("campo_nome");
  const emailInput = document.getElementById("campo_email");
  const submitBtn = document.getElementById("btn_formulario");


  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();


  if(nomeInput.value ==="" || emailInput.value ==""){
    alert("Por favor, preencha todos os campos antes de enviar.");
  }

    if (nomeInput.value && emailInput.value) {
      // Aqui você pode adicionar a lógica para enviar o formulário
      nomeInput.value = "";
      emailInput.value = "";
      alert("Formulário enviado!");
    }
  });
});