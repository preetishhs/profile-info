FROM mhart/alpine-node

WORKDIR /src

#Copy the dependencies
COPY package.json package.json
RUN npm install

# Bundle app source
COPY . /src

EXPOSE  5000
CMD ["node", "app.js"]
