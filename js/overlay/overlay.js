export function handleOverlay() {
  setTimeout( () => document.getElementById('overlay-div').classList.add('remove-opacity'), 0);
  setTimeout( () => document.getElementById('overlay-div').classList.remove('overlay'), 3000);
}