FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

# node_modules を Docker volumes とする
# RUN apk add --no-cache --virtual .gyp python make g++ \
#     && apk --no-cache add avahi-dev \
#     && npm ci \
#     && apk del .gyp

COPY . .

EXPOSE 8888

CMD ["npm", "run", "serve"]
