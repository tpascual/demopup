FROM zenika/alpine-chrome:77-with-node
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install puppeteer puppeteer-core
COPY index.js /usr/src/app/
CMD ["node","index.js"]