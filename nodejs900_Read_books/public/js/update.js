document.addEventListener("DOMContentLoaded", () => {
    
    const btn_update = document.querySelector("button.btn_update");
    
    const btn_insert = document.querySelector("button.btn_insert");
    
    const btn_list = document.querySelector("button.btn_list");

    
    btn_insert.addEventListener("click", () => {
        document.location.href = "/books/insert";
    });
    
    btn_list.addEventListener("click", () => {
        document.location.href = "/books";
    });
   
    btn_update.addEventListener("click", (e) => {
        const isbn = e.target.dataset.num;
        if (isbn) {
             document.location.replace(`/books/${isbn}/detail`);
            // document.location.replace("/books/");
        }
    });
});