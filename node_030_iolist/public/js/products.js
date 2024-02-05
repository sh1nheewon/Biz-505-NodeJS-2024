document.addEventListener("DOMContentLoaded", () => {
    const pro_table = document.querySelector("table.products");
    pro_table.addEventListener("click", (e) => {
        const target = e.target;
        if (target.tagName === "TD") {
            const tr = target.closest("TR");
            const p_code = tr.dataset.pcode;
            document.location.replace(`/products/${p_code}/detail`);
        }
    });
    /*
        const btn_insert = document.querySelector("button.btn_insert");
        btn_insert.addEventListener("click", () => {
            document.location.href("/products/insert");
        });
    */
});