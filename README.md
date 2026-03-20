# Evidências
<img width="1839" height="1050" alt="image" src="https://github.com/user-attachments/assets/ed83c6aa-788e-4930-bc62-298bf816a478" />



# VueShop — Atividade 2 | Vue.js & Options API

Projeto desenvolvido como parte da Atividade 2 da disciplina Full Stack, cujo objetivo foi construir a interface de um e-commerce utilizando Vue.js com Options API, integrando as Models criadas na Atividade 1.

## Sobre o projeto

A ideia foi criar uma loja simples onde o usuário consegue visualizar produtos, adicionar ao carrinho e gerenciar as quantidades. Fui além da entrega mínima e implementei todos os desafios propostos.

## Funcionalidades

- Listagem de produtos com nome, preço e categoria
- Adicionar produto ao carrinho (incrementa quantidade se já existir)
- Remover uma unidade por vez
- Excluir o item inteiro do carrinho
- Resumo do carrinho com total de itens e preço final em tempo real

## Estrutura do projeto

```
src/
├── models/
│   ├── Category.ts   — interface da categoria
│   ├── Product.ts    — interface do produto
│   ├── CartItem.ts   — interface que une produto e quantidade
│   └── Cart.ts       — classe com toda a lógica do carrinho
│
├── components/
│   ├── ProductCard.vue   — exibe um produto e emite evento ao adicionar
│   └── CartSummary.vue   — painel lateral com os itens e totais
│
└── App.vue           — componente pai, orquestra tudo com Options API
```

## Decisão técnica: reatividade com classe

Um ponto que tive que resolver: o Vue não consegue observar automaticamente os itens dentro de uma classe com atributo `private`. Então, criei um array `reactiveItems` no `data()` que é atualizado via `syncItems()` sempre que o carrinho muda. Isso mantém a lógica de negócio dentro da classe `Cart` e deixa o componente responsável apenas pela parte visual — separação de responsabilidades na prática.

## Como rodar

```sh
npm install
npm run dev
```

## Tecnologias

- Vue 3 com Options API
- TypeScript (sem `any`)
- Vite
