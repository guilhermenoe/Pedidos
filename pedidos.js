

var pedido = {
    Mesa1 :  [],
    Mesa2 :  [],
    Mesa3 :  [],
    Mesa4 :  [],
    Mesa5 :  [],
    Mesa6 :  [],
    Mesa7 :  [],
    Mesa8 :  [],
    Mesa9 :  [],
    Mesa10 : [],
    Mesa11 : [],
    Mesa12 : [], 
  }
  
  var estaEditandoPedido = false
  
  
  function atualizarHTML(){
    
  var lista = document.getElementById("lista de pedidos");
  lista.innerHTML = ""
    
  for (var key in pedido) {
    
    if ( pedido[key].length > 0) {
      
      var divNova = document.createElement("div"); 
      divNova.className = "cards";
    
      lista.appendChild(divNova)
  
      var mesaCard
      switch(key) {
      case 'Mesa1': mesaCard = 'MESA 1'; break;
      case 'Mesa2': mesaCard = 'MESA 2'; break;
      case 'Mesa3': mesaCard = 'MESA 3'; break;
      case 'Mesa4': mesaCard = 'MESA 4'; break;
      case 'Mesa5': mesaCard = 'MESA 5'; break;
      case 'Mesa6': mesaCard = 'MESA 6'; break;
      case 'Mesa7': mesaCard = 'MESA 7'; break;
      case 'Mesa8': mesaCard = 'MESA 8'; break;
      case 'Mesa9': mesaCard = 'MESA 9'; break;
      case 'Mesa10': mesaCard = 'MESA 10'; break;
      case 'Mesa11': mesaCard = 'MESA 11'; break;
      case 'Mesa12': mesaCard = 'MESA 12'; break;
      }
  
      
      divNova.innerHTML = divNova.innerHTML  +  
      `
      <b><center>${mesaCard} </b> 
      <button class="btn" onclick="excluirPedido('${key}')">X</button>
      </center>
  
      `
      //- ${pedido[key].length }  Pedidos
      
       var test = pedido[key]
       var mesa = key
      
  
      for (var key in test) {
        divNova.innerHTML = divNova.innerHTML + 
      `
       <div class="items" onclick="editarPedidoExistente('${mesa}')"> ${test[key]} </div>
      ` 
      } 
    }
         
  } 
  }
  
  
   function excluirPedido(mesa){
      //delete pedido[mesa]; 
      pedido[mesa] = [] 
      document.getElementById("lista de pedidos").innerHTML = ""
      atualizarHTML()
      limparCorBotaoMesa()
    }
  
  
  var novoPedido = [] //guarda o array da criacao de um novo pedido cliente
  
  function removeItemPedido(index){
    novoPedido.splice(index, 1)
    atualizaPreviewPedido()
  }
  
  function adicionaPedidoMesa(descricao){
    novoPedido.push(descricao)
    atualizaPreviewPedido()
  }
  
  function cancelarPedido(){
    
    estaEditandoPedido = false
    novoPedido = []
    atualizaPreviewPedido()
    limparCorBotaoMesa()
    UInovopedido('hide')
    UIlistapedidos('show')
   
  }
    
  
  function atualizaPreviewPedido(){
    
    var preview = document.getElementById("preview")
    preview.innerHTML = `<img src="/add_book_sans_icon.png" style="height:75px" style="height:60px">`
    
        for (var key in novoPedido) {
          preview.innerHTML = preview.innerHTML  +  
          `
          <button class="btnSolicitado" onclick="removeItemPedido(${[key]})"><b>${novoPedido[key]} </b></button>
          `
     }
  }
  
  
  
  
  var mesaSelecionada = ''
  
  
  function selecionarMesa(mesa){  
    
    if (estaEditandoPedido == true) {
      //somente pode selecionar uma mesa se nao estiver editando um pedido existente
      return
    }
    
    mesaSelecionada = mesa
  
    var botoesMesa = document.getElementsByClassName("btnMesa")
  
    for(var i = 0; i < botoesMesa.length; i++)
    {
        botoesMesa[i].classList.add("btnMesa2")
    }
    
    selecionada = document.getElementById(mesa)
    selecionada.classList.remove("btnMesa2")
  }
  
  
  
  function verificaMesaComPedido(){
      var botoesMesa = document.getElementsByClassName("btnMesa")
      for(var i = 0; i < botoesMesa.length; i++)
      {
        botoesMesa[i].classList.add("btnMesa2")
      }
  }
  
  
  
  
  function limparCorBotaoMesa(){
    
    var botoesMesa = document.getElementsByClassName("btnMesa")
    for(var i = 0; i < botoesMesa.length; i++)
    {
        botoesMesa[i].classList.remove("btnMesa2")
    }
  }
  
  
  
  
  function criarNovoPedido(){
    
    if (mesaSelecionada === ''){
          alert("Selecione uma mesa para criar o pedido")
          return
    } else {
      
  
         if (pedido[mesaSelecionada].length > 0 &&  estaEditandoPedido == false ) {
            alert("ja existem pedidos nessa mesa")
            return
         }
      
      
          if (estaEditandoPedido == true){
             //se estiver editando um pedido limpar o array do pedido
             var subsituirPorEsse = novoPedido
             novoPedido = []
             for (var key in novoPedido) {
              pedido[mesaSelecionada].push(subsituirPorEsse[key])
             }
          }
      
          if (estaEditandoPedido == false){
             //se NAO estiver editando um pedido 
              for (var key in novoPedido) {
                  pedido[mesaSelecionada].push(novoPedido[key])
              }
          }
      
  
  
          novoPedido = []
          mesaSelecionada = ''
          atualizaPreviewPedido()
          atualizarHTML()
          limparCorBotaoMesa()
      UInovopedido('hide')
      UIlistapedidos('show')
      
      estaEditandoPedido = false
    }
    
  }
  
  
  UInovopedido('hide')
  //inicia a pagina com os pedidos escondidos
  
  function UInovopedido(comando){ 
    if (comando == "hide"){
      var u = document.getElementById("pedidosUI")
      u.style.visibility = "hidden" 
    }
    if (comando == "show"){
      var u = document.getElementById("pedidosUI")
      u.style.visibility = "visible"   
    }
  }
  
  
  function UIlistapedidos(comando){
     if (comando == "hide"){
      var u = document.getElementById("listaUI")
      u.style.visibility = "hidden" 
    }
    if (comando == "show"){
      var u = document.getElementById("listaUI")
      u.style.visibility = "visible"   
    }
  }
  
  
  
  function editarPedidoExistente(mesa){
    UIlistapedidos('hide')
    UInovopedido('show')
    editarPedidoPreview(mesa)
  }
  
  
  function editarPedidoPreview(mesa){
    novoPedido = pedido[mesa]
    selecionarMesa(mesa) 
    atualizaPreviewPedido()
    estaEditandoPedido = true
  }
  
  
  
  function teste(mesa){
    novoPedido = pedido[mesa]
    atualizaPreviewPedido()
  }
  
  
  
  
  
  
  
    