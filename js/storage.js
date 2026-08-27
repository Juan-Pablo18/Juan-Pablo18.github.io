/* ==================================================
   PERSISTÊNCIA (localStorage)
   Responsável: Kaique Matheus
   - Salvar / carregar tarefas
   - Ordenação por prioridade
   - Preferência de modo escuro
================================================== */

const CHAVE_TAREFAS = "taskflow_tarefas";
const CHAVE_MODO_ESCURO = "taskflow_modo_escuro";

// Salva o array de tarefas no navegador
function salvarTarefas(tarefas) {
  try {
    localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
  } catch (erro) {
    console.error("Não foi possível salvar as tarefas:", erro);
  }
}

// Recupera as tarefas salvas (ou retorna um array vazio)
function carregarTarefas() {
  try {
    const dados = localStorage.getItem(CHAVE_TAREFAS);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Não foi possível carregar as tarefas:", erro);
    return [];
  }
}

// Peso de cada prioridade, usado para ordenação
const PESO_PRIORIDADE = { alta: 3, media: 2, baixa: 1 };

// Retorna uma nova lista ordenada da prioridade mais alta para a mais baixa
function ordenarPorPrioridade(tarefas) {
  return [...tarefas].sort(
    (a, b) => PESO_PRIORIDADE[b.prioridade] - PESO_PRIORIDADE[a.prioridade]
  );
}

// Preferência de modo escuro
function salvarPreferenciaModoEscuro(ativo) {
  localStorage.setItem(CHAVE_MODO_ESCURO, ativo ? "1" : "0");
}

function carregarPreferenciaModoEscuro() {
  return localStorage.getItem(CHAVE_MODO_ESCURO) === "1";
}
