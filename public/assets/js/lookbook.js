const lookbookForm = document.querySelector('.lookbook_form');

lookbookForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const title = document.querySelector('.lookbook_title').value;
    const subtitle = document.querySelector('.lookbook_subtitle').value;
    const season = document.querySelector('#lookbook_season').value;
    const year = document.querySelector('.lookbook_year').value;
    const images = document.querySelector('.images').files;

    try {
        const formData = new FormData();

        formData.append('title', title)
        formData.append('subtitle', subtitle)
        formData.append('season', season)
        formData.append('year', year)
        for (let image of images) {
            formData.append('images', image)
        }

        const response = await fetch('/archives/lookbook/create' , {
            method: 'POST',
            body: formData
        })
        const statusCode = response.status;
        if (statusCode === 500) {
            alert('데이터가 누락되었습니다. 모든 데이터를 올바르게 입력해주세요.')
        }
        if(statusCode === 400) {
            alert('올바르지 않은 요청입니다.')
        }
        if (statusCode === 201) {
            alert('룩북이 정상적으로 업로드 됐습니다!')
            window.location.href = "http://localhost:3000/archives/lookbook"
        }
    } catch (error) {
        console.log(error)
    }
    
})

