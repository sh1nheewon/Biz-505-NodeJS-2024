import sequelize from "sequelize";

// seq : sequelize 도구에서 제공하는 data 객체 생성 도구
const books = (seq) => {
    // book_table 이라는 DTO 생성
    const book_table = {
        isbn: {
            type: sequelize.DataTypes.STRING(13),
            primaryKey: true,
        },
        title: {
            type: sequelize.DataTypes.STRING(50),
            allowNull: false,
            // = not Null
        },
        author: {
            type: sequelize.DataTypes.STRING(50),
            allowNull: false,
        },
        publisher: {
            type: sequelize.DataTypes.STRING(50),
            allowNull: false,
        },
        price: {
            type: sequelize.DataTypes.INTEGER,
        },
        discount: {
            type: sequelize.DataTypes.INTEGER,
        },
    };
    const seq_init = {
        // const books 함수의 매개변수 seq 를 sequelize 라는 이름으로 선언
        sequelize: seq,
        tableName: "tbl_books",
    };
    // ORM : workbench 에서 만들지 않아도 table 자동생성. tableName 에 있는 tbl_books 모양대로 만들어짐
    return seq.define("tbl_books", book_table, seq_init);
};
export default books;