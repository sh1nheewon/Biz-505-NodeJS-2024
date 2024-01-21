SHOW DATABASES;
CREATE DATABASE bookDB;
USE bookDB;
CREATE TABLE tbl_read_book (
	isbn	VARCHAR(13)	PRIMARY KEY,
	title	VARCHAR(50)	NOT NULL,
	author	VARCHAR(50)	NOT NULL,	
	publisher	VARCHAR(50)	NOT NULL,
	price	VARCHAR(6) NOT NULL,
	discount	VARCHAR(6),
	description	VARCHAR(4000),	
	pubdate	VARCHAR(10)		,
	link	VARCHAR(125)	,	
	image	VARCHAR(125)
);

CREATE TABLE tbl_member(
	M_ID	VARCHAR(20)		PRIMARY KEY,
	M_PASSWORD	VARCHAR(125)	NOT NULL,	
	M_EMAIL	VARCHAR(125) NOT NULL,	
	M_NAME	VARCHAR(12)	NOT NULL
);



INSERT INTO 
tbl_read_book(isbn, title, author, publisher, price, discount, description, pubdate, link, image )
VALUES
('97911888505012' , '왕이된 남자 1' , '김선덕', '북라이프', '14,000' , '12,600', "" , "", "", "");

INSERT INTO
tbl_member(M_ID, M_PASSWORD, M_EMAIL, M_NAME)
VALUES
('shin' , '1234' , 'shin@naver.com' , '신희원');

SHOW TABLES;
SELECT * FROM tbl_read_book;

