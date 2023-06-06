const { usersActions } = require("../../models");
const { HttpError } = require("../../utils");

const updateFavouriteStatusUser = async (request, response) => {
  const { id } = request.params;
  const result = await usersActions.updateFavouriteUser(id, request.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    message: "success status contact",
    data: {
      result,
    },
  });
};

module.exports = updateFavouriteStatusUser;