document.addEventListener("DOMContentLoaded", () => {
    const btn_save = document.querySelector("input.btn_save");
    btn_save.addEventListener("click", () => {
        document.location.replace("/");
    })
});