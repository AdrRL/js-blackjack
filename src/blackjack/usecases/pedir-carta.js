
/**
 * Esta función toma la última carta de la baraja y la devuelve
 * @param {Array{String}} deck Array de String
 * @returns {Array{String}} Devuelve el elemento que hemos eliminado del deck
 */
const pedirCarta = (deck) => {
    if (!deck || deck.length===0) {
        throw 'No hay cartas en el deck';
    }
    return deck.pop();
}

export default pedirCarta;