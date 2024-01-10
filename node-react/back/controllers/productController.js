
import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({message: "Impossible to find products"});
    }
};

export const getOneProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: "Article not find"})
        }
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({message: "Error find to receve a article"})
    }
}
export const addProduct = async(req, res) => {
    try {
        const { name, ref, quantity, price } = req.body;
        if(name.trim() === "" || ref.trim() === "" || quantity <= 0 || price <= 0 ){
            return res.status(401).json({message: "est ce bien votre produit?"})
        }
        let product;
        if(!req.file){
            product = new Product({
            name: name,
            ref: ref,
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            image: {
                src: "",
                alt: ""
            }
        })
        } else{
            product = new Product({
                name: name,
                ref: ref,
                quantity: parseFloat(quantity),
                price: parseFloat(price),
                image: {
                    src: req.file.filename,
                    alt: req.file.originalname
                }
            })
        }

        await product.save() // save in BDD

        res.status(200).json({message: "product create"});
    } catch (err) {
        res. status(500).json({message: "imposible to create a Product"})
    }
}