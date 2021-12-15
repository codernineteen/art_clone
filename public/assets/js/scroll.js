let count = 1;
const root = document.querySelector('.main-lookbook-container');
const loadingMsg = document.querySelector('.loading-message')


const requestData = async () => {
    const response = await fetch(
        '/archives/lookbook/partialData',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({count})
        }
    )
    const data = await response.json()
    count += 1

    for(item of data.lookbooks) {
        //data-row
        const row = document.createElement('div');
        row.classList.add('main-lookbook-row');

        //detaiu-set
        const detail = document.createElement('div');
        detail.classList.add('main-lookbook-detail-set');

        const date = document.createElement('div');
        date.classList.add('main-lookbook-release-date');
        date.innerText = `${item.season} ${item.year}.`

        const title = document.createElement('div');
        title.classList.add('main-lookbook-title');
        title.innerText = item.title;

        const subtitle = document.createElement('div');
        subtitle.classList.add('main-lookbook-subtitle');
        subtitle.innerText = item.subtitle;

        const viewBtn = document.createElement('div');
        viewBtn.classList.add('main-lookbook-view');
        const viewLink = document.createElement('a');
        viewLink.setAttribute('href', '#');
        viewLink.innerText = 'view all';
        viewBtn.appendChild(viewLink);

        detail.appendChild(date);
        detail.appendChild(title);
        detail.appendChild(subtitle);
        detail.appendChild(viewBtn);

        row.appendChild(detail)

        //photo-set
        for(let i=0; i < 4; i++) {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('main-lookbook-photo');
            const image = document.createElement('img');
            image.classList.add('main-lookbook-img');
            image.setAttribute('src', `/images/lookbookImage/${item.images[i]['name']}`)
            image.setAttribute('alt', 'thumbnail');
            image.setAttribute('width', 332);
            image.setAttribute('height', 476);
            imageWrapper.appendChild(image);
            row.appendChild(imageWrapper)
        }

        root.appendChild(row)
    }

}

let options = {
    threshold: 1
}


const observeLastChild = async (intersectionObserver) => {
    const response = await fetch(
        '/archives/lookbook/partialData',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({count})
        }
    )
    const data = await response.json()
    
    const rootChildren = document.querySelectorAll(".main-lookbook-row")
    rootChildren.forEach((element) => {
        console.log(element)
        if (!element.nextSibling && data.lookbooks.length !== 0) {
            intersectionObserver.observe(element) // el에 대하여 관측 시작
        } else if (data.lookbooks.length === 0) {
            loadingMsg.classList.add("hidden")
            intersectionObserver.disconnect()
        }
    })
}


const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        setTimeout(() => {
            loadingMsg.classList.add("fade-in")
            if(entry.isIntersecting) {
                requestData();
                observer.unobserve(entry.target)
                observeLastChild(observer)

                loadingMsg.classList.remove("fade-in")
            }
        }, 1000)
    })
}, options)

requestData();
requestData();
observeLastChild(io);