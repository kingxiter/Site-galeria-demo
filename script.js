

// Menu responsivo
const menuBtn = document.querySelector(".menu-btn");  
const navigation = document.querySelector(".navigation");  

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

// Navegação do Slider
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");

const sliderNav = (manual) => {
  btns.forEach((btn) => btn.classList.remove("active"));
  slides.forEach((slide) => slide.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  btns[manual].classList.add("active");
  slides[manual].classList.add("active");
  contents[manual].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => sliderNav(i));
});

// Inicializando o mapa
var map = L.map('map').setView([0, 0], 2); // Define a posição inicial do mapa (centro do mundo) e o zoom

// Adicionando a camada de mapa (openstreetmap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adicionando marcador de exemplo no centro do mundo
L.marker([0, 0]).addTo(map)
  .bindPopup("<b>Centro do Mundo</b><br>Onde tudo começa!")
  .openPopup();

  let currentIndex = 0;
const videoSlides = document.querySelectorAll('.video-slide');

// Função para mudar para o próximo vídeo
const nextSlide = () => {
videoSlides[currentIndex].classList.remove('active');  // Remove a classe active do vídeo atual
currentIndex = (currentIndex + 1) % videoSlides.length;  // Vai para o próximo vídeo e retorna ao primeiro após o último
videoSlides[currentIndex].classList.add('active');  // Adiciona a classe active ao próximo vídeo
};

// Chama a função nextSlide a cada 5 segundos (5000 ms)
setInterval(nextSlide, 5000);

// Inicializa o primeiro vídeo como ativo
videoSlides[currentIndex].classList.add('active');

let index = 0;

function moveSlide(step) {
const slides = document.querySelectorAll('.carousel-images img');
index += step;

// Garantir que o índice não ultrapasse os limites
if (index < 0) {
index = slides.length - 1;
} else if (index >= slides.length) {
index = 0;
}

// Mover as imagens para o índice correto
const newTransformValue = `translateX(-${index * 100}%)`;
document.querySelector('.carousel-images').style.transform = newTransformValue;
}

// Inicializa o carrossel
setInterval(() => moveSlide(1), 5000);  // Troca de imagem automática a cada 5 segundos



// Verificar se já existe uma data final salva no localStorage
let prazoFinal = localStorage.getItem("prazoFinal");

if (!prazoFinal) {
  // Caso não exista, definir o prazo para 30 dias a partir de agora e salvar no localStorage
  prazoFinal = new Date();
  prazoFinal.setDate(prazoFinal.getDate() + 30); // Alterado para 30 dias
  localStorage.setItem("prazoFinal", prazoFinal);
} else {
  // Converter a string salva no localStorage de volta para um objeto Date
  prazoFinal = new Date(prazoFinal);
}

function atualizarContagemRegressiva() {
  const agora = new Date().getTime();
  const diferenca = prazoFinal - agora;

  if (diferenca > 0) {
    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("contador").innerHTML = 
      `${horas} horas, ${minutos} minutos, ${segundos} segundos restantes`;
  } else {
    document.getElementById("contador").innerHTML = "A contagem regressiva terminou!";
    clearInterval(intervalo);
    localStorage.removeItem("prazoFinal"); // Remover o prazo final quando terminar
  }
}

// Atualizar a cada segundo
const intervalo = setInterval(atualizarContagemRegressiva, 1000);

// Inicializar a contagem assim que a página carregar
atualizarContagemRegressiva();

