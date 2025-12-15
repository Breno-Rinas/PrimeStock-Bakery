const productRepository = require("../repositories/product-repository");

const retornaTodosProducts = async (req, res) => {
  try {
    const products = await productRepository.obterTodosProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.sendStatus(500);
  }
};

const criaProduct = async (req, res) => {
  const { id, name, unit, price, stock_quantity, image_url, description } = req.body;
  try {
    if (!id || !name) {
      return res.status(400).json({ message: "ID e name são obrigatórios." });
    }
    const product = await productRepository.criarProduct({ id, name, unit, price, stock_quantity, image_url, description });
    res.status(201).json(product);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.sendStatus(500);
  }
};

const atualizaProduct = async (req, res) => {
  const { name, unit, price, stock_quantity, image_url, description } = req.body;
  const id = parseInt(req.params.id);
  try {
    const productAtualizado = await productRepository.atualizarProduct({ id, name, unit, price, stock_quantity, image_url, description });
    if (productAtualizado) {
      res.status(200).json(productAtualizado);
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.sendStatus(500);
  }
};

const deletaProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productRemovido = await productRepository.deletarProduct({ id });
    if (productRemovido) {
      res.status(200).json({ message: "Produto removido com sucesso.", product: productRemovido });
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ message: "Erro ao deletar produto" });
  }
};

const retornaProductPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productRepository.obterProductPorId({ id });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  retornaTodosProducts,
  criaProduct,
  atualizaProduct,
  deletaProduct,
  retornaProductPorId,
};
