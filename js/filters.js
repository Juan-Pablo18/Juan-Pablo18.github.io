/* ==================================================
   FILTROS E BUSCA
   Responsável: Juan Heitor
   - Botão "Excluir todas"
   - Campo de busca por texto
   - Filtros: Todas / Pendentes / Concluídas
================================================== */

let filtroAtual = "todas";
let termoBusca = "";

// Recebe o array completo de tarefas e devolve a versão filtrada
function aplicarFiltros(tarefas) {
  let resultado = tarefas;

  if (filtroAtual === "pendentes") {
    resultado = resultado.filter((tarefa) => !tarefa.concluida);
  } else if (filtroAtual === "concluidas") {
    resultado = resultado.filter((tarefa) => tarefa.concluida);
  }

  if (termoBusca.trim() !== "") {
    const termo = termoBusca.trim().toLowerCase();
    resultado = resultado.filter((tarefa) =>
      tarefa.texto.toLowerCase().includes(termo)
    );
  }

  return resultado;
}

// Liga os eventos dos filtros, da busca e do botão "excluir todas"
function iniciarFiltros() {
  const botoesFiltro = document.querySelectorAll(".filtro-btn");

  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoesFiltro.forEach((b) => b.classList.remove("ativo"));
      botao.classList.add("ativo");
      filtroAtual = botao.dataset.filtro;
      renderizarTarefas();
    });
  });

  const inputBusca = document.getElementById("input-busca");
  inputBusca.addEventListener("input", (evento) => {
    termoBusca = evento.target.value;
    renderizarTarefas();
  });

  const botaoExcluirTodas = document.getElementById("btn-excluir-todas");
  botaoExcluirTodas.addEventListener("click", () => {
    if (obterTarefas().length === 0) return;

    const confirmar = confirm(
      "Excluir todas as tarefas? Essa ação não pode ser desfeita."
    );
    if (confirmar) {
      excluirTodasTarefas();
      renderizarTarefas();
    }
  });
}
