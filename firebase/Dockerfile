FROM node:12.20.0-alpine

WORKDIR /opt

RUN yarn global add firebase-tools
COPY firebase.json /opt/firebase.json
COPY .firebaserc /opt/.firebaserc

EXPOSE 4100
EXPOSE 9099

ENTRYPOINT firebase emulators:start
