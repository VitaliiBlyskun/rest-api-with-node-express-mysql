const { usersActions } = require("../../models");

const { HttpError } = require("../../utils");

const getUserById = async (request, response) => {
  //* всі динамічні частини маршруту знаходяться у request.params
  // console.log(request.params)
  const { id } = request.params;
  const users = await usersActions.getUserById(id);
  if (!users) {
    throw HttpError(404, "Not Found");
  }
  response.status(200).json({
    status: "get by id success",
    code: 200,
    data: {
      result: users,
    },
  });
};

module.exports = getUserById;
