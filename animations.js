import anime from './node_modules/animejs/lib/anime.es.js';

export function animateValueOutput(element, resultOutput){
    anime({
        targets: element,
        innerHTML: [0, resultOutput],
        easing: 'linear',
        round: 100,
        duration: 500
      });
}
