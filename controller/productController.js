const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const createProduct = async (req, res) => {
    const {partImages, totalImages} = req.files;
    console.log(req.body)
    if(!req.files || Object.keys(req.files).length === 0) {
        throw new CustomErrors.BadRequestError('No files were uploaded');
    }
    let partImagesPaths = [];
    let totalImagesPaths = [];
    for (let image of partImages) {
        partImagesPaths.push({
            path: image.path,
            name: image.filename
        })
    }
    for (let image of totalImages) {
        totalImagesPaths.push({
            path: image.path,
            name: image.filename
        })
    }
    console.log(partImagesPaths, totalImagesPaths)
    const newProduct = {
        name : req.body.name, 
        color: req.body.color, 
        design: req.body.design, 
        material: req.body.material, 
        origin: req.body.origin, 
        price: req.body.price,
        size: req.body.size,
        category: req.body.category,
        partImages: partImagesPaths,
        totalImages: totalImagesPaths
    }
    await Product.create(newProduct)
    res.status(StatusCodes.CREATED).send('Success create')
}

const getAllProduct = async (req, res) => {
    const category = req.query.category;
    let result = Product.find({})
    if(category) {
        result = Product.find({category: category})
    }
    const page = Number(req.query.page) || 1
    const limit = 12;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit)
    
    const products = await result
    res.status(StatusCodes.OK).render('products', {products})
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        throw new CustomError.NotFound("No item with that id")
    }
    res.status(StatusCodes.OK).render('productSingle', {product})
}

const updateProduct = async (req, res) => {
    const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
    if(!product) {
        throw new CustomError.NotFound("No item with that id")
    }
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    //how bout find one and .remove() ?
    const product = await Product.findOneAndDelete({_id: req.params.id})
    if(!product) {
        throw new CustomError.NotFound("No item with that id")
    }
    res.status(StatusCodes.OK).json({product});
}

module.exports = {
    getAllProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}