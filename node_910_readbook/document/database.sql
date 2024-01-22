-- 독서록 프로젝트 2024
CREATE DATABASE bookDB2;
USE bookDB2;
/*
MySQL 칼럼 속성(데이터 type)

정수값 : TINYINT, SMALINT, INT(INTEGER),BIGINT
	TINYINY : 0 ~ 255(-128 ~ 127)
    SMALINT : 0 ~ 65535(-32768 ~ 32767)
    INT : 0 ~ 2의 4승 -1(-2의 3승 ~ 2의 3승 -1)
	BIGINT : 0 ~ 2의 8승 -1 (-2의 7승 ~ 2의 7승 -1)
    
실수값 : FLOAT, DOUBLE
	FLOAT(M,D) : M = 정수자릿수, D = 소수이하 자릿수
		ex)FLOAT(3,2) = ***.**

한글, 영문 문자열은 : VARCHAR(길이)
	0 ~ 65565 개의 문자열
    가급적 4000자 이하의 문자열을 저장하도록 권장
Text 형
    VARCHAR 보다 큰 문자열,  4000 자 이상의 문자열을 저장할 때
    (별도의 저장소에 저장)
*/tbl_books
CREATE TABLE tbl_books(
	isbn	VARCHAR(13)		PRIMARY KEY,
	title	VARCHAR(50)	NOT NULL	,
	author	VARCHAR(50)	NOT NULL	,
	publisher	VARCHAR(50)	NOT NULL,	
	price	INT	,
	discount	INT	,	
	description	VARCHAR(400)		,
	pubdate	VARCHAR(10)		,
	link	VARCHAR(125)	,	
	image	VARCHAR(125)	
);

-- table 의 물리적 구조 확인
DESCRIBE tbl_books;
DESC tbl_books; 

SELECT * FROM tbl_books;