
/**
 * La función obtiene el valor de la carta
 * @param {String} carta La carta de la que queremos obtener su valor
 * @returns Devuelve el valor de la carta
 */
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor)) 
           ?(valor === 'A') ? 11 : 10
           :valor * 1;
}

export default valorCarta;