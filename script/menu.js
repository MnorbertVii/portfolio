const hamburger = document.getElementById('hamb-btn');
const navul= document.getElementById('list');



hamburger.addEventListener('click', () => {
  navul.classList.toggle('showNav');
});