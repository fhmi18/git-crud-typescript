import { Request, Response } from "express";
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

export const welcomePage = (req: Request, res: Response) => {
    res.send("Welcome to the CRUD List App!");
};

export const getAllProducts =async (req: Request, res: Response) => {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products)
    } catch (error) {
      console.error("Error fetching products", error);
      res.status(500).json({ error: "Error fetching products" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
      const { name,price,description,image } = req.body
      const result = await prisma.product.create({
        data: {
          name,
          price,
          description,
          image
        }
    })
      res.status(200).json(result)
    } catch (error) {
      console.error("Error creating products", error);
      res.status(500).json({ error: "Error creating products" });
    }
};

export const getProductById =async (req: Request, res: Response) => {
  try {
      const { id } = req.params
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      })
      if (product) {
        res.status(200).json(product)
      } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product by id", error);
    res.status(500).json({ error: "Error fetching product by id" });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, price, description, image } = req.body
    if (!(name&&price&&description&&image)) {
      return res.status(400).json("Some fields are missing")
    }
    const product = await prisma.product.update({
      where: { id: Number(id) }, 
      data: {
        name,
        price,
        description,
        image
      }
    })
    res.status(200).json(product)
  } catch (error) {
    console.error("Error update products", error);
    res.status(500).json({ error: "Error update products" });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const product = await prisma.product.delete({
        where: { id: Number(id) },
      })
      res.status(200).send(product)
    } catch (error) {
      console.error("Error delete products", error);
      res.status(500).json({ error: "Error delete products" });
    }
  };