document.addEventListener("DOMContentLoaded", () => {
    const pro_table = document.querySelector("table.products");
    /*
    table.products 선택자는 상품리스트 화면에서는 유효한 선택자 이다
    하지만 detail, insert 등의 화면에서는 해당 선택자는 없는 상태이다
    detail, insert 화면 등에서는 pro_table 객체가 null 인 상태가 된다는 것이다
    pro_table 객체가 null 인 상태일 때, .add() 등의 method 를 실행하면
    null point exception 이 발생하고 HTML JS 에서는 이후의 JS 코드가 모두 무력화 된다. (실행이 안됨)

    그래서 pro_table 객체가 null 일 때는 다른 동작을 건너 뛰도록 해주어야 한다.
    이때 사용하는 기호가 "객체 ? " 이다. 
    이러한 코드를 null safe 코드라고 한다.
    */
    pro_table?.addEventListener("click", (e) => {
        const target = e.target;
        if (target.tagName === "TD") {
            const tr = target.closest("TR");
            const p_code = tr.dataset.pcode;
            document.location.replace(`/products/${p_code}/detail`);
        }
    });


});

document.addEventListener("DOMContentLoaded", () => {
    const btn_insert = document.querySelector("#btn_insert");
    btn_insert?.addEventListener("click", () => {
        document.location.replace("/products/insert");
    })
});