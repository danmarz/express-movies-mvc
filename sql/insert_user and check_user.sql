create table secret(
	secret blob not null
);
drop table secret;
insert into secret values(UNHEX(SHA2('mysecret',512)));
select secret from secret;

drop table user;
CREATE TABLE user (
   user_id int not null primary key auto_increment,
   username VARCHAR(45),
   password blob not null,
   role enum('user', 'admin') DEFAULT 'user',
   routes JSON
);
select * from user;

drop procedure insert_user;
DELIMITER $$
create procedure insert_user(
	IN p_username varchar(100),
	IN p_password varchar(100),
    IN p_role enum('user', 'admin'),
	OUT result varchar(100))
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
    
    Select username into result from user where username = p_username;
END $$
DELIMITER ;

set @result = '';
call insert_user('Dani', '1234','user', @result);
call insert_user('peter pan', '1234','user', @result);
call insert_user('Dani', '1234','user');
select CAST(AES_DECRYPT(password, (select secret from secret)) AS CHAR(10000) CHARACTER SET utf8mb4) from user;
select * from user;
select @result;

-------------------------------- check user

set global log_bin_trust_function_creators = 1;
drop function check_user;

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
select CAST(aes_decrypt(password, (SELECT secret FROM secret)) AS char(100) character SET utf8mb4) from user where username = 'Dani';
select check_user('Dani','1234');
select check_user('Dani','12345');
select check_user('peter pan','1234');