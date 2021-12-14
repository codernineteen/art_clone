const currentURL = new URL(window.location).href
const noticeId = currentURL.split('/')[4];

const increaseOneView = async() => {
    try {
        const response = await fetch(
            `${currentURL}/jsonData`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        )
        const data = await response.json();
        let currentView = data.notice.numOfView
        currentView += 1;
        console.log(currentView)
        try {
            const response = await fetch(
                `${currentURL}/updateView`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        numOfView: currentView
                    })
                }
            )
            const msg = await response.json();
            console.log(msg);
        } catch (error) {
            console.log(error)
        }
    }
    catch(err) {
        console.log(err)
    }
}

increaseOneView();