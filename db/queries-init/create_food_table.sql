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
  