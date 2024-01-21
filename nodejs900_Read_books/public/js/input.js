document.addEventListener("DOMContentLoaded", () => {
    const BOOK_INDEX = {
        ISBN: 0,
        TITLE: 1,
        AUTHOR: 2,
        PUBLISHER: 3,
        PRICE: 4,
    };

    const isbn_check = async (isbn) => {
        const response = await fetch(`/books/${isbn}/check`);
        const json = await response.json();
        console.log(json);
        return json.result;
    };

    const form = document.querySelector("form.book");
    const btn_submit = form.querySelector("button");

    const inputs = form.querySelectorAll("input");
    const isbn = inputs[BOOK_INDEX.ISBN];
    const title = inputs[BOOK_INDEX.TITLE];
    const author = inputs[BOOK_INDEX.AUTHOR];
    const publisher = inputs[BOOK_INDEX.PUBLISHER];
    const price = inputs[BOOK_INDEX.PRICE];

    const error_divs = document.querySelectorAll("div.book.error");

    const isbn_valid = async (target) => {

        const result = await isbn_check(target.value);
        let message = "";
        let color = "red";
        if (result === "ERROR") {
            message = " * DB 오류";
        } else if (result === "있다") {
            message = " * 이미 등록된 ISBN입니다";
        } else if (result === "없다") {
            message = " * 사용가능한 ISBN입니다";
            color = "blue";
        }
        error_divs[ST_INDEX.ISBN].innerHTML = message;
        error_divs[ST_INDEX.ISBN].style.color = color;

        return color === "red";

    };

    btn_submit?.addEventListener("click", async () => {
        error_divs.forEach((item) => (item.innerHTML = ""));
        if (!isbn.value) {
            error_divs[BOOK_INDEX.ISBN].innerHTML =
                "* ISBN을 반드시 입력해야 합니다";
            isbn.select();
            return false;
        } else {
            const bRedYes = isbn_valid(isbn);
            if (bRedYes) {
                isbn.select();
                return false;
            }
        }
        if (!title.value) {
            error_divs[BOOK_INDEX.TITLE].innerHTML =
                "* 도서명은 반드시 입력해야 합니다";
            title.select();
            return false;
        }
        if (!author.value) {
            error_divs[BOOK_INDEX.AUTHOR].innerHTML =
                "* 저자는 반드시 입력하세요";
            author.select();
            return false;
        }
        if (!publisher.value) {
            error_divs[BOOK_INDEX.PUBLISHER].innerHTML =
                "* 출판사를 반드시 입력하세요";
            publisher.select();
            return false;
        }
        if (!price.value) {
            error_divs[BOOK_INDEX.PRICE].innerHTML =
                "* 가격을 반드시 입력하세요";
            price.select();
            return false;
        }
        form.submit();
    });

    let EVENT_ISBN = false;
    isbn?.addEventListener("blur", async (event) => {
        const target = event.target;
        const value = target.value;
        if (!value) {
            error_divs[BOOK_INDEX.ISBN].innerText =
                "* ISBN을 입력해 주세요";
            target.select();
            return false;
        } else {
            const bRedYes = await isbn_valid(target);
            if (bRedYes) {
                target.select();
                return false;
            }
        }
        EVENT_ISBN = true;
    });

    title.addEventListener("blur", async (event) => {
        if (!EVENT_ISBN) return false;
        const target = event.target;
        const value = target.value;
        if (!value) {
            error_divs[BOOK_INDEX.TITLE].innerText = 
                " * 도서명은 반드시 입력해야 합니다 "
            target.select();
            return false;
        } else {
            const bRedYes = await title_valid(target);
            if (bRedYes) {
                target.select();
                return false;
            }
        }
        EVENT_TITLE = true;
    });

    isbn.focus();


});