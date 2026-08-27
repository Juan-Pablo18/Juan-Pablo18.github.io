/* ==================================================
   CRIAÇÃO DO ELEMENTO DE TAREFA
   Responsável: Joao Vitor Davi
   - Monta o <li> de cada tarefa via document.createElement
   - Evento de clique para concluir, editar e excluir
================================================== */

const ROTULOS_PRIORIDADE = { baixa: "Baixa", media: "Média", alta: "Alta" };

// Formata a data de criação para o padrão brasileiro
function formatarData(isoString) {
  const data = new Date(isoString);
  return data.toLocaleDateString("pt-BR");
}

// Cria o elemento HTML completo de uma tarefa
function criarElementoTarefa(tarefa) {
  const li = document.createElement("li");
  li.className = "tarefa" + (tarefa.concluida ? " concluida" : "");
  li.dataset.id = tarefa.id;

  // Checkbox de concluir/reabrir
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "tarefa-checkbox";
  checkbox.checked = tarefa.concluida;
  checkbox.setAttribute("aria-label", "Marcar tarefa como concluída");
  checkbox.addEventListener("change", () => {
    alternarStatusTarefa(tarefa.id);
    renderizarTarefas();
  });

  // Texto da tarefa (duplo clique para editar)
  const texto = document.createElement("span");
  texto.className = "tarefa-texto";
  texto.textContent = tarefa.texto;
  texto.title = "Clique duas vezes para editar";
  texto.addEventListener("dblclick", () => ativarEdicao(li, texto, tarefa));

  // Etiqueta de prioridade
  const prioridade = document.createElement("span");
  prioridade.className = "tarefa-prioridade prioridade-" + tarefa.prioridade;
  prioridade.textContent = ROTULOS_PRIORIDADE[tarefa.prioridade];

  // Data de criação
  const data = document.createElement("span");
  data.className = "tarefa-data";
  data.textContent = formatarData(tarefa.dataCriacao);

  // Botões de ação
  const acoes = document.createElement("div");
  acoes.className = "tarefa-acoes";

  const botaoEditar = document.createElement("button");
  botaoEditar.type = "button";
  botaoEditar.textContent = "✎";
  botaoEditar.title = "Editar tarefa";
  botaoEditar.setAttribute("aria-label", "Editar tarefa");
  botaoEditar.addEventListener("click", () => ativarEdicao(li, texto, tarefa));

  const botaoExcluir = document.createElement("button");
  botaoExcluir.type = "button";
  botaoExcluir.textContent = "✕";
  botaoExcluir.title = "Excluir tarefa";
  botaoExcluir.setAttribute("aria-label", "Excluir tarefa");
  botaoExcluir.addEventListener("click", () => {
    excluirTarefa(tarefa.id);
    renderizarTarefas();
  });

  acoes.appendChild(botaoEditar);
  acoes.appendChild(botaoExcluir);

  li.appendChild(checkbox);
  li.appendChild(texto);
  li.appendChild(prioridade);
  li.appendChild(data);
  li.appendChild(acoes);

  return li;
}

// Troca o <span> de texto por um <input> editável
function ativarEdicao(li, spanTexto, tarefa) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = tarefa.texto;
  input.className = "tarefa-texto-input";
  input.maxLength = 80;

  li.replaceChild(input, spanTexto);
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);

  function salvarEdicao() {
    editarTarefa(tarefa.id, input.value);
    renderizarTarefas();
  }

  input.addEventListener("blur", salvarEdicao);
  input.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") input.blur();
  });
}
