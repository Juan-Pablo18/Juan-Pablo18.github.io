# Pauta — Landing Page

Landing page da Pauta, agenda/checklist para empresas, academia e dia a dia.

## Como rodar

Basta abrir o arquivo `index.html` no navegador. Não precisa de instalação
nem de servidor.

## Estrutura do projeto

```
pauta-site/
├── index.html        → estrutura da página (header, hero, seções, footer)
├── css/
│   └── style.css      → design tokens, layout, componentes, responsividade
└── js/
    └── main.js         → checklist interativo do herói + revelação ao rolar
```

## Sobre o checklist do herói

O card de destaque na primeira seção é um checklist funcional de verdade:
possui abas (Empresa / Academia / Dia a dia), permite adicionar uma tarefa
pelo botão "+", marcar como concluída e excluir. Os dados ficam apenas em
memória (não usam `localStorage`), servindo como demonstração do produto.
