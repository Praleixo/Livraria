const Produto = require("../models/produto");

exports.lista = (req, res) => {
  // Dados fornecidos na query string 
  if (req.query.id) {
    const id = req.query.id;
    Produto.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404)
             .send({ message: "Produto não encontrado com id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500)
           .send({ message: "Erro ao recuperar produto com id " + id });
      });
  } else {
    Produto.find()
      .then((produtos) => { res.send(produtos); })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Ocorreu um erro ao recuperar as informações de produtos",
        });
      });
  }
};

exports.cadastrar = async (req, res) => {
  // Dados fornecidos no corpo da requisição
  const { codigo, descricao, preco, quantidade } = req.body;
  try {
    if (await Produto.findOne({ codigo }))
      return res.status(400)
                .send({ error: "Produto já cadastrado" });
    const produto = await Produto.create({
      codigo,
      descricao,
      preco,
      quantidade,
    });
    return res.send({ produto });
  } catch (error) {
    return res.status(400)
              .send({ error: "Erro ao cadastrar o produto" });
  }
};

exports.update = (req, res) => {
  // Dados fornecidos na rota e no corpo da requisição 
  const id = req.params.id;
  Produto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível atualizar o produto ${id}.`
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500)
         .send({ message: "Erro Atualizar informações do produto" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  // Dados fornecidos na rota
  Produto.findByIdAndRemove({_id: id})
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível excluir o produto ${id}.`
        });
      } else {
        res.send({message: "O produto foi excluído com sucesso!"});
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível excluir o produto com id=" + id,
      });
    });
};