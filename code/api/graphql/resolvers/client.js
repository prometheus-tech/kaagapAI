export default {
  Client: {
    sessions: ({ c_id }, args, { models }) => {
      return models.Session.findAll({ where: { c_id } });
    },
    no_of_sessions: ({ c_id }, args, { models }) => {
      return models.Session.count({ where: { c_id } });
    }
  },
  Query: {
    clients: (parent, { p_id }, { models }) => {
      return models.Client.findAll({
        raw: true,
        where: { p_id }
      });
    },
    client: async (parent, { c_id }, { models }) => {
      await models.Client.update(
        {
          last_opened: new Date()
        },
        { where: { c_id } }
      );

      return await models.Client.findOne({ where: { c_id } });
    }
  },
  Mutation: {
    addClient: async (
      parent,
      { fname, lname, gender, birthdate, p_id },
      { models }
    ) => {
      const addClientRes = await models.Client.create({
        fname,
        lname,
        gender,
        birthdate,
        p_id,
        date_added: new Date()
      });

      const { c_id } = addClientRes.dataValues;

      return await models.Client.findOne({
        raw: true,
        where: { c_id }
      });
    },
    deleteClient: async (parent, { c_id }, { models }) => {
      const deleteClientRes = await models.Client.findOne({
        raw: true,
        where: { c_id }
      });

      await models.Client.destroy({
        where: { c_id }
      });

      return deleteClientRes;
    },
    updateClientInformation: async (
      parent,
      { c_id, fname, lname, birthdate, gender },
      { models }
    ) => {
      await models.Client.update(
        {
          fname,
          lname,
          birthdate,
          gender
        },
        {
          where: { c_id }
        }
      );

      return await models.Client.findOne({
        raw: true,
        where: { c_id }
      });
    }
  }
};
