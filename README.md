Part of Web Development - ISMIN

Course followed by students of Mines St Etienne, ISMIN - M2 Computer Science.

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Mines St Etienne](./logo.png)](https://www.mines-stetienne.fr/)

# TP5: Deploy a NestJS API to Clever Cloud

## 📝 Goal

The goal of this TP is to deploy the NestJS API we implemented in previous TPs in The Cloud ☁️.

Using AWS, Azure, GCP? 

No! Using a French 🇫🇷 IT automation company: [Clever Cloud](https://www.clever-cloud.com/en/) 
> Clever Cloud provides an IT Automation Platform for developers with bulletproof infrastructure, auto-scaling, fair pricing

### Step 1: ♻️ Prepare the sources

Copy/paste `src` and `package.json` of TP3 in this project. Run `npm install` to fetch the dependencies.

### Step 2: ☁️ Prepare Clever Cloud

Login to Clever Cloud and create a Node.JS application with option detailed in course slides.

### Step 3: 🏗 Adapt the app to make it buildable and runnable on Clever Cloud  

 - Make the port used by the app configurable using an environment variable: `PORT=8080 npm run start` (on Windows: `set PORT=8080 && npm run start`) should start app on port 8080
 - Rework/add NPM scripts in `package.json`:
   - `install`: should build the app
   - `start`: should start the built app  

### Step 4: 🚀 Send to Clever Cloud
 
 - Add Clever Cloud git remote
 - Commit all local changes
 - Push branch to Clever Cloud remote
 - Check everything is OK on Clever Cloud
 - Open Postman, create a new environment with `url` equal to the Clever Cloud one, try to do some requests! 
