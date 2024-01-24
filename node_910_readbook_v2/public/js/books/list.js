document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("table.books tbody");
    tbody.addEventListener("click", (e) => {

        // target 은 tb tag
        const target = e.target;
        if (target.tagName === "TD") {
            // click 된 TD 의 부모 TR을 selector 하라
            const parTr = target.closest("TR");
            // selector 된 값의 isbn을 const isbn 변수에 담기
            const isbn = parTr.dataset.isbn;
            // alert(isbn);

            // document.location.href = `/books/${isbn}/detail` 
            // ~.href : 변수"", ~.replace : 함수()
            document.location.replace(`/books/${isbn}/detail`);
        }
    });
});