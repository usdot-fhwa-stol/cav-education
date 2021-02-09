create database cav;
use cav;
create table incomming_dsrc_message (
   message_id INT NOT NULL AUTO_INCREMENT,
   timestamp LONG,
   value TEXT,
   payload TEXT,
   PRIMARY KEY ( message_id )
);