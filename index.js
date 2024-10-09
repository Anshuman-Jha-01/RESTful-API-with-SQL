// Require the necessary dependencies
const express = require("express");
const app = express();
const path = require("path");
const {v4: uuidv4} = require("uuid");
const mysql = require("mysql2");
const methodOverride = require("method-override");

// Set the view engine and paths
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("public", path.join(__dirname, "/public"));

// Use the express middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Establish a connection with the database
const connection  = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mys12@$_Aqrt",
    database: "Home"
});

// Set the server port
const port = 8080;

// Initialize the server
app.listen(port, () => {
    console.log(`Server is initialized for port ${port}.`);
});

// Set up the home page
app.get("/", (req, res) => {
    try {
        let query = `SELECT COUNT(*) FROM data`;
        connection.query(query, (err, results, fields) => {
            if(err) throw err;
            let count = results[0]["COUNT(*)"];
            res.render("home.ejs", {count});
        });
    } catch(err)
    {
        console.log(err);
    }
});

// Show all the user records
app.get("/user", (req, res) => {
    try {
        let query = `SELECT id, username, email FROM data`;
        connection.query(query, (err, results, fields) => {
            if(err) throw err;
            res.render("user.ejs",{results});
        });
    } catch(err)
    {
        console.log(err);
    }
});

// Edit the username 
// Get the edit page
app.get("/user/edit/:id", (req, res) =>{
    try {
        let query = "SELECT id, username, password FROM data";
        connection.query(query, (err, results, fields) => {
            if(err) throw err;
            let id = req.params.id;
            let record = results.find((p) => id===p.id);
            res.render("edit.ejs", {record});
        });
    } catch(err)
    {
        console.log(err);
    }
});
// Update the database
app.patch("/user/:id", (req, res) => {
    let newUsername = req.body.username;
    let id = req.params.id;
    let password = req.body.password;
    try {
        let q = "SELECT * FROM data";
        connection.query(q, (err, results, fields) => {
            let record = results.find((p) => p.id===id);
            let pass = record.password;            
            if (password!=pass)
            {
                res.send("Wrong Password");
            }
            else 
            {
                let query = "UPDATE data SET username = ? WHERE id = ?";
                connection.query(query, [newUsername, id], (err, results, fields) => {
                    if(err) throw err;
                    res.redirect("/user");
                });
            }
        })
    } catch(err)
    {
        console.log(err);
    }
});

// See individual records
app.get("/user/:id", (req, res) => {
    try 
    {
        let query = "SELECT id, username, email FROM data";
        connection.query(query, (err, results, fields) =>
        {
            if (err) throw err;
            let id = req.params.id;
            let record = results.find((p) => p.id===id);
            res.render("detail.ejs", {record});
        });
    } catch (err)
    {
        console.log(err);
    }
});

// Add new record
// Get the form to input the details
app.get("/new", (req, res) => {
    res.render("add.ejs");
});
// Add new record to the database
app.post("/user", (req, res) => {
    let id = uuidv4();
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    try 
    {
        let query = "INSERT INTO data(id, username, email, password) VALUES (?, ?, ?, ?)";
        connection.query(query, [id, username, email, password], (err, results, fields) => {
            if (err) throw err;
            res.redirect("/user");
        });
    } catch(err)
    {
        console.log(err);        
    }
});

// Delete record
// Enter password
app.get("/user/delete/:id", (req, res) => {
    let id = req.params.id;
    try 
    {
        let query = "SELECT id, username FROM data";
        connection.query(query, (err, results, fields) => {
            if (err) throw err;
            let record = results.find((p) => p.id===id);
            res.render("delete.ejs", {record});
        });
    } catch(err)
    {
        res.send(err);
    }
});
// Delete from database
app.delete("/user/:id", (req, res) => {
    let id = req.params.id;
    let password = req.body.password;
    try 
    {
        let q = "SELECT * FROM data";
        connection.query(q, (err, results, fields) => {
            let record = results.find((p) => p.id===id);
            let pass = record.password;            
            if (password!=pass)
            {
                res.send("Wrong Password");
            }
            else 
            {
                let query = "DELETE FROM data WHERE id = ? AND password = ?";
                connection.query(query, [id, password], (err, results, fields) => {
                    if (err) throw err;
                    res.redirect("/user");
                });
            }
        }) 
    } catch(err)
    {
        res.send(err);
    }
});


