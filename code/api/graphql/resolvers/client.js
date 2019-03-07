const Sequelize = require('sequelize');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const GraphQlJSON = require('graphql-type-json');
const models = require('../../models');

const resolver = {
  JSON: GraphQlJSON,
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }

      return null;
    }
  }),

  //Query
  getClients: ({ p_id }) =>
    models.Client.findAll({
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
          required: false
        }
      ],
      group: ['Client.c_id'],
      where: { p_id }
    }),

  getClient: ({ c_id }) =>
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
    }).then(res => {
      models.Client.update(
        { last_opened: new Date() },
        {
          where: { c_id }
        }
      );

      return res;
    }),

  //Mutations
  addClient: ({ fname, lname, gender, birthdate, p_id }) =>
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

  removeClient: ({ c_id }) =>
    models.Client.findOne({
      raw: true,
      where: { c_id },
      attributes: ['c_id', 'fname', 'lname']
    }).then(res => {
      models.Client.destroy({
        where: { c_id }
      });
      return res; //Returns only the id and name of removed client
    }),

  updateClientInformation: ({ c_id, fname, lname, birthdate, gender }) =>
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
    ).then(
      res =>
        models.Client.findOne({
          raw: true,
          where: { c_id }
        }) //returns the fields updated
    )
};

module.exports = resolver;
