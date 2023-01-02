// @ts-check
'use strict'

const appendDatetimeFields = require('./../utils/appendDatetimeFields')

const TABLE_NAME = 'transactions'
const seeders = [
  { id: 1, block_id: 1, hash: '49763C756F3505E12DBB5CF5CAA0F1ECB04D04166D65FF5620B0A75C40DD076D', raw_log: '[{"events":[{"type":"execute","attributes":[{"key":"_contract_address","value":"grano1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmst7wnme"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgExecuteContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"}]},{"type":"wasm","attributes":[{"key":"_contract_address","value":"grano1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmst7wnme"},{"key":"identifier","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"},{"key":"name","value":"service"},{"key":"value","value":"github"},{"key":"validTo","value":"1671253822"},{"key":"previousChange","value":"0"},{"key":"from","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"}]}]}]' }, // set_attribute
  { id: 2, block_id: 2, hash: '8CFA9D671AEE43C9E937F535852A10D6B8626C6FB18FBD4786DA1BCE39835FDF', raw_log: '[{"events":[{"type":"execute","attributes":[{"key":"_contract_address","value":"grano1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmst7wnme"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgExecuteContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"}]},{"type":"wasm","attributes":[{"key":"_contract_address","value":"grano1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmst7wnme"},{"key":"identifier","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"},{"key":"name","value":"service"},{"key":"value","value":"twitter"},{"key":"validTo","value":"1671253827"},{"key":"previousChange","value":"4405"},{"key":"from","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"}]}]}]' }, // set_attribute
  { id: 3, block_id: 3, hash: 'ECD3AA593DD3DC2FB3F964CFA2CD7898E52C054716FEA6C794D4CAA575350C00', raw_log: '[{"events":[{"type":"execute","attributes":[{"key":"_contract_address","value":"grano1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmst7wnme"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgExecuteContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"}]},{"type":"wasm","attributes":[{"key":"_contract_address","value":"grano1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmst7wnme"},{"key":"identifier","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"},{"key":"name","value":"service"},{"key":"value","value":"github"},{"key":"validTo","value":"0"},{"key":"previousChange","value":"4406"},{"key":"from","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"}]}]}]' }, // revoke_attribute
  { id: 4, block_id: 4, hash: '8BE8744B6211337A96F920B4DDBCDA5B9421F6764A0E8E942A32FCEBD9778EB5', raw_log: '[{"events":[{"type":"execute","attributes":[{"key":"_contract_address","value":"grano1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmst7wnme"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgExecuteContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"}]},{"type":"wasm","attributes":[{"key":"_contract_address","value":"grano1xhcxq4fvxth2hn3msmkpftkfpw73um7s4et3lh4r8cfmumk3qsmst7wnme"},{"key":"identifier","value":"grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev"},{"key":"controller","value":"grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m"},{"key":"previousChange","value":"4408"}]}]}]' }, // change_controller
]

/**
 * @module
 * @type {{
 *   up: (
 *     queryInterface: import('sequelize').QueryInterface,
 *     Sequelize: typeof import('sequelize')
 *   ) => Promise<void>,
 *   down: (
 *     queryInterface: import('sequelize').QueryInterface,
 *     Sequelize: typeof import('sequelize')
 *   ) => Promise<void>,
 * }}
 */
module.exports = {
  async up (
    queryInterface,
    Sequelize
  ) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      appendDatetimeFields(seeders)
    )
  },

  async down (
    queryInterface,
    Sequelize
  ) {
    await queryInterface.bulkDelete(TABLE_NAME, {
      id: seeders.map(it => it.id)
    })
  }
}
