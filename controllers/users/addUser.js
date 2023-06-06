const { usersActions } = require("../../models");

const addUser = async (request, response) => {
  //* тіло забиту зберігається в request.body
  // console.log(request.body);
  const users = await usersActions.addUser(request.body);
  response.status(201).json({
    status: "post success",
    code: 201,
    data: {
      result: users,
    },
  });
};

module.exports = addUser;
