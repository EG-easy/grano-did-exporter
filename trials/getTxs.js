// @ts-check
'use strict'

const { GranoDidClient } = require('@eg-easy/grano-did-client')

const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled()
  const q = { height: 10000000 }
  const txs = await granoDidClient.client.searchTx(q)

  console.log(txs)
}

main()
