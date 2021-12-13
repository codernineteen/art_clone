const colorAddBtn = document.querySelector('.product_color_add');
const designAddBtn = document.querySelector('.product_design_add');
const materialAddBtn = document.querySelector('.product_material_add');

const addItem = (inputClass, listClass) => {
    const input = document.querySelector(`.${inputClass}`);
    const value = input.value;
    const li = document.createElement("li");
    li.setAttribute('class', `${input.name}_list_item`);
    const textNode = document.createTextNode(value);
    li.appendChild(textNode);
    document.querySelector(`.${listClass}`).appendChild(li)
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