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
    client: (parent, { c_id }, { models }) => {
      return models.Client.findOne({
        where: { c_id },
        raw: true
      });
    }
  },
  Mutation: {
    addClient: (parent, { fname, lname, gender, birthdate, p_id }, models) =>
      models.Client.create({
        fname,
        lname,
        gender,
        birthdate,
        p_id,
        date_added: new Date()
      }).then(res => {
        const { c_id } = res.dataValues;

        return models.Client.findOne({
          raw: true,
          attributes: {
            include: [
              [
                Sequelize.fn('COUNT', Sequelize.col('Sessions.session_id')),
                'no_of_sessions'
              ]
            ]
          },
          include: [
            {
              model: models.Session,
              attributes: [],
              required: false,
              where: { c_id }
            }
          ],
          where: { c_id }
        });
      }),

    deleteClient: (parent, { c_id }, { models }) =>
      models.Client.findOne({
        raw: true,
        where: { c_id }
      }).then(res => {
        models.Client.destroy({
          where: { c_id }
        });
        return res;
      }),

    updateClientInformation: (
      parent,
      { c_id, fname, lname, birthdate, gender },
      { models }
    ) =>
      models.Client.update(
        {
          fname,
          lname,
          birthdate,
          gender
        },
        {
          where: { c_id },
          returning: false
        }
      ).then(res =>
        models.Client.findOne({
          raw: true,
          attributes: {
            include: [
              [
                Sequelize.fn('COUNT', Sequelize.col('Sessions.session_id')),
                'no_of_sessions'
              ]
            ]
          },
          include: [
            {
              model: models.Session,
              attributes: [],
              required: false,
              where: { c_id }
            }
          ],
          where: { c_id }
        })
      )
  }
};
