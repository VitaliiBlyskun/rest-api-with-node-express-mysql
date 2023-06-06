const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})


// const app = require("./app");

// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "sql_users",
//   password: "v79502101b",
// });


// // Встановлення з'єднання з базою даних
// connection.connect((error) => {
//   if (error) {
//     console.error("Помилка підключення до бази даних:", error);
//     return;
//   }
//   console.log("З'єднання з базою даних встановлено!");

//   // Запуск сервера
//   app.listen(3000, () => {
//     console.log("Сервер запущено. Використовуйте API на порті: 3000");
//   });
// });


// let query = "SELECT * FROM users";

// connection.query(query, (error, result, field) => {
//   console.log(error);
//   console.log(result);
//   // console.log(result[1]["surname"]);
//   // console.log(field)
// })

// connection.end(error => {
//   if (error) {
//     console.log(error);
//     return error;
//   } else {
//     console.log("Сервер закрито")
//   }
// })




