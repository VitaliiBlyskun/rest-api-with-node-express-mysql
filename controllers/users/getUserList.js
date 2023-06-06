const { usersActions } = require("../../models");

const getUserList = async (request, response) => {
  //* Інформація із запиту
  // console.log("info url users - ", request.url)
  // console.log("info method users - ", request.method)

  const users = await usersActions.listUsers();
  response.status(200).json({
    status: "get success",
    code: 200,
    data: {
      result: users,
    },
  });
}

module.exports = getUserList