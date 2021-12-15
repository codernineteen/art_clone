//pagination
const productsPerPage = document.querySelectorAll('.each-product');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');


const url = new URL(window.location);
console.log(url)

nextBtn.addEventListener('click', () => {
    if(productsPerPage.length < 12) {
        return
    }
    const url = new URL(window.location);
    let currentIndex = Number(url.search.split('&').at(-1).split('=')[1]);
    if(!currentIndex) {
        currentIndex = 1;
    }
    url.searchParams.set("page", currentIndex + 1)
    window.location = url;
})

prevBtn.addEventListener('click', () => {
    const url = new URL(window.location);
    let currentIndex = Number(url.search.split('&').at(-1).split('=')[1]);
    if(!currentIndex) {
        currentIndex = 1;
    }
    if(currentIndex === 1) {
        return
    } else { 
        url.searchParams.set("page", currentIndex - 1)
        window.location = url;
    }

})