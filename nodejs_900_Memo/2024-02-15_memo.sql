CREATE DATABASE memodb;
USE memodb;
CREATE TABLE tbl_memo(
	m_seq	BIGINT		PRIMARY KEY,
	m_author	VARCHAR(25)	NOT NULL,
	m_date	VARCHAR(10)	NOT NULL	,
	m_time	VARCHAR(10)	NOT NULL	,
	m_memo	VARCHAR(400)	NOT NULL,	
	m_image	VARCHAR(400)
);
SELECT * FROM tbl_memo;
INSERT tbl_memo(m_seq,m_author,m_date,m_time,m_memo,m_image)
VALUES('1','작가','날짜','시각','메모','');