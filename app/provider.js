
/**
 * Returns a JS object representation of a Javascript Web Token from it's common encoded
 * string form.
 *
 * @export
 * @template T the expected shape of the parsed token
 * @param {string} token a Javascript Web Token in base64 encoded, `.` separated form
 * @returns {(object | undefined)} an object-representation of the token
 * or undefined if parsing failed
 */
export function getParsedJwt() {
    
    try {
      let tokenObj = JSON.parse(atob(localStorage.getItem("tokens").replace(/['"]+/g, '').split('.')[1]));
      if (Date.now() >= tokenObj.exp * 1000) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }