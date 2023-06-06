const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;
const { db } = require('../../config');

const register = async (request, response) => {
  const { name, password, email } = request.body;
  const hashPassword = await bcrypt.hash(password, 10);
  await db.query(
    "INSERT INTO auth (name, password, email) VALUES (?, ?, ?)",
    [name, hashPassword, email],
    (error, results) => {
      if (error) {
        console.error("Помилка при реєстрації користувача:", error);
        response.status(500).send("Помилка при реєстрації користувача");
      } else {
        console.log("Користувач успішно зареєстрований");
        response.status(200).send("Користувач успішно зареєстрований");
      }
    }
  );
};

// const login = async (request, response) => {
//   const { email, password } = request.body;
//   db.query(
//     "SELECT * FROM auth WHERE email = ?",
//     email,
//     async (error, results) => {
//       if (error) {
//         console.error("Помилка при вході користувача:", error);
//         response.status(500).send("Помилка при вході користувача");
//       } else {
//         if (results.length === 0) {
//           response.status(401).send("Користувача не знайдено");
//         } else {
//           const user = results[0];
//           try {
//             const passwordCompare = await bcrypt.compare(password, user.password);
//             if (!passwordCompare) {
//               response.status(401).send("Неправильний пароль");
//             } else {
//               const payload = {
//                   id: user.id,
//                   owner: user.owner
//               };
//               const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

//               // Оновлення запису користувача з токеном у таблиці auth
//               const updateQuery = "UPDATE auth SET token = ? WHERE id = ?";
//               db.query(updateQuery, [token, user.id], (error, result) => {
//                 if (error) {
//                   console.error("Помилка при оновленні токену:", error);
//                   response.status(500).send("Помилка сервера");
//                 } else {
//                   console.log("Токен успішно збережено");
//                   response.status(200).json({
//                     token,
//                   });
//                 }
//               });
//             }
//           } catch (error) {
//             console.error("Помилка при порівнянні паролів:", error);
//             response.status(500).send("Помилка сервера");
//           }
//         }
//       }
//     }
//   );
// };


const login = async (request, response) => {
  const { email, password } = request.body;
  db.query(
    "SELECT * FROM auth WHERE email = ?",
    email,
    async (error, results) => {
      if (error) {
        console.error("Помилка при вході користувача:", error);
        response.status(500).send("Помилка при вході користувача");
      } else {
        if (results.length === 0) {
          response.status(401).send("Користувача не знайдено");
        } else {
          const user = results[0];
          try {
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
              response.status(401).send("Неправильний пароль");
            } else {
              const payload = {
                  id: user.id
              };
              const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

             response.status(200).json({
                    token,
                  });
            }
          } catch (error) {
            console.error("Помилка при порівнянні паролів:", error);
            response.status(500).send("Помилка сервера");
          }
        }
      }
    }
  );
};





const current = async (request, response) => {
  // Перевірка автентифікації користувача (наприклад, за допомогою токенів або сесій)
  // Якщо користувач автентифікований, поверніть його дані
  // const { username,  email} = request.body;
  // response.json({
  //     username,
  //     email
  // });
};

const logout = async (request, response) => {
  //   const { _id } = request.user;
  //   await User.findByIdAndUpdate(_id, { token: "" });
  //   response.status(204).json({
  //   message: "No content",
  //   });
};

module.exports = {
  register,
  login,
  current,
  logout,
};
