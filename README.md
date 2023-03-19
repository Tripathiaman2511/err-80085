![download](https://user-images.githubusercontent.com/77661670/226164076-e0c3cb4f-ef40-4099-b01f-dae5c7b60ac6.jpeg)

## Clone Project
Clone this repository anywhere in your system
```bash
git clone https://github.com/Tripathiaman2511/err-80085.git
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
truffle compile
truffle deploy
truffle migrate
npm start
```
## Little Information About Softwares/Tools Used
* Truffle
<p>Truffle CLI provide end-to-end development, best-in-class debugging, faster, easier and safer ethereum simulation, UX-centered design, Security-First blockchain tool to write tests in Solidity, JavaScript, and TypeScript.</p>

* Ganache
<p>Ganache is an User Interface Tool which you can use to run tests, execute commands, and inspect state on a personal Ethereum Blockchain, while controlling how the chain operates.</p>

* Solidity
<p>Solidity is an object-oriented programming language for implementing smart contracts on various blockchain platforms, most notably, Ethereum.</p>

* Node
<p>Node is an open-source, cross-platform JavaScript runtime environment.</p>

* Web3.js
<p>Web3.js is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.</p>

* IPFS
<p>InterPlanetary File System (IPFS), is a file sharing system that can be leveraged to more efficiently store and share large files. It relies on cryptographic hashes that can easily be stored on a blockchain.</p>

* IPFS Desktop
<p>IPFS Desktop bundles an IPFS node, file manager, peer manager, and content explorer into a single, easy-to-use application.</p>

