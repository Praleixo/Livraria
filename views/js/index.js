$("#novo_produto").submit(function (event) {
    event.preventDefault();
    const data = {
      codigo: $("#inputCodigo").val(),
      descricao: $("#inputDescricao").val(),
      preco: $("#inputPreco").val(),
      quantidade: $("#inputQuantidade").val(),
    };
    const request = {
      url: `http://localhost:3000/api/produtos/`,
      method: "POST", data: data,
    };
    $.ajax(request).done(function (response) {
      alert("Produto cadastrado com sucesso!");
      $("#inputCodigo").val(""); $("#inputDescricao").val("");
      $("#inputPreco").val(""); $("#inputQuantidade").val("");
    });
  });
  $("#atualizar_produto").submit(function (event) {
    event.preventDefault();
    const unindexed_array = $(this).serializeArray();
    let data = {};
    $.map(unindexed_array,(n, i)=>{data[n["name"]]=n["value"];});
    console.log(data);
    const request = {
      url: `http://localhost:3000/api/produtos/${data.id}`,
      method: "PUT", data: data,
    };
    $.ajax(request).done(function (response) {
      alert("Produto atualizado com sucesso!");
      window.location.href = "/";
    });
  });
    
  if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
      const id = $(this).attr("data-id");
    
      const request = {
        url: `http://localhost:3000/api/produtos/${id}`,
        method: "DELETE",
      };
  
      if (confirm("Deseja mesmo excluir este produto?")) {
        $.ajax(request).done(function (response) {
          alert("Produto excluido com sucesso!");
          location.reload();
        });
      }
    });
  }
  const fill_form = (produto) => {
    $("#inputId").val(produto._id); 
    $("#inputCodigo").val(produto.codigo); 
    $("#inputDescricao").val(produto.descricao);
    $("#inputPreco").val(produto.preco); 
    $("#inputQuantidade").val(produto.quantidade);
    $("#btnSalvar").html("Salvar");    
  }