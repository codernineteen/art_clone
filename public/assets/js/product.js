const colorAddBtn = document.querySelector('.product_color_add');
const designAddBtn = document.querySelector('.product_design_add');
const materialAddBtn = document.querySelector('.product_material_add');

const productForm = document.querySelector('.product_form');

const addItem = (inputClass, listClass) => {
    const input = document.querySelector(`.${inputClass}`);
    const value = input.value;
    const name = input.name;
    const li = document.createElement("li");
    li.setAttribute('class', `${name}_list_item`);
    const textNode = document.createTextNode(value);
    li.appendChild(textNode);
    document.querySelector(`.${listClass}`).appendChild(li)
}

const pushItem = (name, array) => {
    for (let i of document.querySelectorAll(`${name}`)) {
        array.push(i.innerText)
    }
}

colorAddBtn.addEventListener('click', () => {
    addItem('product_color', 'product_color_list')
})

designAddBtn.addEventListener('click', () => {
    addItem('product_design', 'product_design_list')
})

materialAddBtn.addEventListener('click', () => {
    addItem('product_material', 'product_material_list')
})


productForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    let colorArr = [];
    let designArr = [];
    let materialArr = [];
    let sizeArr = [];
    pushItem('.product_color_list_item', colorArr);
    pushItem('.product_design_list_item', designArr);
    pushItem('.product_material_list_item', materialArr);
    for (let i of document.querySelectorAll('input[name="product_size"]:checked')) {
        sizeArr.push(i.value);
    }

    const name = document.querySelector('.product_name').value;
    const price = Number(document.querySelector('.product_price').value);
    const category = document.querySelector('#product_category').value;
    const partImages = document.querySelector('.partImages').files;
    const totalImages = document.querySelector('.totalImages').files;
    
    try {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', price)
        formData.append('category', category)
        for(let color of colorArr) {
            formData.append('color', color)
        }
        for(let design of designArr) {
            formData.append('design', design)
        }
        for(let material of materialArr) {
            formData.append('material', material)
        }
        for(let size of sizeArr) {
            formData.append('size', size)
        }
        for (let image of partImages) {
            formData.append('partImages', image)
        }
        for (let image of totalImages) {
            formData.append('totalImages', image)
        }
        const response = await fetch('/products/create' , {
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
            alert('제품이 정상적으로 업로드 됐습니다!')
            window.location.href = "http://localhost:3000/products"
        }
    } catch (error) {
        console.log(error)
    }

})
