const { api } = require('./index')
module.exports = {
  queryList: (data) => {
    return api({
      url: `/client-api/search/getNucleicAcidOrgList`,
      method: 'POST',
      data
    })
  },
}