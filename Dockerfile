# docker run -ti --rm -v $PWD:/root/code nanoapp-react

FROM node:alpine

RUN apk update && apk add git

WORKDIR /root/code/ 

ENTRYPOINT ["sh"]
