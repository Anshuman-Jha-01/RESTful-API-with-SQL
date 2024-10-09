// Require necessary dependencies 
const {faker} = require("@faker-js/faker");
const mysql = require("mysql2");

// Establish connection with a database
const connection  = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "[mysql-password]",
    database: "Home"
});

// Declare and initialize variables
let data = [];
let user = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password()
      ];
  };

// Enter 100 data into database
for (let i=1; i<=100;i++)
{
    data.push(user());
}
let query = "INSERT INTO data(id, username, email, password) VALUES ?"
try 
{
    connection.query(query, [data], (err, results, fields) => {
        if (err) throw err;
        console.log(results);
    });
} catch(err)
{
    console.log(err);
}

// End connection
connection.end();
  