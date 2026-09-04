<h1 align='center'>Estaciona Ai Front</h1>

## Como começar a contribuir
> Leia este documento com atenção e crie sua branch de acordo.

## Pré-requisitos
Para rodar este projeto é necessário ter:
  
  - Uma IDE de sua preferência.
  - <a href='https://git-scm.com/'>Git</a> 
  - <a href='https://nodejs.org/pt-br/download'>Node</a>
  - <a href='https://www.npmjs.com/'>Npm</a> 
  - <a href='https://angular.dev/tools/cli/setup-local'>Angular CLI</a> 

## Instalando o Git
Entre no site oficial do [Git](https://git-scm.com/install/) e siga os passos para o seu respectivo sistema operacional.

## Instalando o Node / Npm
> Este comando abaixo funciona tanto no **terminal do Linux** quanto no **git bash** no Windows.

```bash
# Baixar e instalar o nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Carregar o nvm sem precisar reiniciar o terminal
\. "$HOME/.nvm/nvm.sh"

# Baixar e instalar o Node.js:
nvm install 24

# Verifique a versão do Node.js:
node -v # Deve exibir "v24.14.0".

# Verificar a versão do npm:
npm -v # Deve imprimir "11.9.0".
```

## Instalando Angular CLI
Com Npm instalado rode este comando no terminal:
```bash
# Instalando o angular globalmente(-g)
npm install -g @angular/cli
```

## Como rodar o projeto
1. Clone este repositório.
2. Abra o terminal dentro da pasta do projeto.
3. instale as dependências do projeto com o comando `` npm i ``.
4. Inicie o projeto com o comando `` ng serve -o `` para rodar localmente.

## Estrutura das pastas
```
.
├── .github/
│   ├── CODEOWNERS
│   └── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── bug.md
│       ├── docs.md
│       ├── feature.md
│       └── question.md
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   └── .gitkeep
│   │   │   ├── molecules/
│   │   │   │   └── .gitkeep
│   │   │   └── organisms/
│   │   │       └── .gitkeep
│   │   ├── pages/
│   │   │   └── .gitkeep
│   │   ├── app.config.ts
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.scss
│   │   ├── app.spec.ts
│   │   └── app.ts
│   ├── assets/
│   │   ├── icons/
│   │   │   └── favicon.ico
│   │   └── images/
│   │       └── .gitkeep
│   ├── styles/
│   │   └── styles.scss
│   ├── index.html
│   └── main.ts
├── .editorconfig
├── .gitignore
├── .prettierrc
├── angular.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Convenção de nomenclatura
> Padrão de nomeação que deve ser seguido em todas as etapas de desenvolvimento.

### Linguagem
- Inglês

### Arquivos e pastas
- kebab-case.
- Com exceção dos arquivos na pasta .github que devem ser todos em maiúsculo todas as pastas e arquivos devem permanecer neste padrão.
- Exemplo:

  ```
  ├── .github/
  │   ├── CODEOWNERS
  │   └── PULL_REQUEST_TEMPLATE.md
  └── src/
      └── app/
          └── components/
              └── atoms/
                  └── primary-button/
  ```

### Variáveis e funções
- camelCase.
- Exemplo:

  ```ts
  export class Header {

  isModalOpen = false

  toggleModal = () => {
    this.isModalOpen = !this.isModalOpen    
  }

  }
  ```

### Componentes(componentes, estilos e páginas)
- kebab-case.
- Exemplos:

#### Componentes
  ```
    └── app/
        └── components
            └── organisms
                └── header/
                    ├── header.html
                    ├── header.scss
                    ├── header.spec.ts
                    └── header.ts
  ```

#### Páginas
- Mesma nomeação com o prefixo **page** no final.
  ```
    └─── app/
        └── pages/
            └── coming-soon-page/
  ```

## Requisitos
### Requisitos Funcionais 

### Requisitos Não Funcionais

## Ferramentas utilizadas
![Angular logo](/src/assets/icons/angular-logo.svg)
![Vite logo](/src/assets/icons/vite-logo.svg)
![Vitest logo](/src/assets/icons/vitest-logo.svg)
![Html logo](/src/assets/icons/html-logo.svg)
![Sass logo](/src/assets/icons/sass-logo.svg)
![Typescript logo](/src/assets/icons/typescript-logo.svg)

## Licença
Este projeto é de uso acadêmico e não possui fins comerciais.