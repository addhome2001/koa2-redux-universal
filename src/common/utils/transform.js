/**
 * capitalize
 * @param  {String} letter [the letter for capitalize]
 * @return {String}        [result]
 */
export default function capitalize(letter) {
  return letter.slice(0, 1).toUpperCase() + letter.slice(1);
}
