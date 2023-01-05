# did-evnet-exporter

## How to Use

1. Set environment variables in `.env`
```env
## Sequelize
DATABASE=grano
USERNAME=root
PASSWORD=password
DIALECT=mariadb
HOST=localhost
PORT=3306

##Grano Did Client
END_POINT='http://localhost:26657'
DENOM='ugrano'
MNEMONIC='estate giraffe icon february goat observe actor left armed zone million note system myth coconut series calm steak dinosaur twin immune mansion morning drastic'
PREFIX='grano'
FROM_ADDRESS='grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'

## Grano DID Exporter
CONTRACT_ADDRESS='grano1cefw8elvkj8t63k5ea2mlpkgyxgjlw2g4vw5l7j3txu925ug9ffskc6vhc'
```

2. Call Exporter

```index.js
const { GranoDidClient } = require('@eg-easy/grano-did-client')
const { GranoDidExporter } = require('@eg-easy/grano-did-exporter')

const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled()
  const granoDidExporter = new GranoDidExporter({ granoDidClient })

  await granoDidExporter.repeatProcess()
}

main()
```

## References
- https://github.com/eg-easy/grano-did
- https://github.com/EG-easy/grano-did-client
- https://github.com/EG-easy/grano-did-contract
- https://github.com/EG-easy/grano-did-node
- https://github.com/EG-easy/grano-did-resolver
