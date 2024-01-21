document.addEventListener("DOMContentLoaded", () => {
    const btn_list = document.querySelector("button.btn_list");

    const btn_update = document.querySelector("button.btn_update");
    const btn_delete = document.querySelector("button.btn_delete");
    btn_list?.addEventListener("click", () => {
        document.location.href = "/books";
    });

    btn_delete.addEventListener("click", (e) => {
        if (confirm("삭제된 데이터는 복구할 수 없습니다.\n정말 삭제할까요?")) {
            const target = e.target;
            const isbn = target.dataset.num;
            document.location.replace(`/books/${isbn}/delete`);
        }
    });
    btn_update.addEventListener("click", (e) => {
        const isbn = e.target.dataset.num;
        if (isbn) {
            document.location.replace(`/books/${isbn}/update`);
        }
    });




});