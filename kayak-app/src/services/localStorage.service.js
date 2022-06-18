/**
 * 
 * @param {object} user 
 * saves the user object to local
 * storage
 */
function saveUser(user) {
    const value = JSON.stringify(user);
    localStorage.setItem('user', value);
}

/**
 * 
 * @returns returns the user object that is 
 * saved in local storage
 */
function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

/**
 * removes the user object in local storage
 */
function removeUser() {
    localStorage.removeItem('user');
}

const ls = {
    saveUser,
    getUser,
    removeUser
}

function useLocalStorage() {
    return ls;
}

export { useLocalStorage }