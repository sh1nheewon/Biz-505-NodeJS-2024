const NAV_TEXT = {
  HOME: "Home",
  상품관리: "상품관리",
  거래처관리: "거래처관리",
  매입매출: "매입매출",
  로그인: "로그인",
  회원가입: "회원가입",
  MyPAGE: "MyPAGE",
  로그아웃: "로그아웃",
}

document.addEventListener('DOMContentLoaded', () => {
  const main_nav = document.querySelector("nav.main");
  main_nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "LI") {
      const navText = target.textContent;
      let url = "/";
      if (navText === NAV_TEXT.회원가입) {
        url += "users/join";
      } else if (navText === NAV_TEXT.로그인) {
        url += "users/login";
      } else if (navText === NAV_TEXT.로그아웃) {
        url += "users/logout";
      } else if (navText === NAV_TEXT.매입매출) {
        url += "iolist/";
      } else if (navText === NAV_TEXT.상품관리) {
        url += "products/";
      }
      document.location.replace(url);
    }
  });

  const iolist_count_get = async () => {
    const main_item = document.querySelector("address.item");

    const res = await fetch("/iolist/count");
    const json = await res.json();
    main_item.innerHTML = `매입매출 데이터는 ${json.count} 입니다`;
  };
  iolist_count_get();

});
