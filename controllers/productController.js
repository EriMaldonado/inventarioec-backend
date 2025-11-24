import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock } = req.body;

    const cat = await Category.findById(category);
    if (!cat) return res.status(400).json({ message: "Categoría no válida" });

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsFiltered = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, page, limit } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; 
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;

    const products = await Product.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
