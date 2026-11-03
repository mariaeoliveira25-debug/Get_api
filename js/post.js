// 1 . Selecionar os elementos do html
// Que vai ser o forms
const form = document.querySelector("#form-anime");

const resposta = document.querySelector("#resposta");

// 2 . Comunicacao com a API
// Lembrete o codeverse tem APIKey ou seja senha nas req.

const apiKey = "cv_949Zv9npRXCE1ITyUCuTKt2VxQgZdiQltVEMTMkiAFvxER0Wm6iU7VQ8t6UUj_Dw";

// Tem que falar o link (endpoint)
const apiUrl = "https://api-ds.codeverse.dev.br/api/animes";

// 3. Capturar o evento de click do form

form.addEventListener("submit", async function (event) {
    //impede o comportamento padrao do forms, recarregar ou navegar para outra pagina automaticamente.
    event.preventDefault();

    //pegar os dados do form.

    const dados = new FormData(form);

    //organizar esse objeto e  montar

    const anime = {
        title: dados.get("title"),
        genero: dados.get("genero"),
        numero_episodios: dados.get("numero_episodios"),
        ano_lancamento: dados.get("ano_lancamento"),
        estudio: dados.get("estudio"),
        imageUrl: dados.get("imageUrl") || null
    }

    resposta.textContent = "Enviando anime para a API....";


    try {

        const respostaApi = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },

            //enviar os dados

            body: JSON.stringify(anime),
        });

        const texto = await respostaApi.text();
        let resultado;

        try {
            resultado = texto ? JSON.parse(texto) : {};
        } catch (error) {
            resultado = error;
            return;
        }

        if (respostaApi.ok) {
            resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
            form.reset();
        }

    } catch (error) {
        console.error(error);
    }

})