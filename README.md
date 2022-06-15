# Desabafe

Um aplicativo para envio de desabafos, criado para o instituto JPCM, pelo grupo AlleyCat, na cadeira de Projeto Integrado I, curso de Sistemas e Mídias Digitais, UFC.

O app está sendo desenvolvido para dispositivos móveis (ios e android), consiste em uma forma dos alunos do instituto enviarem seus desabafos, ou serem redirecionados para possíveis soluções simples do problema, baseando-se em perguntas respondidas pelo usuário.

Equipe: AlleyCat

Participantes: Israel Gomes Carneiro Filho, Kaio Nickollas Feitosa Forte, Nickolas Gabriel Lima Rodrigues, Pedro Davi Vasconcelos Oliveira e Vitor Martins de Oliveira


## Executando
Instale e faça o setup do Android Studio segundo as instruções [aqui](https://reactnative.dev/docs/environment-setup).
Faça o download do repositório.
Na pasta execute:  
`npx react-native start`  
e  
`npx react-native run-android`  
para rodar em um dispositivo android conectado com depuração usb ligada ou em um emulador do Android Studio.
## Mapeamento de funcionalidades
| Requisito  | Descrição | Codificação
| ------------- | ------------- | ------------- |
| RF0001 Login | Tanto para usuário como para administrador entrarem no sistema  | [Front-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/LoginScreen.js#L86-L125), [Back-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/backend/controllers/auth.js#L44-L75) |
| RF0002 Registro | Para o usuário se cadastrar no aplicativo, com email, senha e foto (caso queira) | [Front-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/LoginScreen.js#L86-L125), [Back-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/backend/controllers/auth.js#L4-L42) |
| RF0003 Logout (Encerrar sessão) | Deslogar do aplicativo, indo para tela inicial, podendo também entrar anônimo | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ConfigScreen.js#L69-L76) |
| RF0004 Deletar conta | Apagar a conta do sistema | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ConfigScreen.js#L42-L68) |
| RF0010 Tela inicial - Escolha de opções de diálogo | A tela inicial, contendo o mascote do aplicativo, terá 4 opções de diálogo por tela, cada uma delas redirecionando para outra tela com outras opções | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ChatScreen.js) |
| RF0012 Tela inicial - Retornar à pergunta anterior | Caso o usuário tenha mudado de ideia quanto à opção, ou ache que pressionou a opção errada, poderá retornar à anterior, podendo fazer sua escolha novamente | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/App.js#L15-L22) |
| RF0013 Tela inicial - Confirmar opção | Ao escolher a opção dentre as 4, esta ficará marcada e um botão de confirmar aparecerá, para então ir até a próxima tela |[Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ChatScreen.js) |
| RF0014 Login anônimo | Caso nada esteja escrito na caixa de email da tela de login, aparecerá a opção de entrar anonimamente, onde seus desabafos não serão identificáveis pelos administradores | [Front-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/LoginScreen.js#L199), [Back-End](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/backend/controllers/auth.js#L77-L80) |
| RF0015 Trocar para o anônimo | Caso o usuário esteja logado, mas quer enviar uma mensagem anônima sem precisar se deslogar, poderá trocar para o anônimo, na tela de configurações | [Código](https://github.com/absurd-web/Desabafe/blob/da133e67e43c4931cd0778f611ac02e0ba5cabf2/components/screens/ConfigScreen.js#L15-L41) |


