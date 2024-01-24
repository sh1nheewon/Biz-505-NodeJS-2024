import Sequelize from "sequelize";

// (seq) 는 소문자로. return에 사용
const book = (sequelize) => {
  const book_table = {
    // book_table 이라는 객체 안에 isbn 이라는 객체 생성 (json 안에 다른 json 생성)
    isbn: {
      // 대문자 Seq 는 import 를 가지고 옴(1)
      type: Sequelize.DataTypes.STRING(13),
      primaryKey: true, // PK 선언
      defaultValue: "",
    },
    title: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, //Not Null 선언
      defaultValue: "",
    },
    author: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, //Not Null 선언
      defaultValue: "",
    },
    publisher: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, //Not Null 선언
      defaultValue: "",
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
  }
  return sequelize.define("tbl_books", book_table, {
    // sequelize 라는 변수를 선언하고, 
    // book 함수에서 매개변수로 받은 sequelize 를 값으로 세팅한다.
    // 단 선언하는 변수명과, 세팅하는 값이 담긴 변수명이 같으면 
    // 값이 담긴 변수명을 생략할 수 있다.
    // sequelize : sequelize 이 명령문을 sequelize 만 사용해도 된다.
    sequelize,
    tableName: "tbl_books",
    timestamps: false,
  });
};
export default book;
