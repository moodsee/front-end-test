# Trabalhe na Próxima Porta

Nós acreditamos que comprar imóveis deve ser tão simples como comprar qualquer coisa on-line.

Vamos direto ao ponto!

## O queremos saber

Queremos saber o nível que está o seu conhecimento e o quão engajado você está em desbravar novos desafios.

## Requisitos básicos

- Fazer um fork deste projeto
- Submeter um pull request após finalização do teste
- De prefência em escrever usando VueJS com NuxtJS
- Usar a Lib [Element-io](https://element.eleme.io/#/en-US)
- Estruturar o projeto com README de como executar em Development
- Para design pode seguir o seu coração

## Objetivo

Desenvolver um painel (área logada) onde o usuário entrará com o e-mail e consiga listar, cadastrar e remover seus endereços. A sessão deve ser controlada pelo cookie e seu dados salvos em localStorage.

## Teste

- Desenvolver uma área logada onde o usuário entre apenas com o `e-mail` e após autenticar deve ser salvo no `cookie`
- Exibir o e-mail no cabeçalho com a seguinte frase: `Olá email@seuemail.com, não é você? (sair)` a ação "sair" tem que remover o usuário da área logada, não esquece do cookie!
- Se o usuário estiver logado ele não poderá acessar a página de `/login` 
- Se o usuário não estiver logado ele não poderá acessar a página de `/minha-conta`
- Na tela inicial do `/minha-conta` exibir um `form` para cadastrar endereços
  - Usar a nossa própria `api` -> [Buscar endereços](https://dev-addresses-api.proximaporta.com/v1/postal-code/14030360)
  - Deve ser validado se o CEP não existir, exibir um feedback para o usuário e salvar o CEP inválido em uma variável de cache (Obs. Variável deve ser um Array)
  - Antes de verificar o CEP na `api` consultar a variável de cache, se CEP estiver nela exibir feedback de "CEP inválido"
  - Para CEP válidos preencher os demais campos automático (street_name, neighborhood_name, city_name, state_initials)
  - Validar campos obrigatórios (postal_code, street_name, street_number, neighborhood_name, city_name, state_initials)
  - Salvar o Endereço no `localStorage` como um `Array` com o `e-mail` do usuário como chave principal
  - Cadastrar um novo endereço e adicionar no `Array` que está em `localStorage`
  - Ter a opção de deletar endereços
    - Remover item do `Array`
  - Toda vez que o usuário entrar trazer os endereços cadastrados (e-mail é a chave principal no `localStorage`)
  
## Finalização
  
Boa sorte!
Sempre existirá uma Próxima Porta para novos desafios.

Qualquer dúvida pode enviar um e-mail para: hebert@proximaporta.com ou abrir uma issue aqui.
