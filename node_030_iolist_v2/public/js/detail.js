document.addEventListener("DOMContentLoaded", () => {
    const btn_update = document.querySelector("button.btn_update");
    const btn_list = document.querySelector("button.btn_list");

    btn_list.addEventListener("click", () => {
        document.location.replace("/products");
    });

    btn_update.addEventListener("click", (e) => {
        const target = e.target;
        if (target.tagName === "P") {
            const div = target.closest("DIV");
            const p_code = div.dataset.pcode;
            document.location.replace(`/products/${p_code}/update`);

        }

    });

});