// @ts-check
'use strict'

const DatabaseClient = require('../src/app/client/DatabaseClient')

const main = async () => {
  const databaseClient = new DatabaseClient()
  const didDocument = await databaseClient.fetchGranoDidDocument({
    identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
  })
  console.log(didDocument)
}

main()
