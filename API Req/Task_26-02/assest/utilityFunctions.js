function setLocalStorage(localStorageName, localStorageItem) {
  localStorage.setItem(localStorageName, JSON.stringify(localStorageItem));
}

function getLocalStorage(localStorageName) {
  return JSON.parse(localStorage.getItem(localStorageName));
}
