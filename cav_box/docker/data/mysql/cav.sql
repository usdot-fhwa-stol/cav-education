create database cav;
use cav;
create table cav_fe_incomming_dsrc_message (
   id INT NOT NULL AUTO_INCREMENT,
   messageId varchar(255),
   timestamp datetime(6),
   value TEXT,
   payload TEXT,
   PRIMARY KEY ( id )
);