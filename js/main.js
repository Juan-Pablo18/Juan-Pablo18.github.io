/* ==================================================
   PAUTA — Interatividade
   Checklist de demonstração (abas, adicionar, concluir,
   excluir) e revelação suave ao rolar a página
================================================== */

  // ----- Ledger demo data (per context) -----
  const contexts = {
    empresa: {
      label: "Empresa",
      items: [
        { txt: "Aprovar orçamento do 3º trimestre", tag: "alta", done: false },
        { txt: "Revisar proposta com o time comercial", tag: "media", done: false },
        { txt: "Responder e-mail da diretoria", tag: "media", done: true },
        { txt: "Organizar pauta da reunião de sexta", tag: "baixa", done: false },
      ]
    },
    academia: {
      label: "Academia",
      items: [
        { txt: "Entregar capítulo 2 da dissertação", tag: "alta", done: false },
        { txt: "Ler artigo indicado pelo orientador", tag: "media", done: false },
        { txt: "Revisar slides da apresentação", tag: "baixa", done: true },
      ]
    },
    pessoal: {
      label: "Dia a dia",
      items: [
        { txt: "Marcar consulta médica", tag: "media", done: false },
        { txt: "Pagar contas do mês", tag: "alta", done: false },
        { txt: "Planejar o fim de semana", tag: "baixa", done: false },
      ]
    }
  };

  let current = "empresa";

  const tagLabel = { alta: "Alta", media: "Média", baixa: "Baixa" };

  const tabsEl = document.getElementById("ledgerTabs");
  const titleEl = document.getElementById("ledgerTitle");
  const countEl = document.getElementById("ledgerCount");
  const listEl = document.getElementById("ledgerList");
  const inputEl = document.getElementById("ledgerInput");
  const addBtn = document.getElementById("ledgerAdd");

  function renderTabs(){
    tabsEl.innerHTML = "";
    Object.keys(contexts).forEach(key => {
      const btn = document.createElement("button");
      btn.className = "ledger-tab" + (key === current ? " active" : "");
      btn.textContent = contexts[key].label;
      btn.addEventListener("click", () => { current = key; render(); });
      tabsEl.appendChild(btn);
    });
  }

  function render(){
    renderTabs();
    const ctx = contexts[current];
    titleEl.textContent = ctx.label;
    const done = ctx.items.filter(i => i.done).length;
    countEl.textContent = done + " de " + ctx.items.length + " concluídas";

    listEl.innerHTML = "";
    if (ctx.items.length === 0){
      const empty = document.createElement("div");
      empty.className = "ledger-empty";
      empty.textContent = "Nenhuma anotação por aqui. Adicione a primeira abaixo.";
      listEl.appendChild(empty);
      return;
    }

    ctx.items.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "ledger-item" + (item.done ? " done" : "");

      const check = document.createElement("div");
      check.className = "check";
      check.setAttribute("role", "checkbox");
      check.setAttribute("aria-checked", item.done ? "true" : "false");
      check.setAttribute("tabindex", "0");
      check.addEventListener("click", () => { item.done = !item.done; render(); });
      check.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); item.done = !item.done; render(); }
      });

      const span = document.createElement("span");
      span.className = "txt";
      span.textContent = item.txt;

      const tag = document.createElement("span");
      tag.className = "tag " + item.tag;
      tag.textContent = tagLabel[item.tag];

      const rm = document.createElement("button");
      rm.className = "rm";
      rm.setAttribute("aria-label", "Excluir tarefa");
      rm.textContent = "✕";
      rm.addEventListener("click", () => { ctx.items.splice(idx, 1); render(); });

      row.appendChild(check);
      row.appendChild(span);
      row.appendChild(tag);
      row.appendChild(rm);
      listEl.appendChild(row);
    });
  }

  function addItem(){
    const val = inputEl.value.trim();
    if (!val) return;
    contexts[current].items.push({ txt: val, tag: "media", done: false });
    inputEl.value = "";
    render();
  }

  addBtn.addEventListener("click", addItem);
  inputEl.addEventListener("keydown", (e) => { if (e.key === "Enter") addItem(); });

  render();

  // ----- subtle scroll reveal -----
  const revealables = document.querySelectorAll("section .wrap > *");
  if ("IntersectionObserver" in window){
    revealables.forEach(el => { el.style.opacity = 0; el.style.transform = "translateY(14px)"; el.style.transition = "opacity .6s ease, transform .6s ease"; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealables.forEach(el => io.observe(el));
  }
