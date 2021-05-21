export const getKey = key => window.localStorage.getItem(key) || '';
export const setKey = (key, val) => window.localStorage.setItem(key, val);
