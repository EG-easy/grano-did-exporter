// @ts-check
'use strict'

const { GranoDidClient } = require('@eg-easy/grano-did-client')

const Exporter = require('../app/exporter/Exporter')

const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled()
  const exporter = Exporter.create({ granoDidClient: granoDidClient })
  // const block = await exporter.fetchLatestBlockFromNode()
  // console.log(block)
  // const txs = await exporter.fetchTransactionsByHeight(10000000)
  // console.log(txs)
  //
  await exporter.sync(10000000)
}

main()
