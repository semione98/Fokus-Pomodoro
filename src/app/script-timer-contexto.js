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
