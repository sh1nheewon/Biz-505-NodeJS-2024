document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("table.book.list");
    table.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === "TD") {
            const paTR = target.closest("TR");
            const tds = paTR.querySelectorAll("TD");
            const isbn = tds[1].innerText;
            document.location.href = `/books/${isbn}/detail`;
        }
    });


});