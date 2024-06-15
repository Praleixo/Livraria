const axios = require("axios");

exports.homeRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/produtos")
    .then((response) => {
      res.render("index", { produtos: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.novo_produto = (req, res) => {
  res.render("novo_produto");
};

exports.atualizar_produto = (req, res) => {
  axios
    .get(`http://localhost:3000/api/produtos?id=${req.query.id}`)
    .then((response) => {
      res.render("atualizar_produto", { produto: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};