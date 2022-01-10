const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const _ = require("lodash");
const CreateError = require("http-errors");
const logger = require("../utils/logger");
require("dotenv").config();

exports.createProduct = async ({name,price,description,image}) => {
    
    // const productExist = await prisma.products.findUnique({
    //     where: {
    //         name: req.body.name,
    //     },
    // });

    // if (productExist) {
    //     throw new CreateError(400, "Product already exist");
    // }

    const product = await prisma.products.create({
      data: {
        name: name,
        price: price,
        description: description,
        image: image,
      },
    });
    return product;
};

exports.getProducts = async () => {
    const products = await prisma.products.findMany();
    if(!products){
         throw new CreateError(400, "No products found");
    }
    return products;
};

exports.getProductsById = async ({productId}) => {
    const product = await prisma.products.findUnique({
        where: {
            id: productId,
        },
    });
    if(!product){
        throw new CreateError(400, "Product not found");
    }
    return product;
}

exports.updateProduct = async ({productId,name,price,description,image}) => {
    const id = parseInt(productId);
    const product = await prisma.products.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            price: price,
            description: description,
            image: image,
        },
    });
    if(!product){
        throw new CreateError(400, "Product not found");
    }
    return product;
}

exports.deleteProduct = async ({productId}) => {
    const product = await prisma.products.delete({
        where: {
            id: productId,
        },
    });
    if(!product){
        throw new CreateError(400, "Product not found");
    }
    return product;
}

