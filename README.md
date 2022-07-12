# Desabafe

Um aplicativo para envio de desabafos, criado para o instituto JPCM, pelo grupo AlleyCat, na cadeira de Projeto Integrado I, curso de Sistemas e Mídias Digitais, UFC.

O app está sendo desenvolvido para dispositivos móveis (ios e android), consiste em uma forma dos alunos do instituto enviarem seus desabafos, ou serem redirecionados para possíveis soluções simples do problema, baseando-se em perguntas respondidas pelo usuário.

Equipe: AlleyCat

Participantes: Israel Gomes Carneiro Filho, Kaio Nickollas Feitosa Forte, Nickolas Gabriel Lima Rodrigues, Pedro Davi Vasconcelos Oliveira e Vitor Martins de Oliveira


## Executando
Instale e faça o setup do Android Studio segundo as instruções [aqui](https://reactnative.dev/docs/environment-setup) ou conecte um celular Android com depuração USB ligada.  
Clone o repositório:  
`git clone`  
Installe as dependências:  
`npm install`  
Na pasta root execute:  
`npx react-native start`  
e  
`npx react-native run-android`  

## Mapeamento de funcionalidades
| Requisito  | Descrição | Codificação
| ------------- | ------------- | ------------- |
| RF0001 Login | Tanto para usuário como para administrador entrarem no sistema  | [Front-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/LoginScreen.js#L86-L125), [Back-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/backend/controllers/auth.js#L44-L75) |
| RF0002 Registro | Para o usuário se cadastrar no aplicativo, com email, senha e foto (caso queira) | [Front-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/LoginScreen.js#L86-L125), [Back-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/backend/controllers/auth.js#L4-L42) |
| RF0003 Logout (Encerrar sessão) | Deslogar do aplicativo, indo para tela inicial, podendo também entrar anônimo | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ConfigScreen.js#L69-L76) |
| RF0004 Deletar conta | Apagar a conta do sistema | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ConfigScreen.js#L42-L68) |
| RF0005 Recuperar senha | Para caso o usuário esqueça a senha | Suspenso |
| RF0006 Ao administrador: acesso à tela de registro de mensagens dadas pelo usuário | Tela com todos envios dos usuários, incluindo sua prioridade, dados em tabelas e quantidade de envios por usuário (caso seja anônimo, não terá ela) | [Código](https://github.com/absurd-web/Desabafe/blob/b0f471a59d907bf5d26056f18599fe7dead40d32/components/screens/AdminScreen.js) |
| RF0007 Escolha de prioridade de mensagem | Prioridade de mensagem padrão ou urgente | [Código](https://github.com/absurd-web/Desabafe/blob/b0f471a59d907bf5d26056f18599fe7dead40d32/components/screens/MessageScreen.js#L118) |
| RF0008 Envio de desabafo livre | Caixa de mensagem para o usuário enviar a mensagem independente de opções, texto livre. Para caso o usuário não deseje utilizar as opções predefinidas | [Código](https://github.com/absurd-web/Desabafe/blob/b0f471a59d907bf5d26056f18599fe7dead40d32/components/screens/MessageScreen.js) |
| RF0009 Salvar rascunho de desabafo livre | Caso o usuário não queira enviar a mensagem no momento, mas também não queira apagar o que já está escrito, terá a possibilidade de salvar o rascunho do que já está escrito | [Código](https://github.com/absurd-web/Desabafe/blob/b0f471a59d907bf5d26056f18599fe7dead40d32/components/screens/MessageScreen.js#L47-L49) |
| RF0010 Tela inicial - Escolha de opções de diálogo | A tela inicial, contendo o mascote do aplicativo, terá 4 opções de diálogo por tela, cada uma delas redirecionando para outra tela com outras opções | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ChatScreen.js) |
| RF0011 Tela inicial - Redirecionamento | De acordo com as opções escolhidas pelo usuário, o sistema fará uma análise do caso e devolverá uma possível forma de resolver o problema (vídeo, texto, etc) | Suspenso |
| RF0012 Tela inicial - Retornar à pergunta anterior | Caso o usuário tenha mudado de ideia quanto à opção, ou ache que pressionou a opção errada, poderá retornar à anterior, podendo fazer sua escolha novamente | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/App.js#L15-L22) |
| RF0013 Tela inicial - Confirmar opção | Ao escolher a opção dentre as 4, esta ficará marcada e um botão de confirmar aparecerá, para então ir até a próxima tela |[Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ChatScreen.js) |
| RF0014 Login anônimo | Caso nada esteja escrito na caixa de email da tela de login, aparecerá a opção de entrar anonimamente, onde seus desabafos não serão identificáveis pelos administradores | [Front-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/LoginScreen.js#L199), [Back-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/backend/controllers/auth.js#L77-L80) |
| RF0015 Trocar para o anônimo | Caso o usuário esteja logado, mas quer enviar uma mensagem anônima sem precisar se deslogar, poderá trocar para o anônimo, na tela de configurações | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ConfigScreen.js#L15-L41) |
| RF0016 Mudar imagem de perfil de usuário | Tanto para administrador como usuário padrão, para poderem alterar sua imagem de perfil, sendo a padrão caso o usuário esteja anônimo | Suspenso |
| RF0017 Alterar descrição do usuário | Uma breve descrição, de até 300 caracteres, do usuário. Que será exposta em sua tela de perfil e para o administrador que acessá-la | Suspenso |
| RF0018 Visualizar estatísticas de escolhas dos alunos | Uma tela de estatísticas, contendo as opções mais escolhidas pelos alunos | Suspenso |
| RF0019 Acessar configurações | Menu de configurações, com funções como: alterar foto de perfil, encerrar sessão e trocar para o anônimo | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/ConfigScreen.js) |
| RF0020 Acessar menu “sobre” | Menu de descrição sobre o aplicativo | [Código](https://github.com/absurd-web/Desabafe/blob/b0f471a59d907bf5d26056f18599fe7dead40d32/components/screens/AboutScreen.js) |
| RF0021 Filtrar mensagens | Filtrar mensagens de usuários por urgentes, não urgentes e ambos. | Em desenvolvimento |
| RF0022 Ver mensagens de cada categoria | Menu de mensagens por categoria, contendo mensagens de usuários autenticados ou anônimos | [Código](https://github.com/absurd-web/Desabafe/blob/b0f471a59d907bf5d26056f18599fe7dead40d32/components/screens/AdminScreen.js) |
| RF0023 Mensagem de email não cadastrado | Caso o email inserido na tela de login não estiver cadastrado, uma mensagem será exibida | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/LoginScreen.js#L61-L85) |
| RF0024 Esconder senha ao digitar | A senha enquanto for digitada não será exibida | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/LoginScreen.js#L179) |
| RF0025 Exibir mensagem de erro ao cadastrar email inválido | Caso o email já esteja cadastrado, ou seja inválido | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/LoginScreen.js#L61-L85) |
| RF0026 Conferir senhas no cadastro | Conferir se as senhas inseridas no campo “senha” e “confirmar senha” são iguais | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/LoginScreen.js#L61-L85) |
| RF0027 Exibir nome de usuário | Na tela de configurações, exibir o nome do usuário | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/ConfigScreen.js#L83-L84) |
| RF0028 Exibir email do usuário logado | Na tela de configurações, exibir o email do usuário | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/ConfigScreen.js#L83-L84) |
| RF0029 Exibir mensagem de erro caso o campos de senha no login esteja vazio | Caso o campo de senha, na tela de login estiver vazio, um erro será exibido | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/LoginScreen.js#L61-L85) |
| RF0030 Exibir mensagem de erro caso os campos de registro estejam vazios | Caso os campos estejam vazios, exibe mensagem de erro | [Código](https://github.com/absurd-web/Desabafe/blob/e7759b0aa784546070f72a451c35a1b441a68b7a/components/screens/LoginScreen.js#L61-L85) |
| RF0031 Exibir aviso de mensagem enviada com sucesso | Caso o desabafo livre seja enviado com sucesso, uma tela será exibida confirmando | [Código](https://github.com/absurd-web/Desabafe/blob/e743b57cb1b48eeedf369d004d54d3f26e4284b3/components/screens/SentScreen.js) |
| RF0032 Exibir aviso de confirmação de envio da mensagem | Caso o usuário “clique em enviar mensagem”, uma tela de confirmação aparecerá | [Código](https://github.com/absurd-web/Desabafe/blob/b0f471a59d907bf5d26056f18599fe7dead40d32/components/screens/MessageScreen.js#L91-L132) |

