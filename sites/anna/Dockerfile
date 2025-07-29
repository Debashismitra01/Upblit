FROM node:lts
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
