const { usersActions } = require("../../models");

const { HttpError } = require("../../utils");

const deleteUser = async (request, response) => {
  const { id } = request.params;
  const user = await usersActions.removeUser(id);
  if (!user) {
    throw HttpError(404, "Not Found");
  }
  response.status(200).json({
    status: "delete success",
    code: 200,
    data: {
      result: user,
    },
  });
}

module.exports = deleteUser;