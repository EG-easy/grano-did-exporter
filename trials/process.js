// @ts-check
'use strict'

const { GranoDidClient } = require('@eg-easy/grano-did-client')

const GranoDidExporter = require('../src/app/exporter/GranoDidExporter')

const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled()
  const exporter = GranoDidExporter.create({ granoDidClient: granoDidClient })
  await exporter.process()
}

main()
