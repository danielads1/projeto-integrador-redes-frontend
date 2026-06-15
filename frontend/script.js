/**
 * script.js — VidaSaudável v2.0
 * Projeto Integrador: Redes de Computadores e Desenvolvimento Front-End
 *
 * Funcionalidades:
 * 1. Dicas aleatórias (DOM + evento + array)
 * 2. Calculadora de IMC (cálculo + validação + DOM)
 * 3. Barra de progresso animada no resultado do IMC (estilo dinâmico)
 * 4. Cards expansíveis ao clicar (evento + manipulação de classe)
 * 5. Relógio e data em tempo real (setInterval + Date)
 */

// ── 1. DICAS ALEATÓRIAS ──────────────────────────────────────
const dicas = [
  "💧 Beba pelo menos 8 copos de água por dia para manter o corpo hidratado.",
  "🥦 Inclua vegetais verdes escuros em pelo menos uma refeição por dia.",
  "🚶 Uma caminhada de 30 minutos reduz em 35% o risco de doenças cardíacas.",
  "😴 Dormir bem melhora humor, memória e sistema imunológico.",
  "🧘 5 minutos de respiração profunda pela manhã reduzem o estresse.",
  "🍎 Substitua lanches industrializados por frutas frescas.",
  "📵 Evite o celular pelo menos 30 minutos antes de dormir.",
  "🏋️ Treinar 3 vezes por semana já traz benefícios perceptíveis.",
  "☀️ A exposição ao sol pela manhã ajuda na produção de vitamina D.",
  "🍽️ Comer devagar e mastigar bem melhora a digestão e evita excessos.",
  "🧂 Reduza o consumo de sal — o excesso eleva a pressão arterial.",
  "🫀 Consulte seu médico pelo menos uma vez por ano, mesmo sem sintomas.",
];

let ultimaDicaIndex = -1;

// Exibe uma dica aleatória diferente da anterior
function mostrarDica() {
  let novoIndex;
  do {
    novoIndex = Math.floor(Math.random() * dicas.length);
  } while (novoIndex === ultimaDicaIndex);

  ultimaDicaIndex = novoIndex;

  // Animação de fade ao trocar o texto
  const el = document.getElementById("dica-texto");
  el.style.opacity = "0";
  setTimeout(function () {
    el.textContent = dicas[novoIndex];
    el.style.transition = "opacity 0.4s";
    el.style.opacity = "1";
  }, 180);
}


// ── 2. CALCULADORA DE IMC ────────────────────────────────────
function calcularIMC() {
  const nome     = document.getElementById("nome").value.trim();
  const pesoStr  = document.getElementById("peso").value;
  const altStr   = document.getElementById("altura").value;

  // Validação: campos obrigatórios
  if (!pesoStr || !altStr) {
    alert("⚠️ Preencha o peso e a altura antes de calcular!");
    return;
  }

  const peso   = parseFloat(pesoStr);
  const altura = parseFloat(altStr);

  // Validação: valores lógicos
  if (peso <= 0 || altura <= 0) {
    alert("⚠️ Os valores devem ser maiores que zero.");
    return;
  }

  // Cálculo: IMC = peso / (altura em metros)²
  const alturaM = altura / 100;
  const imc     = peso / (alturaM * alturaM);

  const { classe, cor, progresso } = classificarIMC(imc);

  // Atualiza os elementos do DOM com o resultado
  const elNum    = document.getElementById("resultado-imc");
  const elClasse = document.getElementById("resultado-classe");
  const elNome   = document.getElementById("resultado-nome");
  const elBarra  = document.getElementById("result-indicator");
  const container = document.getElementById("resultado-container");

  elNum.textContent    = imc.toFixed(1);
  elClasse.textContent = classe;
  elNome.textContent   = nome ? "Olá, " + nome + "!" : "";

  // 3. MUDANÇA DE ESTILO DINÂMICA: cor e barra de progresso
  elNum.style.color       = cor;
  elBarra.style.width     = progresso + "%";
  elBarra.style.background = cor;
  container.style.borderColor = cor;
}

// Classifica o IMC e retorna classe, cor e % de progresso para a barra
function classificarIMC(imc) {
  if (imc < 18.5) return { classe: "Abaixo do peso",        cor: "#2196f3", progresso: 15 };
  if (imc < 25)   return { classe: "Peso normal ✅",         cor: "#2d8f56", progresso: 35 };
  if (imc < 30)   return { classe: "Sobrepeso ⚠️",           cor: "#f0a500", progresso: 58 };
  if (imc < 35)   return { classe: "Obesidade grau I",       cor: "#ff7043", progresso: 72 };
  if (imc < 40)   return { classe: "Obesidade grau II",      cor: "#e53935", progresso: 85 };
                   return { classe: "Obesidade grau III ⚠️",  cor: "#b71c1c", progresso: 98 };
}

// Limpa o formulário e reseta o resultado
function limparCalc() {
  document.getElementById("nome").value    = "";
  document.getElementById("peso").value    = "";
  document.getElementById("altura").value  = "";

  document.getElementById("resultado-imc").textContent    = "—";
  document.getElementById("resultado-classe").textContent = "Preencha os campos ao lado";
  document.getElementById("resultado-nome").textContent   = "";
  document.getElementById("resultado-imc").style.color    = "var(--verde)";
  document.getElementById("result-indicator").style.width = "0%";
  document.getElementById("resultado-container").style.borderColor = "#cce8d8";
}


// ── 4. CARDS EXPANSÍVEIS ─────────────────────────────────────
// Ao clicar num card, ele expande mostrando a lista de dicas
function expandirCard(card) {
  const jaAberto = card.classList.contains("expandido");
  // Fecha todos os cards
  document.querySelectorAll(".card").forEach(function(c) {
    c.classList.remove("expandido");
  });
  // Abre o clicado (se não estava aberto)
  if (!jaAberto) {
    card.classList.add("expandido");
  }
}


// ── 5. RELÓGIO E DATA EM TEMPO REAL ──────────────────────────
const diasSemana = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

function atualizarRelogio() {
  const agora    = new Date();
  const horas    = String(agora.getHours()).padStart(2, "0");
  const minutos  = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");
  const dia      = agora.getDate();
  const diaSem   = diasSemana[agora.getDay()];
  const mes      = meses[agora.getMonth()];
  const ano      = agora.getFullYear();

  const elRel  = document.getElementById("relogio");
  const elData = document.getElementById("data-atual");

  if (elRel)  elRel.textContent  = horas + ":" + minutos + ":" + segundos;
  if (elData) elData.textContent = diaSem + ", " + dia + " de " + mes + " de " + ano;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);


// ── INICIALIZAÇÃO ─────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", function () {
  mostrarDica(); // Exibe uma dica ao carregar a página
});