/**
 * capitalize
 * @param  {String} word [word]
 * @return {String}      [result]
 */
function capitalize(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export default capitalize;
