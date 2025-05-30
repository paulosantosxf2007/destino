const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            textos[j].classList.remove("ativo");
        }
        botoes[i].classList.add("ativo");
        textos[i].classList.add("ativo");
    }
}

// Defina as datas dos objetivos para o FUTURO
// Ajuste conforme seus objetivos reais
const tempoObjetivo1 = new Date("2026-12-01T00:00:00"); // Ex: minha casa em 1 de junho de 2026
const tempoObjetivo2 = new Date("2026-12-01T00:00:00"); // Ex: casar em 1 de dezembro de 2026
const tempoObjetivo3 = new Date("2026-09-01T00:00:00"); // Ex: Automóvel em 1 de janeiro de 2029
const tempoObjetivo4 = new Date("2037-01-01T00:00:00"); // Ex: Filho em 1 de janeiro de 2045

const tempos = [tempoObjetivo1, tempoObjetivo2, tempoObjetivo3, tempoObjetivo4];

function calculaTempo(tempoObjetivo) {
    let tempoAtual = new Date();
    let tempoFinal = tempoObjetivo - tempoAtual; // Diferença em milissegundos

    // Se o tempoFinal for negativo (data já passou), zera tudo
    if (tempoFinal < 0) {
        return [0, 0, 0, 0, 0, 0, 0]; // Anos, Meses, Semanas, Dias, Horas, Minutos, Segundos
    }

    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    // Para calcular anos, meses e semanas, vamos usar as divisões de segundos para ser mais preciso
    // (Aproximação de anos e meses podem causar imprecisões com calendários reais)
    // No entanto, para contadores de longo prazo, essas aproximações são comuns.

    let anos = Math.floor(dias / 365.25); // Considera anos bissextos
    dias %= 365.25;

    let meses = Math.floor(dias / 30.44); // Média de dias por mês
    dias %= 30.44;

    let semanas = Math.floor(dias / 7);
    dias %= 7;

    // Calcula as horas, minutos e segundos restantes
    horas %= 24;
    minutos %= 60;
    segundos %= 60;

    return [
        Math.floor(anos),
        Math.floor(meses),
        Math.floor(semanas),
        Math.floor(dias),
        Math.floor(horas),
        Math.floor(minutos),
        Math.floor(segundos)
    ];
}

function atualizaCronometro() {
    const contadores = document.querySelectorAll(".contador"); // Seleciona todos os contadores

    for (let i = 0; i < contadores.length; i++) {
        const digitos = contadores[i].querySelectorAll(".contador-digito-numero");
        const tempoRestante = calculaTempo(tempos[i]);

        // Atualiza os valores na tela
        digitos[0].textContent = tempoRestante[0]; // Anos
        digitos[1].textContent = tempoRestante[1]; // Meses
        digitos[2].textContent = tempoRestante[2]; // Semanas
        digitos[3].textContent = tempoRestante[3]; // Dias
        digitos[4].textContent = tempoRestante[4]; // Horas
        digitos[5].textContent = tempoRestante[5]; // Minutos
        digitos[6].textContent = tempoRestante[6]; // Segundos

        // Opcional: Se o tempo acabou, pode mudar a cor ou texto
        if (tempoRestante.every(val => val === 0)) {
            // contadores[i].querySelector(".contador-digito-texto").textContent = "ALCANÇADO!";
        }
    }
}

function comecaCronometro() {
    atualizaCronometro(); // Chama uma vez para exibir imediatamente
    setInterval(atualizaCronometro, 1000); // Atualiza a cada segundo
}

comecaCronometro();