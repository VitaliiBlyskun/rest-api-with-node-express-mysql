// const jwt = require("jsonwebtoken");

// const { HttpError } = require("../utils");

// const { SECRET_KEY } = process.env;

// const { db } = require('../config');

// const authenticate = async (request, response, next) => {
//   // Заголовки це частина запиту, все що стосується запиту, у хедері з малої букви
//   const { authorization = "" } = request.headers;
//   const [bearer, token] = authorization.split(" ");
//   console.log("token", token)
//   if (bearer !== "Bearer" || !token) {
//     next(HttpError(401));
//   }
//   try {
//     const { id } = jwt.verify(token, SECRET_KEY);
//     db.query("SELECT * FROM auth WHERE id = ?", [id], (error, results) => {
//       if (error) {
//         console.error("Помилка при вході користувача:", error);
//         next(HttpError(401));
//       } else {
//         const authToken = results[0];
//         if (!authToken || !authToken.token || authToken.token !== token) {
//           next(HttpError(401));
//         }

//         request.authToken = authToken;
//         next();
//       }
//     });
//   } catch {
//     next(HttpError(401));
//     console.log("Blyat")
//   }
// };

// module.exports = authenticate;



const jwt = require("jsonwebtoken");
require("dotenv").config();

const { HttpError } = require("../utils");

const { SECRET_KEY } = process.env;

const { db } = require('../config');

const authenticate = async (request, response, next) => {
  const { authorization = "" } = request.headers;
  const [bearer, token] = authorization.split(" ");
  console.log("token", token);
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    await db.query("SELECT * FROM auth WHERE id = ?", [id], (error, results) => {
      if (error) {
        console.error("Помилка при вході користувача:", error);
        return next(HttpError(401));
      }
      const authToken = results[0];
      if (!authToken || authToken.token !== token) {
        return next(HttpError(401));
      }
      request.authToken = { id, token };
      next();
    });
  } catch (error) {
    console.error("Помилка при вході користувача:", error);
    next(HttpError(401));
  }
};


module.exports = authenticate;




