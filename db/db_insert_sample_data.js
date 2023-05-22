const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_food_table_sql = "DELETE FROM food;"

db.execute(delete_food_table_sql);

const delete_store_table_sql = "DELETE FROM store;"

db.execute(delete_store_table_sql);

const insert_store_sql = `
    INSERT INTO store
     (store_id, store_name)
    VALUES 
    (?,?);
`

db.execute(insert_store_sql, [1, 'Shoprite']);
db.execute(insert_store_sql, [2, 'Krogers']);
db.execute(insert_store_sql, [3, 'Stop and Shop']);
db.execute(insert_store_sql, [4, 'Shoprite']);

const insert_food_sql =` 
    INSERT INTO food
     (food_id, food_name, food_desc, food_amt, store_id)
    VALUES 
    (?,?,?,?,?);
`

db.execute(insert_food_sql, [1, 'Yogurt', 'Pink', 2, 3]);
db.execute(insert_store_sql, [2, 'Apple', 'Green', 4, 2]);
db.execute(insert_store_sql, [3, 'Cereal', 'Lucky Charms', 1, 4]);
db.execute(insert_store_sql, [4, 'Ice Cream', 'Oreo', 1, 1]);
