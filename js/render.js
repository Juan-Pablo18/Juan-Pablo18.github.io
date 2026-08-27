/* ==================================================
   RENDERIZAÇÃO DA LISTA
   Responsável: Joao Vitor Davi
   - Aplica os filtros atuais e desenha a lista na tela
   - Depende de taskItem.js, filters.js e stats.js
================================================== */

function renderizarTarefas() {
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = "";

  const todasAsTarefas = obterTarefas();
  const tarefasFiltradas = aplicarFiltros(todasAsTarefas);

  if (tarefasFiltradas.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.className = "mensagem-vazia";
    mensagem.textContent =
      todasAsTarefas.length === 0
        ? "Nenhuma tarefa cadastrada."
        : "Nenhuma tarefa encontrada para este filtro.";
    lista.appendChild(mensagem);
  } else {
    tarefasFiltradas.forEach((tarefa) => {
      lista.appendChild(criarElementoTarefa(tarefa));
    });
  }

  atualizarEstatisticas(todasAsTarefas);
}
