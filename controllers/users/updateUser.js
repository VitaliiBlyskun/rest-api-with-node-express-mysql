const { usersActions } = require("../../models");

// const { userComesSchema } = require('../../schemas');

const { HttpError } = require("../../utils");

const updateUser = async (request, response) => {
  const { id } = request.params;
  const user = await usersActions.updateUser(id, request.body);
  if (!user) {
    throw HttpError(404, "Not Found");
  }
  response.status(200).json({
    status: "put success",
    code: 200,
    data: {
      result: user,
    },
  });
};

module.exports = updateUser;
