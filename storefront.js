var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItemsAvailable();
});

//function to show items available
function displayItemsAvailable(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["ID", "Product Name", "Department Name", "Price", "Remaining Stock"],
            colWidths: [5, 25, 15, 20, 20]
        });
        for(var i = 0; i < res.length; i++){
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        start();
    });
}
//function to start inquirer and update table
function start(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt([{
            name: "item_id",
            type: "input",
            message: "What is the ID of the product you are thinking about purchasing?",

        }, {
            name: "quantity",
            type: "input",
            message: "How many units would you like to buy?"
        }
        ]).then(function (answer) {
            var item_id = answer.item_id;
            var quantity = answer.quantity;
            connection.query("SELECT * FROM products WHERE ?", [item_id],
                function (err, res) {
                    if (err) throw err;
                    var stock_quantity = res[0].stock_quantity;
                    if(stock_quantity <= quantity){
                        console.log("Not enough inventory, please select a new item");
                    }else{
                        stock_quantity -= quantity;
                        connection.query('UPDATE products SET ? WHERE item_id=?', [{stock_quantity: stock_quantity}, item_id], function(err, res){
                            if (err) throw err;
                        });
                        continueOrder();
                    }
                }
            );
        });
    });
}
//function to continue ordering products if customer chooses to
function continueOrder(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        inquirer.prompt([{
            name: "continue",
            type: "confirm",
            message: "Would you like to purchase any more items?"
        }
        ]).then(function (answer){
            if(answer.continue){
                displayItemsAvailable();
            }else{
                console.log("Thank you for shopping with us, we hope you have a splendid day.")
            }
        });
    });
}
