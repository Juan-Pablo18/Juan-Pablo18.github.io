/* ==================================================
   INICIALIZAÇÃO E CONEXÃO ENTRE MÓDULOS
   Responsável: Rafa (Líder)
   - Liga o alternador de modo escuro
   - Inicializa formulário e filtros
   - Faz a primeira renderização da lista
================================================== */

function iniciarModoEscuro() {
  const botao = document.getElementById("btn-dark-mode");
  const ativo = carregarPreferenciaModoEscuro();

  if (ativo) {
    document.body.classList.add("modo-escuro");
    botao.textContent = "☀️";
  }

  botao.addEventListener("click", () => {
    const estaAtivo = document.body.classList.toggle("modo-escuro");
    botao.textContent = estaAtivo ? "☀️" : "🌙";
    salvarPreferenciaModoEscuro(estaAtivo);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarModoEscuro();
  iniciarFormulario();
  iniciarFiltros();
  renderizarTarefas();
});
