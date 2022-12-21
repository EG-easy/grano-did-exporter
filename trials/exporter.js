// @ts-check
'use strict'

const { GranoDidClient } = require('@eg-easy/grano-did-client')

const Exporter = require('../app/exporter/Exporter')

const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled()
  const exporter = Exporter.create({ granoDidClient: granoDidClient })
  await exporter.sync(5239)
}

main()
