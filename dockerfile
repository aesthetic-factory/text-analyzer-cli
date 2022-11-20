FROM node:18-alpine as front-end-build
WORKDIR /usr/src/app
COPY client ./client
RUN cd client && npm install && npm run build

FROM python:3.9 as back-end-build
WORKDIR /root/
COPY server ./server/
COPY --from=front-end-build /usr/src/app/client/build ./server/build
RUN cat ./server/requirements.txt
RUN cd server && pip install --no-cache-dir -r ./requirements.txt

EXPOSE 4000

CMD ["python", "./server/app.py"]