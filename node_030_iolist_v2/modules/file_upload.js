/*
파일이 업로드 되면 업로드 된 파일을 저장폴더에 저장하는 미들웨어
*/
// import fs from "fs"
// fs.existsSync()
// fs 모듈에서 existsSync() 함수와 mkdirSync() 함수만 사용하겠다
import { existsSync, mkdirSync } from "fs";
import path from "path";
import multer from "multer";

// uuid 모듈에 있는 v4() 함수를 uuid 라는 이름으로 사용하겠다
import { v4 as uuid } from "uuid";


// 프로젝트의 물리적 저장소 경로(path)
// ~/document/workspace/nodejs/node_030_iolist 가 appRoot 에 저장됨
const appRoot = process.env.PWD;
// ~/document/workspace/nodejs/node_030_iolist/public/uploads 라는 폴더 생성. 운영체제에 맞도록 생성해주는 코드
const upLoadPath = path.join(appRoot, "public", "uploads");

/*
multer 는 destination 과 filename 이라는 2개의 함수가 필요하다.
destination : 파일을 저장할 때 사용할 설정들
filename : 파일 이름에 대한 핸들링
*/
const storageOption = {
    destination: async (req, file, callback) => {
        if (!existsSync(upLoadPath)) {
            // !existsSync : 파일이 없을 때
            mkdirSync(upLoadPath);
            // mkdirSync : 생성
        }
        callback(null, upLoadPath); // if 끝나면 폴더에 파일 upload
    },
    filename: (req, file, callback) => {
        // image name injection 해킹 공격에 대비하여
        // 원래 이름을 변경하여 업로드 하도록 지시
        const upFileName = `${uuid()}-${file.originalname}`;
        callback(null, upFileName);

    }
};
const storage = multer.diskStorage(storageOption); // json 으로 분리
const upLoad = multer({ storage }); // json 으로 새로 생성해주어야함

export { upLoad };
// 함수를 직접 export