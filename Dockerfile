# Use a imagem base do Node.js
FROM node:20

# Configurar o diretório de trabalho
WORKDIR /

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
