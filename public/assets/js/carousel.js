const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next'); 
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.main-product-img');

let index = 0;
const last = images.length - 1;

prevButton.addEventListener('click', () => { 
    if(index === 0) return;
    index -= 1;
    carousel.style.transform = `translate3d(-${738 * index}px, 0, 0)`;
}); 

nextButton.addEventListener('click', () => { 
    if(index === last) return;
    index += 1;
    carousel.style.transform = `translate3d(-${738 * index}px, 0, 0)`;
});