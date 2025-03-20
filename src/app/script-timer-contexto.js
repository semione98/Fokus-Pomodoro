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
const divTimer = document.querySelector('#timer');

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

    tempoDecorridoEmSegundos = 1500;
    mostrarTemporizador();
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

    tempoDecorridoEmSegundos = 300;
    mostrarTemporizador();
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

    tempoDecorridoEmSegundos = 900;
    mostrarTemporizador();
});

//function para formatar o temporizador e mostrar na tela.
function mostrarTemporizador() {
    const timer = new Date(tempoDecorridoEmSegundos * 1000);
    const timerFormatado = timer.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });

    divTimer.innerHTML = `${timerFormatado}`;	
}
