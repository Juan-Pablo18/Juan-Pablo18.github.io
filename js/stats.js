/* ==================================================
   ESTATÍSTICAS
   Responsável: Jessica Giovana
   - Contadores de tarefas totais e concluídas
================================================== */

function atualizarEstatisticas(tarefas) {
  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  const elementoTotal = document.getElementById("stat-total");
  const elementoConcluidas = document.getElementById("stat-concluidas");

  elementoTotal.textContent = total === 1 ? "1 tarefa" : `${total} tarefas`;
  elementoConcluidas.textContent =
    concluidas === 1 ? "1 concluída" : `${concluidas} concluídas`;
}
