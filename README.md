# PropertyToken
PropertyToken is a web application for fractional ownership of real estate. PropertyToken is powered by Blockchain technology. 

## Overview
PropertyToken has 4 types of users:
- System Admin

The System Admin is responsible for setting up the infrastructure, initial data configuration and on-boarding of the various users.

- Investor

The Farmer is responsible for capturing produce data at harvest time onto PropertyToken. The Farmer also transports the produce to the Market as per order from Market Admin.

- Rent Seeker

The Market Admin is responsible for receiving produce from the Farmer and capturing the relevant data onto PropertyToken.

## Documentation
- [Business Case](https://github.com/jajukajulz/PropertyToken/raw/master/docs/PropertyToken%20-%20Business%20Case%2008072019.pdf)

## Installation (Development Environment)
In order to run PropertyToken, an environment with the following is required:

- Node.js
- Truffle Framework
- Web3.js
- Bootstrap
- MySQL
- MetaMask (MetaMask is an extension for accessing Ethereum enabled distributed applications, or "Dapps" in your browser! The extension injects the Ethereum web3 API into every website's javascript context, so that dapps can read from the blockchain.)

1. Install Truffle globally. Truffle is the most popular smart contract development, testing, and deployment framework. 
```
$npm install -g truffle 
```

2. Install node dependencies.
```
$npm install
```

3. Start Ganache and Create a Workspace (or open an existing one). 

4. Confirm PropertyToken smart contract compiles successfully.
```
$truffle compile
```

5. Run tests for PropertyToken smart contract.
```
$truffe test
$truffle test --network development
```

4. Deploy PropertyToken smart contract to Ganache (assumes Ganache is running).

`truffle migrate` will run all migrations located within your project's migrations directory. If your migrations were previously run successfully, truffle migrate will start execution from the last migration that was run, running only newly created migrations. If no new migrations exists, `truffle migrate` won't perform any action at all. 
```
$truffle migrate
```

The --reset flag will force to run all your migrations scripts again. Compiling if some of the contracts have changed. You have to pay gas for the whole migration again. 
```
$truffle migrate --reset
```

The --all flag will force to recompile all your contracts. Even if they didn't change. It is more time compiling all your contracts, and after that it will have to run all your deploying scripts again.
```
$truffle migrate --compile-all --reset
```

If for some reason truffle fails to acknowledge a contract was modified and will not compile it again, delete the build/ directory. This will force a recompilation of all your contracts and running all your deploy scripts again.

5. Update `truffle-config.js` development network with NetworkID, Host and Port values from your local Blockchain in Ganache.

6. Create a MySQL database
```
run dbxml/PropertyTokenDB.sql
```

7. Populate the MySQL database
```
run dbxml/PropertyTokenDB_schema.sql
```

8. Create a database configuration file in the root folder - `dbconfig.json` and populate with updated json config as below

```
{
        "db": {
        "host"      : <HOSTNAME>,
        "user"      : <USERNAME>,
        "password"  : <PASSWORD>,
        "database"  : <DATABASENAME>
    }
}
```

9. Start the web server (Express) and navigate to http://localhost:3000/ in your browser.
```
$npm run dev
```

## Other
1. Access deployed contract from CLI
```
$ truffle console
$ TheProduct.deployed().then(function(instance) { app = instance })
$ app.noProperties()
```

2. Add a new migration
```
$touch 2_deploy_contract.js
```

3. Create infura project  at https://infura.io (Infura gives you access to test network).
This project will give you an ID that you will use in `truffle-config.js`
infura means you do not have to sync an ether node or rinkeby node to deploy directly.

4. Get test ether from https://faucet.rinkeby.io/ (you will need to create an Ethereum rinkeby wallet on MetaMask then use the address on twitter).
e.g. 0x4B67D20a4F27d248aF0462C23F8C193f073517FB

5. Update `truffle-config.js` with rinkeby. This will deploy from the metamask accounts, by default account 0 so specify which one you want.

6. Deploy to rinkeby. 
```
$truffle migrate --network rinkeby --compile-all --reset
```
7. Check contract on rinkeby etherscan https://rinkeby.etherscan.io

## Production Deployment
1. To deploy to a production server, first bundle and uglify then deploy
```
$npm run build
$npm run start
```

