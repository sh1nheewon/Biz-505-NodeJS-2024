document.addEventListener("DOMContentLoaded", () => {
    const ST_INDEX = {
        ST_NUM: 0,
        ST_NAME: 1,
        ST_DEPT: 2,
    };

    const st_num_check = async (st_num) => {
        // 서버에 GET: /student/학번/check 로 요청하기
        // 서버에서 response 한 모든 정보를 response 변수에 받기(저장)
        const response = await fetch(`/student/${st_num}/check`); // ajax. 비동기요청. 화면은 그대로 두고 bgd에서 서버와 데이터를 교환함.

        // response 정보에서 json type 의 값(데이터)만 추출하여 json 에 저장. res.json 으로 보내기 때문에 json 에 저장 가능
        // {result:"ERROR", message:""}, 
        // 또는 {result: "있다",STD: "학번"},
        // 또는 {result: "없다",STD: "null"},
        const json = await response.json();
        console.log(json);
        // json 데이터 중에서 result 변수만 추출하여 return
        // ERROR, 있다, 없다 중에 한 가지를 return
        return json.result; // 이 result 는 서버가 보내준 result 값 (있다, 없다 student.js:90)
    };


    // const st_num = document.querySelector("input[name='st_num]") : // ID 미지정
    // const st_num = document.querySelector("#st_num");
    // const st_name = document.querySelector("#st_name");
    // const st_dept = document.querySelector("#st_dept");
    // const btn_submit = document.querySelector("form.student button");

    const form = document.querySelector("form.student");
    // const st_num = form.querySelector("#st_num");
    // const st_name = form.querySelector("#st_name");
    // const st_dept = form.querySelector("#st_dept");

    const btn_submit = form.querySelector("button");
    const inputs = form.querySelectorAll("input");
    const st_num = inputs[ST_INDEX.ST_NUM];
    const st_name = inputs[ST_INDEX.ST_NAME];
    const st_dept = inputs[ST_INDEX.ST_DEPT];

    // 여러개의 tag 묶음을 배열로 만들기
    const error_divs = document.querySelectorAll("div.student.error");

    const st_num_valid = async () => {
        // result 에는 ERROR, 있다, 없다 중 한 가지 문자열이 저장된다.
        const result = await st_num_check(st_num.value);
        let message = "";
        let color = "red";
        if (result === "ERROR") {
            message = " * DB 오류";
        } else if (result === "있다") {
            message = " * 이미 등록된 학번입니다";
        } else if (result === "없다") {
            message = " * 사용 가능한 학번입니다";
            color = "blue";
        }
        error_divs[ST_INDEX.ST_NUM].innerHTML = message;
        error_divs[ST_INDEX.ST_NUM].style.color = color;
        if (color === "red") {
            st_num.select();
            return false;
        }
        return true;
    }

    /* 
    먼저 btn_submit(button) 의 click event 를 최소한으로 테스트를 하고 
    이후에 btn_submit null pointer execption 을 일으키는 현상을 방지하기 위하여
    btn_submit? 형식으로 이후 코드를 사용한다.
    */
    // 회원가입할 때 중복검사 코드로도 사용
    btn_submit?.addEventListener("click", async () => {
        // 표시되었던 error 메시지를 모두 clear 하기
        error_divs.forEach((item) => (item.innerHTML = ""));

        // alert("전송");
        if (!st_num.value) {
            error_divs[ST_INDEX.ST_NUM].innerHTML = "* 학번은 반드시 입력하세요";
            st_num.select();
            return false;
        } else {
            const bYes = st_num_valid();
            if (!bYes) return false;
        }

        if (!st_name.value) {
            error_divs[ST_INDEX.ST_NAME].innerHTML = "* 학생 이름은 반드시 입력하세요";
            st_name.select();
            return false;
        }
        if (!st_dept.value) {
            error_divs[ST_INDEX.ST_DEPT].innerHTML = "* 학과는 반드시 입력하세요";
            st_dept.select();
            return false;
        }

        // 유효성 검사를 마치면 서버로 데이터 보내기
        form.submit();
    })


    // 유효성검사
    // 학번을 입력받은 input box 에 event 걸기
    /**
     * blur event
     * 보통은 input box 에서 사용하는 event
     * input box 에 focus() 가 있다가 다른 곳으로 focus() 이동하는 순간 발생하는 event
     */
    st_num?.addEventListener("blur", (event) => {
        const target = event.target; // target은 타겟된 작은 하나의 값. currentTarget 은 이벤트가 걸린 타겟 전체. 
        const value = target.value;
        if (!value) {
            error_divs[ST_INDEX.ST_NUM].innerText = " * 학번을 입력해 주세요 ";
            // alert("학번은 반드시 입력하세요");
            target.select();
            return false;
        } else {
            const bYes = st_num_valid();
            if (!bYes) return false;
        }
    });

    st_name?.addEventListener("blur", (event) => {
        const target = event.target;
        const value = target.value;
        if (!value) {
            error_divs[ST_INDEX.ST_NAME].innerText = " * 학생 이름을 입력해 주세요";
            target.select();
            return false;
        } else {
            error_divs[ST_INDEX.ST_NAME].innerText = "";
        }
    });

    st_dept?.addEventListener("blur", (event) => {
        const target = event.target;
        const value = target.value;
        if (!value) {
            error_divs[ST_INDEX.ST_DEPT].innerText = "* 학과를 입력해 주세요";
            target.select();
            return false;
        } else {
            error_divs[ST_INDEX.ST_DEPT].innerText = "";
        }
    });

    st_num.focus(); // 바로 st_num 값을 입력할 수 있도록 cursor focus 됨

});
