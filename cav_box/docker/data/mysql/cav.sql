create database cav;
use cav;
create table incomming_dsrc_message (
   id INT NOT NULL AUTO_INCREMENT,
   message_type varchar(255),
   timestamp datetime(6),
   original_message TEXT,
   payload TEXT,
   PRIMARY KEY ( id )
);