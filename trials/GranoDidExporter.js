// @ts-check
'use strict'

const { GranoDidClient } = require('@eg-easy/grano-did-client')

const GranoDidExporter = require('../app/exporter/GranoDidExporter')

const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled()
  const exporter = GranoDidExporter.create({ granoDidClient: granoDidClient })
  await exporter.sync(9542)
}

main()
