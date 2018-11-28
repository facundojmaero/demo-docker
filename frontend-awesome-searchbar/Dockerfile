FROM node

RUN mkdir -p /frontend
WORKDIR /frontend

COPY ./package.json /frontend/package.json

RUN npm install

# CMD ["npm", "run", "start"]
CMD cat /etc/hosts && npm run start