//logica é : identificar a onde está clicando(e determinar a tarefa) -> tudo vai ser a partir dos controles
//vamos captar os eventos do player(controles) que está na <section id="controls"> 



/* // ínicio do comentário


// Seleciona o elemento de controles da música
const controls = document.querySelector("#controls");
// Seleciona o botão de play/pause
const btnPlay = document.querySelector("#play-control");
// Define o índice da música atual (começa com a primeira)
let index = 0; // primeira música do player
// Variável para armazenar a música atual
let currentMusic;
// Variável booleana para checar se a música está tocando
let isPlaying = false; // padrão inicial não está tocando

// Adiciona um evento de clique aos controles
controls.addEventListener("click", function (event) {
    // console.log(event) pode ser usado para debugar o clique

    // Array que irá conter as músicas
    const audios = [];
    // Objeto vazio que será preenchido com as informações de cada música
    let music = {};

    // Verifica se o clique foi feito fora dos controles (id "controls")
    if (event.target.id != "controls") {
        // Captura todos os nós filhos do body
        const nodeList = document.body.childNodes;
        console.log(nodeList);
        
        // Navega pelos nós até encontrar a lista de músicas
        const musics = nodeList[3].childNodes[5].childNodes[1].childNodes[3].childNodes;
        console.log(musics);

        // Itera sobre as músicas encontradas
        musics.forEach(function (item) {
            // Ignora nós de texto (#text) para focar nos elementos de dados
            if (item.nodeName != "#text") {
                // Identifica o nome da música
                music.name = item.childNodes[3].childNodes[0].data;
                // Identifica o nome do artista
                music.artist = item.childNodes[5].childNodes[0].data;
                // Identifica a imagem de capa da música
                music.image = item.childNodes[1].childNodes[0].currentSrc;
                // Identifica o áudio da música
                music.audio = item.childNodes[7].childNodes[1];
                // Adiciona o objeto música ao array de áudios
                audios.push(music);
                // Reinicia o objeto music para a próxima iteração
                music = {};
            }
        });

        console.log(audios); // imprime o array de músicas
    }

    // Função que atualiza os dados da música atual na interface
    function updateDataMusic() {
        // Atualiza a música atual baseada no índice
        currentMusic = audios[index];
        // Atualiza a imagem da música
        document.querySelector("#currentImg").src = currentMusic.image;
        // Atualiza o nome da música
        document.querySelector("#currentName").innerText = currentMusic.name;
        // Atualiza o nome do artista
        document.querySelector("#currentArtist").innerText = currentMusic.artist;
        // Define o volume da música em 100%
        document.querySelector("#volume").value = currentMusic.audio.volume * 100;

        // Controle de progresso e duração
        const progressbar = document.querySelector("#progressbar");
        const textCurrentDuration = document.querySelector("#current-duration");
        const textTotalDuration = document.querySelector("#total-duration");

        // Define o máximo da barra de progresso com a duração da música
        progressbar.max = currentMusic.audio.duration;
        // Exibe a duração total da música
        textTotalDuration.innerText = secondsToMinutes(currentMusic.audio.duration);

        // Atualiza a barra de progresso conforme a música avança
        currentMusic.audio.ontimeupdate = function () {
            textCurrentDuration.innerText = secondsToMinutes(
                currentMusic.audio.currentTime
            );
            progressbar.valueAsNumber = currentMusic.audio.currentTime;
        };
    }

    // Evento de clique no botão de play/pause
    if (event.target.id == "play-control") {
        // Se o índice for 0, atualiza a música
        if (index === 0) {
            updateDataMusic();
        }

        // Alterna entre tocar e pausar a música
        if (!isPlaying) {
            btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
            currentMusic.audio.play();
            isPlaying = true;
        } else {
            btnPlay.classList.replace("bi-pause-fill", "bi-play-fill");
            currentMusic.audio.pause();
            isPlaying = false;
        }
        musicEnded();
    }

    // Evento para controlar o ícone de volume
    if (event.target.id == "vol-icon") {
        currentMusic.audio.muted = !currentMusic.audio.muted;
        if (currentMusic.audio.muted) {
            event.target.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
        } else {
            event.target.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
        }
        musicEnded();
    }

    // Evento de ajuste de volume
    if (event.target.id == "volume") {
        currentMusic.audio.volume = event.target.valueAsNumber / 100;
        musicEnded();
    }

    // Evento de ajuste da barra de progresso da música
    if (event.target.id == "progressbar") {
        currentMusic.audio.currentTime = event.target.valueAsNumber;
        musicEnded();
    }

    // Evento para avançar para a próxima música
    if (event.target.id == "next-control") {
        index++;

        // Reinicia o índice se for a última música
        if (index == audios.length) {
            index = 0;
        }

        currentMusic.audio.pause();
        updateDataMusic();
        currentMusic.audio.play();
        btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        musicEnded();
    }

    // Evento para voltar para a música anterior
    if (event.target.id == "prev-control") {
        index--;

        // Ajusta o índice se for a primeira música
        if (index == -1) {
            index = audios.length - 1;
        }

        currentMusic.audio.pause();
        updateDataMusic();
        currentMusic.audio.play();
        btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        musicEnded();
    }

    // Função que monitora o fim da música e avança para a próxima
    function musicEnded() {
        currentMusic.audio.addEventListener("ended", function () {
            index++;

            if (index == audios.length) {
                index = 0;
            }

            //currentMusic.audio.pause();
            updateDataMusic();
            currentMusic.audio.play();
            btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        });
    }
});

// Função que converte segundos em minutos e segundos no formato MM:SS
function secondsToMinutes(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}


/**
 O arquivo script.js é responsável por controlar a interação do usuário com o player de música na interface.
  Ele lida com eventos como reproduzir, pausar, avançar, retroceder, ajustar volume e manipular a barra de progresso da música.
  A lógica envolve capturar informações da playlist carregada na página e atualizar dinamicamente os dados da música atual (nome, artista, imagem, etc.).

Além disso, o script controla a alternância de ícones de volume e reprodução e garante que a próxima música toque automaticamente quando a atual termina.
 Ele conecta a interação do usuário com os elementos visuais da página e a lógica de reprodução de áudio, desempenhando um papel essencial na experiência de usuário,
  tornando o player de música totalmente funcional e interativo.
 */


  // Aguarda o carregamento completo do conteúdo da página antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o elemento que contém os controles do player (play, pause, next, prev, etc.)
    const controls = document.querySelector("#controls");
    
    // Seleciona o botão de play/pause pelo ID
    const btnPlay = document.querySelector("#play-control");
    
    // Inicializa o índice da música atual como 0 (primeira música da lista)
    let index = 0; // Índice da música atual
    
    // Variável para armazenar a música que está sendo reproduzida atualmente
    let currentMusic = null;
    
    // Variável que indica se a música está tocando ou não (inicialmente não está tocando)
    let isPlaying = false; // Estado inicial: não está tocando
    
    // Array que irá armazenar todas as músicas disponíveis para reprodução
    const audios = []; // Array para armazenar as músicas

    /**
     * Função para converter o tempo de segundos para o formato "MM:SS"
     * @param {number} time - Tempo em segundos
     * @returns {string} - Tempo no formato "MM:SS"
     */
    function secondsToMinutes(time) {
        const minutes = Math.floor(time / 60); // Calcula os minutos
        const seconds = Math.floor(time % 60); // Calcula os segundos restantes
        // Retorna a string formatada com dois dígitos para minutos e segundos
        return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    }

    /**
     * Função para atualizar as informações da música atual na interface do usuário
     */
    function updateDataMusic() {
        // Atualiza a variável currentMusic com a música no índice atual
        currentMusic = audios[index];
        
        // Atualiza a imagem da música na interface
        document.querySelector("#currentImg").src = currentMusic.image;
        
        // Atualiza o nome da música na interface
        document.querySelector("#currentName").innerText = currentMusic.name;
        
        // Atualiza o nome do artista na interface
        document.querySelector("#currentArtist").innerText = currentMusic.artist;
        
        // Define o volume do controle de volume com base no volume da música (0 a 100)
        document.querySelector("#volume").value = currentMusic.audio.volume * 100; // Define o volume

        // Seleciona a barra de progresso e os elementos que exibem a duração atual e total da música
        const progressbar = document.querySelector("#progressbar");
        const textCurrentDuration = document.querySelector("#current-duration");
        const textTotalDuration = document.querySelector("#total-duration");

        // Define o valor máximo da barra de progresso como a duração total da música
        progressbar.max = currentMusic.audio.duration;
        
        // Atualiza o texto que mostra a duração total da música
        textTotalDuration.innerText = secondsToMinutes(currentMusic.audio.duration);

        // Atualiza a barra de progresso conforme a música avança
        currentMusic.audio.ontimeupdate = function () {
            // Atualiza o tempo atual da música na interface
            textCurrentDuration.innerText = secondsToMinutes(currentMusic.audio.currentTime);
            
            // Atualiza a posição da barra de progresso
            progressbar.valueAsNumber = currentMusic.audio.currentTime;
        };

        // Define o que acontece quando a música termina
        currentMusic.audio.onended = function () {
            // Avança para a próxima música no array (volta ao início se for a última)
            index = (index + 1) % audios.length;
            
            // Atualiza os dados da nova música
            updateDataMusic();
            
            // Inicia a reprodução da nova música
            playMusic();
        };
    }

    /**
     * Função para tocar a música atual
     */
    function playMusic() {
        if (currentMusic) { // Verifica se há uma música atual selecionada
            currentMusic.audio.play(); // Inicia a reprodução da música
            // Troca o ícone do botão de play para pause
            btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
            isPlaying = true; // Atualiza o estado para 'tocando'
        }
    }

    /**
     * Função para pausar a música atual
     */
    function pauseMusic() {
        if (currentMusic) { // Verifica se há uma música atual selecionada
            currentMusic.audio.pause(); // Pausa a reprodução da música
            // Troca o ícone do botão de pause para play
            btnPlay.classList.replace("bi-pause-fill", "bi-play-fill");
            isPlaying = false; // Atualiza o estado para 'não tocando'
        }
    }

    /**
     * Função para inicializar o array de músicas a partir da tabela na página
     */
    function initializeAudios() {
        
        const musicRows = document.querySelectorAll(".musics");
        
       
        musicRows.forEach((row) => {
          
            const name = row.children[1].innerText.trim();
            
            
            const artist = row.children[2].innerText.trim();
            
            
            const image = row.children[0].querySelector("img").src;
            
            
            const audioElement = row.querySelector("audio");
            
            
            audios.push({
                name,
                artist,
                image,
                audio: audioElement,
            });
        });

        // Se houver músicas no array, atualiza os dados da primeira música
        if (audios.length > 0) {
            updateDataMusic();
        }
    }

    // Chama a função para inicializar as músicas quando a página é carregada
    initializeAudios();

    /**
     * Adiciona um 'listener' de clique aos controles do player
     * Isso permite detectar quando o usuário clica em botões como play, pause, next, prev, etc.
     */
    controls.addEventListener("click", function (event) {
        // Usa 'closest' para garantir que o clique seja no elemento <i> com o ID correto
        const control = event.target.closest("i");
        
        // Se o clique não foi em um controle válido, não faz nada
        if (!control) return; // Se não for um controle, sai da função

        // Obtém o ID do controle clicado
        const controlId = control.id;

        // Usa uma estrutura 'switch' para executar ações com base no ID do controle
        switch (controlId) {
            case "play-control":
                if (!currentMusic) return; // Se não houver música atual, não faz nada
                
                // Alterna entre tocar e pausar a música
                if (!isPlaying) {
                    playMusic(); // Toca a música
                } else {
                    pauseMusic(); // Pausa a música
                }
                break;

            case "next-control":
                if (audios.length === 0) return; // Se não houver músicas, não faz nada
                
                currentMusic.audio.pause(); // Pausa a música atual
                // Incrementa o índice e usa módulo para voltar ao início se for a última música
                index = (index + 1) % audios.length;
                updateDataMusic(); // Atualiza os dados da nova música
                playMusic(); // Toca a nova música
                break;

            case "prev-control":
                if (audios.length === 0) return; // Se não houver músicas, não faz nada
                
                currentMusic.audio.pause(); // Pausa a música atual
                // Decrementa o índice e usa módulo para ir para a última música se estiver na primeira
                index = (index - 1 + audios.length) % audios.length;
                updateDataMusic(); // Atualiza os dados da nova música
                playMusic(); // Toca a nova música
                break;

            case "vol-icon":
                if (!currentMusic) return; // Se não houver música atual, não faz nada
                
                // Alterna o estado de mudo (muted) da música
                currentMusic.audio.muted = !currentMusic.audio.muted;
                
                // Atualiza o ícone de volume com base no estado de mudo
                if (currentMusic.audio.muted) {
                    control.classList.replace(
                        "bi-volume-up-fill",
                        "bi-volume-mute-fill"
                    );
                } else {
                    control.classList.replace(
                        "bi-volume-mute-fill",
                        "bi-volume-up-fill"
                    );
                }
                break;

            default:
                break; // Para outros casos, não faz nada
        }
    });

    /**
     * Adiciona um 'listener' para o controle de volume
     * Isso permite ajustar o volume da música conforme o usuário move a barra de volume
     */
    const volumeControl = document.querySelector("#volume");
    volumeControl.addEventListener("input", function (event) {
        if (!currentMusic) return; // Se não houver música atual, não faz nada
        
        // Ajusta o volume da música com base no valor da barra (0 a 100)
        currentMusic.audio.volume = event.target.valueAsNumber / 100;
    });

    /**
     * Adiciona um 'listener' para a barra de progresso
     * Isso permite que o usuário avance ou retroceda na música movendo a barra de progresso
     */
    const progressbar = document.querySelector("#progressbar");
    progressbar.addEventListener("input", function (event) {
        if (!currentMusic) return; // Se não houver música atual, não faz nada
        
        // Ajusta o tempo atual da música com base no valor da barra de progresso
        currentMusic.audio.currentTime = event.target.valueAsNumber;
    });
});
