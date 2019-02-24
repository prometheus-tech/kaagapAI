//sequelize operations (i.e findById, destroy, etc.) can be found here: https://sequelize.readthedocs.io/en/latest/api/model/
module.exports = {
  Query: {
    getClients: (parent, {p_id}, { models }) => models.Client.find({where: { p_id }})
  },

  Mutation: {
    addClient: (parent, args, {models}) => models.Client.create(args),
    // removeClient: (parent, { c_id }, {models}) => models.Client.destroy({where: { c_id }})
  }
}