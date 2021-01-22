create database cav;
use cav;
create table incomming_dsrc_message (
   message_id INT NOT NULL AUTO_INCREMENT,
   value TEXT,
   PRIMARY KEY ( message_id )
);