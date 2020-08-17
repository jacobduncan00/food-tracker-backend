FROM node:12

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server.js"] 

# Docker command to run this on local machine
# docker run -p 3001:3001 food-tracker-backend

# Docker command to build this
# docker build -t food-tracker-backend ./    
