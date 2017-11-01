DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,

  product_name VARCHAR(30) NOT NULL,

  department_name VARCHAR(30) NOT NULL,

  price INTEGER (10),

  stock_quantity INTEGER(10),

  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vizio TV", "Electronics", 2000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone 10", "Electronics", 1000, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("UGA Sweatshirt", "Apparel", 50, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leather Sofa", "Furniture", 3000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boots", "Footwear", 200, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Towel", "Home Goods", 20, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Atheletic Socks", "Apparel", 5, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4", "Electronics", 400, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kitchen Knife Set", "Home Goods", 100, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Electronics", 2000, 500);
