/* ==================================================
   ESTADO DA APLICAÇÃO
   Responsável: Rafa (Líder)
   - Array de tarefas
   - Funções de adicionar / excluir / alternar status
   - Depende de storage.js (carregarTarefas, salvarTarefas, ordenarPorPrioridade)
================================================== */

// Estado inicial: recupera tarefas já salvas no navegador
let tarefas = carregarTarefas();

// Adiciona uma nova tarefa ao estado
function adicionarTarefa(texto, prioridade) {
  const novaTarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false,
    prioridade: prioridade || "media",
    dataCriacao: new Date().toISOString(),
  };

  tarefas.push(novaTarefa);
  tarefas = ordenarPorPrioridade(tarefas);
  salvarTarefas(tarefas);
}

// Remove uma tarefa pelo id
function excluirTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  salvarTarefas(tarefas);
}

// Remove todas as tarefas
function excluirTodasTarefas() {
  tarefas = [];
  salvarTarefas(tarefas);
}

// Alterna o status concluída/pendente de uma tarefa
function alternarStatusTarefa(id) {
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
  );
  salvarTarefas(tarefas);
}

// Atualiza o texto de uma tarefa existente
function editarTarefa(id, novoTexto) {
  const texto = novoTexto.trim();
  if (!texto) return;

  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, texto } : tarefa
  );
  salvarTarefas(tarefas);
}

// Retorna o estado atual das tarefas
function obterTarefas() {
  return tarefas;
}
