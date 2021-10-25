SELECT * FROM travelair.route;
drop table user;
drop table user_routes;
CREATE TABLE user (
   user_id int unsigned not null auto_increment,
   username VARCHAR(50),
   password blob,
   rol VARCHAR(50),
   PRIMARY KEY (user_id)
);
--     CONSTRAINT product_store_store foreign key (store_id) references store(id),
--     CONSTRAINT product_store_product foreign key (product_id) references product(id),
--     CONSTRAINT product_store_unique UNIQUE (product_id, store_id)
create table user_routes (
	route_id int unsigned not null,
    user_id int unsigned not null,
	CONSTRAINT user_routes_user foreign key (user_id) references user(user_id),
    constraint user_routes_routes foreign key (route_id) references route(route_id),
    constraint user_routes_unique UNIQUE (route_id, user_id)
);
select * from user;
use travelair;
select username, 
CAST(AES_DECRYPT(password, UNHEX(SHA2('My secret passphrase', 512))) AS CHAR(1000) character set utf8mb4)
from user;

drop procedure insert_user;

call insert_user('admin', '1234', 'user');

DELIMITER $$
create procedure insert_user(
	p_username varchar(100),
	p_password varchar(100),
	p_role enum('user','admin'))
BEGIN
INSERT INTO travelair.user(username, password, rol)
values(
	p_username,
	AES_ENCRYPT(p_password, UNHEX(SHA2('My secret passphrase',512))),
	p_role);
END $$
DELIMITER ;

INSERT INTO users VALUES(NULL ,'admin','1234','admin','{}');
drop procedure lista_aeropuertos;
drop procedure insert_user;

DELIMITER $$
create procedure lista_aeropuertos(cityInput varchar(100))
BEGIN
SELECT * FROM airport
join city using(city_id)
where city.name = cityInput
and iata_type = "airport";
END $$
DELIMITER ;

call lista_aeropuertos("New York");

/*
DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client ;
/*!50503 SET character_set_client = utf8mb4 ;
CREATE TABLE `route` (
  `route_id` int unsigned NOT NULL,
  `airline_id` int unsigned NOT NULL,
  `departure_airport_id` int unsigned NOT NULL,
  `arrival_airport_id` int unsigned NOT NULL,
  `transfers` int DEFAULT NULL,
  `planes` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`route_id`),
  KEY `fk_rou_ali_idx` (`airline_id`),
  KEY `fk_rou_dap` (`departure_airport_id`),
  KEY `fk_rou_aap` (`arrival_airport_id`),
  CONSTRAINT `fk_rou_aap` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airport` (`airport_id`),
  CONSTRAINT `fk_rou_ali` FOREIGN KEY (`airline_id`) REFERENCES `airline` (`airline_id`),
  CONSTRAINT `fk_rou_dap` FOREIGN KEY (`departure_airport_id`) REFERENCES `airport` (`airport_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
*/

select secret from secret;

select * from users;
create table secret(
	secret longblob not null
);

drop table secret;
insert into secret values((UNHEX(SHA2('mi secreto', 512))));
drop procedure insert_user;

DELIMITER $$
create procedure insert_user(
	IN p_username varchar(100),
	IN p_password varchar(100),
    IN p_role enum('user', 'admin'),
	OUT result varchar(100))
BEGIN
DECLARE hashVariable binary(100);
SET hashVariable = aes_encrypt(p_password, (select secret from secret));
INSERT INTO travelair.user(username, password, rol)
values(
	p_username,
	hashVariable,
	p_role);
    
    Select username into result from user where username = p_username;
END $$
DELIMITER ;

set @result = '';
call insert_user('Dani', '1234','user', @result);
select * from user;
select * from result;
select @result;


set global log_bin_trust_function_creators = 0;
drop function check_user;

DELIMITER $$
CREATE FUNCTION check_user(
	p_username varchar(100),
    p_password varchar(100)
    )
RETURNS tinyint
DETERMINISTIC
BEGIN
--
DECLARE decrypt_password VARCHAR(100);

SELECT CAST(aes_decrypt(password, (SELECT secret FROM secret)) AS char(100) character SET utf8mb4)
INTO decrypt_password FROM travelair.user where username = p_username;

IF(decrypt_password != p_password OR decrypt_password IS NULL)
THEN signal sqlstate '45000'
	SET message_text = 'user or password incorrect.';
END IF;

RETURN 1;
END $$
DELIMITER ;

select check_user('Dani','1234');

SELECT CAST(aes_decrypt('1234', (SELECT secret FROM secret)) AS char(100) character SET utf8mb4) FROM travelair.user where username = 'Dani';
select secret from secret;

select username, 
CAST(AES_DECRYPT(password, UNHEX(SHA2('My secret passphrase', 512))) AS CHAR(1000) character set utf8mb4)
from user;