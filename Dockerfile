FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 8000
ENV ML_URL https://waitestimatorapp-r6te2wbmrq-et.a.run.app/predict
EXPOSE $PORT
CMD ["node", "index.js"]
