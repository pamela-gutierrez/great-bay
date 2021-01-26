var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "greatBay_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}

function postAuction() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What item would you like to post?"
      },
      {
        name: "category",
        type: "input",
        message: "What category is this item in?"
      },
      {
        name: "bid",
        type: "input",
        message: "What is the starting bid?"
      }]
    ).then(response => {
      var query = connection.query(
        "INSERT INTO auctions SET ?",
        {
          item_name: response.name,
          category: response.category,
          starting_bid: response.bid
        },
        function (err, res) {
          if (err) throw err
          console.log("It was added to the database.")
        }
      })
})
}
  // function bidAuction() {

  // }
