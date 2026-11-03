
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-animes");
const modelo = document.querySelector("#modelo-anime");

const apiKey = "cv_949Zv9npRXCE1ITyUCuTKt2VxQgZdiQltVEMTMkiAFvxER0Wm6iU7VQ8t6UUj_Dw";
const apiUrl = "https://api-ds.codeverse.dev.br/api/animes";

async function buscarAnime() {

  // Mostrar mensagem de carregamento
  resposta.textContent = "Carregando animes...";

  // Limpar lista anterior
  lista.innerHTML = "";

  try {

    // Fazer o GET
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey
      },
    });

    // Verificar se deu certo
    if (!retorno.ok) {
      throw new Error("Não foi possível carregar os animes.");
    }

    // Converter resultado para JSON
    const resultado = await retorno.json();

    // Percorrer a lista de animes
    for (const anime of resultado.data) {

      // Clonar o modelo HTML
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = anime.title;
      card.querySelector(".genero").textContent = anime.genero;
      card.querySelector(".numero_episodios").textContent = anime.numero_episodios;
      card.querySelector(".ano_lancamento").textContent = anime.ano_lancamento;
      card.querySelector(".estudio").textContent = anime.estudio;

      // Buscar imagem
      const imagem = card.querySelector(".imagem-anime");

      if (anime.imageUrl) {
        imagem.src = anime.imageUrl;
        imagem.alt = anime.title;
        imagem.onerror = () => imagem.remove();
      } else {
        imagem.remove();
      }

      // Adicionar card na página
      lista.appendChild(card);
    }

    // Limpar mensagem
    resposta.textContent = "";

  } catch (error) {

    console.error(error);

    resposta.textContent =
      "Não foi possível carregar os animes. Tente novamente!";

  }
}

// Executar a função
buscarAnime();
