
## Clone Project
Clone this repository anywhere in your system
```bash
git clone https://github.com/Tripathiaman2511/err-80085.git
```
## Folder Structure
When done with above command, the project folder should look like this
```
--STRUCTURE--
```
For the project to build successfully, **these files must exist with exact filenames:**
* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

## Installing Dependencies
* NodeJS
Download and Install NodeJS from official site of NodeJS `https://nodejs.org/en` 
After installing NodeJS, open your favorite terminal inside the directory of the cloned repository and run following commands 
```bash
cd err-80085
npm install
```
* Ganache
Download and Install Ganache from official site of Ganache - Truffle Suit `https://trufflesuite.com/ganache/`
* Truffle
To install Truffle, open your favorite terminal and run the following command
```bash
npm install -g truffle
```
After installing Truffle, use the following command to see the version of Truffle and it's dependencies
```bash
truffle -v
```
As of March 2023, the above command gave the following output
```bash
Truffle v5.8.0 (core: 5.8.0)
Ganache v7.7.6
Solidity v0.5.16 (solc-js)
Node v18.15.0
Web3.js v1.8.2
```

## Run Project
Considering you are done with the above commands successfully and are in the project directory, the following command will run the project/app in the development mode. Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.
```bash
npm start
```

