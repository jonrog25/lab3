const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_food_table_sql = "DELETE FROM food;"

db.execute(delete_food_table_sql);

const delete_store_table_sql = "DELETE FROM store;"

db.execute(delete_store_table_sql);

const insert_store_sql = `
    INSERT INTO store
     (store_name)
    VALUES 
    (?);
`
db.execute(insert_store_sql, ['Trader Joes']);
db.execute(insert_store_sql, [ 'Shoprite']);
db.execute(insert_store_sql, [ 'Krogers']);
db.execute(insert_store_sql, [ 'Stop and Shop']);
db.execute(insert_store_sql, [ 'Wegmans']);

const insert_food_sql =` 
    INSERT INTO food
     (food_name, food_desc, food_amt, store_id)
    VALUES 
    (?,?,?,?);
`

db.execute(insert_food_sql, ['Yogurt', 'Pink', 2, 1]);
db.execute(insert_food_sql, ['Apple', 'Green', 4, 2]);
db.execute(insert_food_sql, ['Cereal', 'Lucky Charms', 1, 4]);
db.execute(insert_food_sql, ['Ice Cream', 'Oreo', 1, 1]);

db.end();