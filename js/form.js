/* ==================================================
   FORMULÁRIO DE ADICIONAR TAREFA
   Responsável: Ingrid Camilly
   - Captura do <input>
   - Evento submit
   - Validação de campo vazio
   - Limpeza do campo após adicionar
================================================== */

function iniciarFormulario() {
  const formulario = document.getElementById("form-tarefa");
  const inputTarefa = document.getElementById("input-tarefa");
  const selectPrioridade = document.getElementById("select-prioridade");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = inputTarefa.value.trim();

    // Validação: não permite adicionar tarefa vazia
    if (texto === "") {
      inputTarefa.focus();
      return;
    }

    adicionarTarefa(texto, selectPrioridade.value);

    // Limpa o campo e devolve o foco para o input
    inputTarefa.value = "";
    selectPrioridade.value = "media";
    inputTarefa.focus();

    renderizarTarefas();
  });
}
