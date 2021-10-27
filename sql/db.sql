-- Create and use schema
create schema if not exists mydb;
use mydb;

-- Set DB deterministic
set global log_bin_trust_function_creators = 1;

-- Create tables
create table movie(
	movie_id int not null primary key auto_increment,
    title varchar(100) not null,
    poster varchar(100),
    synopsis varchar(400),
    genres varchar(100),
    year varchar(4),
    director varchar(100),
    actors json
);
-- DROP TABLE movie;

CREATE TABLE secret(
	secret blob not null
);
-- drop table secret;

CREATE TABLE user (
   user_id int not null primary key auto_increment,
   username VARCHAR(45),
   password blob not null,
   role enum('user', 'admin') DEFAULT 'user',
   routes JSON
);
-- DROP TABLE user;

-- Inserts
insert into secret values(UNHEX(SHA2('mysecret',512)));
-- INSERT into movie from .csv

-- Selects
select * from movie;
select secret from secret;
select * from user;
select CAST(AES_DECRYPT(password, (select secret from secret)) AS CHAR(10000) CHARACTER SET utf8mb4) from user;
call insert_user('Dani', '1234','user');
select check_user('Dani','1234');
-- set @result = '';
-- select @result;

-- insert_user procedure
drop procedure insert_user;
DELIMITER $$
create procedure insert_user(
	IN p_username varchar(100),
	IN p_password varchar(100),
    IN p_role enum('user', 'admin')
)
BEGIN
DECLARE hashVariable blob;
SET hashVariable = aes_encrypt(p_password, (select secret from mydb.secret));

IF ((select username from user where username = p_username) IS NOT NULL)
THEN
SIGNAL SQLSTATE '45000'
SET message_text = "Username already exists";
END IF;

INSERT INTO user(username, password, role)

values(
	p_username,
	hashVariable,
	p_role);
    
select user_id from user where username = p_username;
END $$
DELIMITER ;

-- check_user function
DELIMITER $$
CREATE FUNCTION check_user(
	p_username varchar(100),
    p_password varchar(100)
    )
RETURNS tinyint
-- DETERMINISTIC
BEGIN
DECLARE decrypt_password VARCHAR(100);

SELECT CAST(aes_decrypt(password, (SELECT secret FROM secret)) AS char(10000) character SET utf8mb4)
INTO decrypt_password FROM user where username = p_username;

IF(decrypt_password != p_password OR decrypt_password IS NULL)
THEN signal sqlstate '45000'
	SET message_text = 'user or password incorrect.';
END IF;

RETURN 1;
END $$
DELIMITER ;