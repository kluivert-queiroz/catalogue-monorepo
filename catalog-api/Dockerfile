FROM node:14.17.0-alpine

WORKDIR /usr/src/app

# Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
COPY package.json yarn.lock ./ 
# For NPM use: `RUN npm ci`
RUN yarn --pure-lockfile

# Copy important files - Add ormconfig.ts here if using Typeorm
COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

CMD [ "yarn", "start:dev", "--preserveWatchOutput" ]