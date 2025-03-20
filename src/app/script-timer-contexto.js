const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoesTipoTimer = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const startPauseSpan = document.querySelector('#start-pause span');
const startPauseImg = document.querySelector('#start-pause img');
const divTiemr = document.querySelector('#timer');

const musicaCheckbox = document.querySelector('#alternar-musica');
const musica = new Audio('/assets/sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaCheckbox.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});


//lister no botão de foco para alternar contexto html e temporizador
focoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
    focoBtn.classList.add('active');
    curtoBtn.classList.remove('active');
    longBtn.classList.remove('active');
    titulo.innerHTML = `<h1 class="app__title">
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>
            `;
    banner.src = 'assets/imagens/foco.png';
});

//lister no botão de curto para alternar contexto html e temporizador
curtoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
    focoBtn.classList.remove('active');
    curtoBtn.classList.add('active');
    longBtn.classList.remove('active');
    titulo.innerHTML = `<h1 class="app__title">
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>
            
            `;
    banner.src = 'assets/imagens/descanso-curto.png';
});

//lister no botão de longo para alternar contexto html e temporizador
longBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
    focoBtn.classList.remove('active');
    curtoBtn.classList.remove('active');
    longBtn.classList.add('active');
    titulo.innerHTML = `<h1 class="app__title">
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>
            `;  
    banner.src = 'assets/imagens/descanso-longo.png';
});
