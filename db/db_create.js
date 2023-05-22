const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_food_table_sql = "DROP TABLE IF EXISTS food;"

db.execute(drop_food_table_sql);

const drop_store_table_sql = "DROP TABLE IF EXISTS store;"

db.execute(drop_store_table_sql);

const drop_test_table_sql = "DROP TABLE IF EXISTS test;"

db.execute(drop_test_table_sql);

/**** Create tables ****/

const create_store_table_sql = `

CREATE TABLE store (
    store_id INT NOT NULL,
    store_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (store_id));

`

db.execute(create_store_table_sql);

const create_test_table_sql = `

CREATE TABLE test (
    test_id INT NOT NULL,
    test_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (test_id));

`
db.execute(create_test_table_sql);

const create_food_table_sql = `

CREATE TABLE food (
    food_id INT NOT NULL,
    food_name VARCHAR(45) NOT NULL,
    food_desc VARCHAR(100) NOT NULL,
    food_amt INT NOT NULL,
    store_id INT(11) NOT NULL,
    PRIMARY KEY (food_id),
    INDEX store_id_idx (store_id ASC),
    CONSTRAINT store_id
      FOREIGN KEY (store_id)
      REFERENCES webapp_9MF_jonrog25.store (store_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);
  

`

db.execute(create_food_table_sql);

db.end();