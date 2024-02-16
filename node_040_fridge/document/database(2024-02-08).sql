CREATE DATABASE fridgeDB;
USE fridgeDB;
CREATE TABLE tbl_product (
	p_seq int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	p_fseq int NOT NULL,
	p_name varchar(125) NOT NULL,
	p_exdate varchar(12) NOT NULL,
	p_quan int NOT NULL,
	p_data varchar(12) NOT NULL,
	p_memo varchar(125)
);

-- 오늘 날짜에서 10일 전 부터 임의의 날짜에 상품 구매
-- 유통기간 : 구입일로부터 5 ~ 15 일 범위의 임의의 날짜로 생성

SELECT COUNT(*) FROM tbl_product;
SELECT * FROM tbl_product;
