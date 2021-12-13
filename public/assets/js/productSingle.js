const prevButtonTotal = document.querySelector('.total_prev'); 
const nextButtonTotal = document.querySelector('.total_next');
const carousel = document.querySelector('.carousel');
const totalImages = document.querySelectorAll('.main-product-img');
const imageLocation = document.querySelector('.main-product-img-location');

//carousel
let index = 0;
const last = totalImages.length - 1;

prevButtonTotal.addEventListener('click', () => { 
    if(index === 0) return;
    index -= 1;
    imageLocation.innerText = `${index+1}/${last+1}`
    carousel.style.transform = `translate3d(-${522 * index}px, 0, 0)`;
}); 

nextButtonTotal.addEventListener('click', () => { 
    if(index === last) return;
    index += 1;
    imageLocation.innerText = `${index+1}/${last+1}`
    carousel.style.transform = `translate3d(-${522 * index}px, 0, 0)`;
});

// fitting


const nextButtonPart = document.querySelector('.part_prev'); 
const prevButtonPart = document.querySelector('.part_next');
const partImages = document.querySelectorAll('.main-fitting-img');

let indexTwo = 0;
const lastTwo = partImages.length - 1;

for(let i=0; i < partImages.length; i++ ) {
    if(i !== 0) {
        partImages[i].style.opacity = 0.4
    }
}

nextButtonPart.addEventListener('click', () => { 
    if(indexTwo === 0) return;
    partImages[indexTwo].style.opacity = 0.4
    indexTwo -= 1;
    partImages[indexTwo].style.opacity = 1
}); 

prevButtonPart.addEventListener('click', () => { 
    if(indexTwo === lastTwo) return;
    partImages[indexTwo].style.opacity = 0.4
    indexTwo += 1;
    partImages[indexTwo].style.opacity = 1
});

//pop up
const sizeGuideBtn = document.querySelector('.product-size-guide');
const popUp = document.querySelector('.product-size-pop-up');
const popUpExitBtn = document.querySelector('.pop-up-exit');

sizeGuideBtn.addEventListener('click', () => {
    popUp.classList.remove('hidden');
})

popUpExitBtn.addEventListener('click', () => {
    popUp.classList.add('hidden');
})
