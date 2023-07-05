import _ from 'underscore';
//import { crearDeck as crearNuevoDeck} from './usecases/crear-deck';
import crearDeck from './usecases/crear-deck'; //, {exportarEjemplo} Se puede hacer de forma individual
import pedirCarta from './usecases/pedir-carta'; 
import valorCarta from './usecases/valor-carta';

const miModulo = ( () => {
  'use strict';

  let deck        = [],
      puntosJugadores = [];

  const   tipos       = ['C', 'D', 'H', 'S'],
          especiales  = ['A', 'J', 'Q', 'K'],
          btnPedir              = document.querySelector('#btnPedir'),
          btnNuevo              = document.querySelector('#btnNuevo'), 
          btnDetener            = document.querySelector('#btnDetener'),
          divCartasJugadores    = document.querySelectorAll('.divCartas'),
          smalls                = document.querySelectorAll('small');

  const inicializar = ( numJugadores = 2 ) => {
     deck = crearDeck(tipos, especiales);

      puntosJugadores = [];

      for (let i = 0 ; i<numJugadores ; i++) {
          puntosJugadores.push(0);
      }

      smalls.forEach( elemento => elemento.innerText=0 );
      divCartasJugadores.forEach( elemento => elemento.innerHTML='');

      btnPedir.disabled   = false;
      btnDetener.disabled = false;
  }


  //Eventos
  btnPedir.addEventListener('click', () => {

      const carta = pedirCarta(deck);
      const puntosJugador = acumularPuntos(carta, 0);
      crearCarta (carta, 0);

      if (puntosJugador > 21){
          console.warn('PERDISTE');
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoOrdenador(puntosJugador);
      } else if (puntosJugador == 21){
          console.warn('YA 21');
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoOrdenador(puntosJugador);
      }

  });   //Esta función dentro se llama CALLBACK

  btnDetener.addEventListener('click', () => {

      btnPedir.disabled = true;
      btnDetener.disabled = true;

      turnoOrdenador(puntosJugadores[0]);
  });

  btnNuevo.addEventListener('click', () => {
      inicializar();
  });

  //Turno 0: Primer Jugador
  //Turno último: Ordenador
  const acumularPuntos = ( carta, turno ) => {
      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
      smalls[turno].innerText = puntosJugadores[turno];

      return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
      const imgCarta = document.createElement('img');
      imgCarta.classList.add('carta');
      imgCarta.src = `assets/cartas/${carta}.png`;
      divCartasJugadores[turno].append(imgCarta);
  }
  
  const ganador = () => {
      const [ puntosMinimos, puntosOrdenador ] = puntosJugadores; 

      setTimeout(() => {
          if( puntosOrdenador === puntosMinimos ) {
              alert('Nadie gana :(');
          } else if ( puntosMinimos > 21 ) {
              alert('Ordenador gana')
          } else if( puntosOrdenador > 21 ) {
              alert('Jugador Gana');
          } else {
              alert('Ordenador Gana')
          }
      }, 100 ); 
  }

  const turnoOrdenador = (puntosMinimos) => {
      
      let puntosOrdenador = 0;
      
      do {
          const carta = pedirCarta(deck);
          puntosOrdenador = acumularPuntos(carta, puntosJugadores.length-1);
          crearCarta(carta, puntosJugadores.length-1);

          if (puntosMinimos > 21){
              break;
          }
      } while ( (puntosMinimos > puntosOrdenador) && (puntosOrdenador <= 21) );
      ganador(); 
  } 

  return {
      nuevaPartida: inicializar
  };

}) ();

