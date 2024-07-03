- O projeto possui frontend e backend no mesmo repositório
- Requisitos:
  - Node 21
  - Mongodb


- para rodar localmente a aplicação de back (porta 4000):
```
cd backend
yarn start
```

- para rodar localmente a aplicação de front (porta 4001):
```
cd frontend
yarn start
```

- para rodar o backend via docker, caso nao tenha mongo instalado:
```
cd backend
docker-compose up --build
```
OBS1: Certifique-se se a porta 27017 está liberada, o docker abre o mongo nesta porta
OBS2: Certifique-se de colocar usuario e senha do seu root

Infelizmente nao pude me dedicar tanto ao teste nem em um bogit statusm `README.md` por conta do trabalho atual, qualquer duvida só contatar