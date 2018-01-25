FROM node:7
WORKDIR /app


#install dependencies
COPY package.json /app
RUN npm install


#Bundle app source
copy . /app

#Initiate port listener
EXPOSE 3000
CMD node server.js