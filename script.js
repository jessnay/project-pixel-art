// colocar event no document
// quando o conteúdo do html estiver carregado - ai tudo que estiver dentro da função vai rodar.
// chamar as funções que precisam carregar primeiro - uma carrega as cores e a outra carrega a table.
// tem que colocar a const preto uma vez que a cont preto precisa estar definida antes de carregar a função.

document.addEventListener('DOMContentLoaded', () => {
  const preto = document.getElementById('cor1');
  carregarCores();
  carregarTable();

  const topBoxes = document.querySelectorAll('.color');
  const pixelsBox = document.querySelectorAll('.pixel');
  const limparBoard = document.getElementById('clear-board');
  const vqvButton = document.getElementById('generate-board');
  const input = document.getElementById('board-size');

  // carregando as cores aleatórias
  function carregarCores() {
    preto.style.backgroundColor = 'black';
    const elements = document.querySelectorAll('.mixed');
    elements.forEach((e) => {
      e.style.backgroundColor = creatColor();
    });
  }

  // board size tem que ser o tamanho do input
  // board-size = 5 - 5 vai ser o valor inicial quando a página carregar pela primeira vez;
  function carregarTable(boardSize = 5) {
    const tableContainer = document.querySelector('#container-board');
    const newTable = document.createElement('table');
    newTable.setAttribute('id', 'pixel-board');
    tableContainer.appendChild(newTable);
    // looping criar o o numero de tr determinado pelo input ou o valor inicial - só vai rodar até 05 --- em cada tr criado vai rodar um outro for looping que vai criar 05 td dentro do tr e tamem vai ser inserido a classe, cor, background e o addeventlistener para o click --- e no final de tudo pega todos o tr e td e joga dentro do table criado.
    for (let i = 0; i < boardSize; i++) {
      const row = document.createElement('tr');
      for (let i = 0; i < boardSize; i++) {
        const pixel = document.createElement('td');
        pixel.classList.add('pixel');
        pixel.style.backgroundColor = '#fff';
        row.appendChild(pixel);
        pixel.addEventListener('click', mudarCor);
      }
      newTable.appendChild(row);
    }
  }
  // target para localizar o elemento -- topboxes que é uma lista de elementosfeitos como array (querysellectorall)--- assim é possivel fazer um forEach --- no for each e para todos que tem selectes - tira a classe selected de todos os li's - e o selected só vai aparecer após o click
  function selecionarCor(event) {
    const element = event.target;
    topBoxes.forEach((e) => {
      if (e.classList.contains('selected')) {
        e.classList.remove('selected');
      }
    });
    element.classList.add('selected');
  }
  // a cada item do li selecionado -- as caracteristicas são atribuidas ao pixel clicado (backgroung)
  function mudarCor(event) {
    topBoxes.forEach((e) => {
      if (e.classList.contains('selected')) {
        const bgColor = e.style.backgroundColor;
        event.target.style.backgroundColor = bgColor;
      }
    });
  }
  // fazer looping em todos os li's
  topBoxes.forEach((e) => {
    e.addEventListener('click', selecionarCor);
  });

  // deixa todos os td's brancos inciialmente;
  function limparPixels() {
    pixelsBox.forEach((e) => {
      e.style.backgroundColor = '#fff';
    });
  }
  // pega o valor do input e a table e apaga a table --- roda toda vez que clica no botão VQV --- carrega a table novemente
  function pixelBoard() {
    const inputValue = input.value;
    if (!inputValue) {
      return alert('Board inválido!');
    }
    const tableId = document.getElementById('pixel-board');
    tableId.remove();
    carregarTable(inputValue);
  }

  limparBoard.addEventListener('click', limparPixels);
  vqvButton.addEventListener('click', pixelBoard);

  // https://wallacemaxters.com.br/blog/2021/02/20/como-gerar-cores-aleatorias-no-javascript

  function creatColor() {
    const value1 = Math.floor(Math.random() * 256);
    const value2 = Math.floor(Math.random() * 256);
    const value3 = Math.floor(Math.random() * 256);
    return `rgb(${value1} , ${value2} , ${value3})`;
  }
});
