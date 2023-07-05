import _ from 'underscore';

//export const exportarEjemplo = 'Esto se puede exportar';

/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tiposCarta Ejemplo:'['C', 'D', 'H', 'S']'
 * @param {Array<String>} tiposEspeciales Ejemplo:'['A', 'J', 'Q', 'K']'
 * @returns {Array<String>} Devuelve un array de cartas de forma aleatoria
 */
const crearDeck = (tiposCarta, tiposEspeciales) => {
    if (!tiposCarta)        throw new Error('Hay que enviar de forma obligatoria los tipos de carta');
    if (!tiposEspeciales)   throw new Error('Hay que enviar de forma obligatoria los tipos de especiales');
    if (tiposCarta.length === 0) throw new Error('El tamaño no puede ser cero (0)');

    let deck = [];  
    for (let i = 2; i <= 10 ; i++){
        for (let tipo of tiposCarta){
            deck.push( i + tipo );
        }
    }
    for (let especial of tiposEspeciales){
        for (let tipo of tiposCarta){
            deck.push( especial + tipo );
        }
    }
    return _.shuffle(deck);
}

export default crearDeck;