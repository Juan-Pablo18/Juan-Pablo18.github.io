# TaskFlow — Gerenciador de Tarefas

Projeto de checklist de tarefas em HTML, CSS e JavaScript puro (sem frameworks),
organizado em módulos por responsabilidade da equipe.

## Como rodar

Basta abrir o arquivo `index.html` no navegador (não precisa de servidor nem de instalação).
Se preferir usar um servidor local, qualquer extensão do tipo "Live Server" no VS Code funciona.

## Estrutura do projeto

```
taskflow/
├── index.html
├── css/
│   ├── reset.css
│   ├── style.css
│   └── dark-mode.css
└── js/
    ├── storage.js
    ├── state.js
    ├── taskItem.js
    ├── render.js
    ├── stats.js
    ├── filters.js
    ├── form.js
    └── main.js
```

A ordem dos `<script>` no `index.html` importa: cada módulo depende de funções
globais definidas nos arquivos carregados antes dele.

## Divisão de responsabilidades

| # | Responsável | Frente | Arquivo(s) |
|---|---|---|---|
| 1 | **Rafa** (líder) | Setup do projeto, estrutura semântica (header, form, lista, footer), inicialização e conexão entre módulos, coordenação dos merges | `index.html`, `js/main.js`, `js/state.js` |
| 2 | **Ingrid Camilly** | Formulário de adicionar tarefa: captura do `<input>`, evento `submit`, validação de campo vazio, limpeza do campo após adicionar | `js/form.js` |
| 3 | **Joao Vitor Davi** | Criação do elemento HTML de cada tarefa via `document.createElement`, evento de clique para marcar como concluída, evento do botão excluir | `js/taskItem.js`, `js/render.js` |
| 4 | **Jessica Giovana** | Contadores de tarefas totais/concluídas, mensagem "Nenhuma tarefa cadastrada" quando a lista está vazia | `js/stats.js` |
| 5 | **Erik Jadson** | CSS geral, responsividade, Dark Mode (toggle de classe no `<body>`) | `css/style.css`, `css/reset.css`, `css/dark-mode.css` |
| 6 | **Juan Heitor** | Botão "Excluir todas", campo de busca (filtro por texto digitado), filtros Todas/Pendentes/Concluídas | `js/filters.js` |
| 7 | **Kaique Matheus** | `localStorage` (salvar/carregar tarefas), editar tarefa existente, data de criação, prioridade (Baixa/Média/Alta) e ordenação por prioridade | `js/storage.js` |

## Funcionalidades implementadas

- Adicionar tarefa (com prioridade Baixa / Média / Alta)
- Marcar/desmarcar tarefa como concluída
- Editar tarefa (duplo clique no texto ou botão ✎)
- Excluir tarefa individual e excluir todas de uma vez
- Buscar tarefas por texto
- Filtrar por Todas / Pendentes / Concluídas
- Contagem de tarefas totais e concluídas
- Persistência em `localStorage` (as tarefas continuam salvas ao recarregar a página)
- Ordenação automática por prioridade
- Modo escuro com preferência salva

## Fluxo de dados (resumo)

```
storage.js  →  state.js  →  form.js / filters.js  →  render.js  →  taskItem.js / stats.js
   ↑                                                       │
   └───────────────────── salvarTarefas() ─────────────────┘
```

1. `storage.js` carrega as tarefas salvas e expõe `salvarTarefas` / `carregarTarefas`.
2. `state.js` mantém o array `tarefas` em memória e as funções que o alteram.
3. `form.js` e `filters.js` capturam a interação do usuário.
4. `render.js` decide o que aparece na tela, chamando `taskItem.js` (monta cada item) e `stats.js` (atualiza os contadores).
5. Toda alteração de estado chama `salvarTarefas()`, garantindo que nada se perca ao recarregar.
