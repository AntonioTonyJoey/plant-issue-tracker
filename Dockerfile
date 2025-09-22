# FROM node:20-alpine 
# # Instalar dependencias nativas necesarias para compilación
# RUN apk add --no-cache python3 make g++
# WORKDIR /frontend
# # Copiar archivos de dependencias y realizar instalación
# COPY package*.json . 
# RUN npm install --legacy-peer-deps

# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev"]
# #ENTRYPOINT ["tail", "-f", "/dev/null"]


FROM node:21-alpine3.20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]


# FROM busybox:1.30 AS runner
# WORKDIR /app
# COPY --from=builder /app/dist .
# CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]
