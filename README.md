<p align="center">
  <a href="#">
    
  </a>
  <p align="center">
   <img 
     width="350"
     height="250"
     src="https://github.com/NiceColors/Projeto-de-Software-API/blob/main/readmebg.png?raw=true" 
     alt="Logo"
     style="border-radius:20px" 
   >
  </p>
  <h1 align="center"><b>Empresta Aí 😎</b></h1>
  <p align="center">
  API REST feita com <code>Node.js</code>, <code>Express</code>, <code>Prisma</code> e <code>Typescript</code> da disciplina Projeto de Software da UFRRJ - 2022 | <strong>Empresta Aí</strong>.
    <br />
    <a href="#"><strong>emprestaai.vercel.app »</strong></a>
    <br />
  </p>
</p>
O <strong>Empresta Aí</strong> é um sistema de administração de livros feito para bibliotecas de pequeno e médio porte. Seu principal objetivo é facilitar o gerenciamento de livros, produtos e cadastro de clientes para otimizar e automatizar o trabalho que antes era feito manualmente.
<br/>
<br/>

> NOTE: Essa API ainda está em desenvolvimento, a maioria das funcionalidades listadas ainda estão em período de teste e podem sofrer alterações.

# Funcionalidades

_Nota: Links em destaque indicam que a funcionalidade está completa_

**Completos:** _(em fase de testes)_

- **[Livros](#funcionalidades)** - Criação, Listagem, Edição e Remoção.
- **[Usuários](#funcionalidades)** - Criação, Listagem, Edição e Remoção.
- **[Empréstimos](#funcionalidades)** - Criação, Listagem, Edição e Remoção.
- **[Clientes](#funcionalidades)** - Criação, Listagem, Edição e Remoção.

# Guia para desenvolvedores

## Instalação

1. Clone do repositório
   ```sh
   git clone https://github.com/nicecollors/Projeto-de-Software-API.git
   ```
2. Instalação dos pacotes
   ```sh
   yarn ou npm -i
   ```
3. Adicionar o url do BD em `.env` > `DATABASE_URL`
   ```sh
   DATABASE_URL = 'URL_DO_BANCO_DE_DADOS'
   ```
4. Criando migrations com `Prisma`
   ```sh
   npx prisma migrate dev
   ```
5. CLI do prisma `Prisma Studio` e conexão com o BD
   ```sh
   npx prisma studio
   ```
6. Iniciando API
   ```sh
   yarn dev ou npm run dev
   ```

## Arquitetura

A API desse Projeto foi desenvolvida usando Node.js, Express e Typescript utilizando o padrão SOLID.

- Prisma? Dividido em três camadas como núcleo de sua arquitetura, o [Prisma](https://www.prisma.io/) é um ORM com um conjunto de ferramentas para banco de dados de código aberto. 
- Express.
- Typescript.

## Estrutura:

### Aplicação:

- `desktop`: Server: [localhost:3333/](http://localhost:3333).



