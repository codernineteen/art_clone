//pagination
const noticeItems = document.querySelectorAll('.main-notice-body-item');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');


const url = new URL(window.location);
nextBtn.addEventListener('click', () => {
    if(noticeItems.length < 70) {
        return
    }
    const url = new URL(window.location);
    let currentIndex = Number(url.search.split('=')[1]);
    if(!currentIndex) {
        currentIndex = 1;
    }
    url.searchParams.set("page", currentIndex + 1)
    window.location =url;
})

prevBtn.addEventListener('click', () => {
    const url = new URL(window.location);
    let currentIndex = Number(url.search.split('=')[1]);
    if(!currentIndex) {
        currentIndex = 1;
    }
    if(currentIndex === 1) {
        return
    } else { 
        url.searchParams.set("page", currentIndex - 1)
        window.location =url;
    }

})