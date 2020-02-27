


# Testes com protractor 

# Antes dos Testes

npm i

# Iniciar os testes 

Precisara de 3 abas, uma para o projeto, outra para o webdriver manager e a terceira para rodar os testes

npm start # iniciar a pagina na Aba 1

npm run prepare-test  # iniciar o webdriver-manage na Aba 2

npm test # rodar os testes na Aba 3


# problema comum durante os testes

E/launcher - SessionNotCreatedError: session not created: This version of ChromeDriver only supports Chrome version xx

Via linha de comando

google-chrome-stable --version

VERSAO=Numero da versao do Chrome ex: 80.0.3922.121

./node_modules/.bin/webdriver-manager update --versions.chrome $VERSAO


./node_modules/.bin/webdriver-manager start --versions.chrome $VERSAO

# TODO:

Script em shell para verificar a versao do chrome e resolver