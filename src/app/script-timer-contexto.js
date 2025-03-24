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
const refreshTimerBtn = document.querySelector('#refresh-timer');
const divTimer = document.querySelector('#timer');

const musicaCheckbox = document.querySelector('#alternar-musica');
const musica = new Audio('/assets/sons/luna-rise-part-one.mp3');
musica.loop = true;

const musicaPause = new Audio('/assets/sons/pause.mp3');
const musicaPlay = new Audio('/assets/sons/play.wav');
const musicaAlertFinalizado = new Audio('/assets/sons/beep.mp3');

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
    alternarContexto('foco');

    tempoDecorridoEmSegundos = 1500;
    mostrarTemporizador();
    clearInterval(intervaloId);
});

//lister no botão de curto para alternar contexto html e temporizador
curtoBtn.addEventListener('click', () => {
    alternarContexto('descanso-curto');

    tempoDecorridoEmSegundos = 300;
    mostrarTemporizador();
    clearInterval(intervaloId);
});

//lister no botão de longo para alternar contexto html e temporizador
longBtn.addEventListener('click', () => {
    alternarContexto('descanso-longo');

    tempoDecorridoEmSegundos = 900;
    mostrarTemporizador();
    clearInterval(intervaloId);
});

//function para alternar contexto com reaproveitamento.
function alternarContexto(contexto){
    botoesTipoTimer.forEach(botao => {
        botao.classList.remove('active');
    })

    switch(contexto){
        case 'foco':
            focoBtn.classList.add('active');
            html.setAttribute('data-contexto', 'foco');
            banner.src = 'assets/imagens/foco.png';

            titulo.innerHTML = `<h1 class="app__title">
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>
            `;
            break;
        case 'descanso-curto':
            curtoBtn.classList.add('active');
            html.setAttribute('data-contexto', 'descanso-curto');
            banner.src = 'assets/imagens/descanso-curto.png';

            titulo.innerHTML = `<h1 class="app__title">
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta .</strong>
            </h1>
            `;
            break;
        case 'descanso-longo':
            longBtn.classList.add('active');
            html.setAttribute('data-contexto', 'descanso-longo');
            banner.src = 'assets/imagens/descanso-longo.png';

            titulo.innerHTML = `<h1 class="app__title">
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            </h1>
            `;
            break;
    }
}

//function para formatar o temporizador e mostrar na tela.
function mostrarTemporizador() {
    const timer = new Date(tempoDecorridoEmSegundos * 1000);
    const timerFormatado = timer.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });

    divTimer.innerHTML = `${timerFormatado}`;	
};

function startTimer(){
    if(intervaloId){

        musicaPause.play();
        clearInterval(intervaloId);
        intervaloId = null;
        startPauseSpan.textContent = 'Começar';
        startPauseImg.src = 'assets/imagens/play_arrow.png';

    }else{

        musicaPlay.play();
        intervaloId = setInterval(()=>{
            if(tempoDecorridoEmSegundos<=0){
                musicaAlertFinalizado.play();
                alert('Tempo finalizado');
                clearInterval(intervaloId);
                intervaloId = null;
                
                return
            }
            tempoDecorridoEmSegundos--;
            mostrarTemporizador();
        },1000);

        startPauseSpan.textContent = 'Pausar';
        startPauseImg.src = 'assets/imagens/pause.png';

    }
};

mostrarTemporizador();

startPauseBtn.addEventListener('click', startTimer);

//function para resetar o temporizador com base no contexto do html
refreshTimerBtn.addEventListener('click', () => {
    html.getAttribute('data-contexto') === 'foco' ? tempoDecorridoEmSegundos = 1500 : html.getAttribute('data-contexto') === 'descanso-curto' ? tempoDecorridoEmSegundos = 300 : tempoDecorridoEmSegundos = 900;
    mostrarTemporizador();
})
