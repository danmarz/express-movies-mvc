create schema movies;
use movies;
use mydb;
select * from movies;
drop table movies;
drop table movie;
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

INSERT INTO movie(
select * from movies);

SELECT * from movie;

select * from movie where movie_id = 2;