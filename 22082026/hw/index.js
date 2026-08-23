const http = require('http')
const PORT = 8080;
const Student = require('./student')

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    //
    var studentA = new Student("Nguyen Van A", 20, "Ha Noi", "R001", 10);
    var studentB = new Student("Tran Thi B", 21, "Da Nang", "R002", 9.5);
    var studentC = new Student("Le Van C", 19, "Hai Phong", "R003", 6);
    var studentD = new Student("Pham Van D", 22, "Ha Noi", "R004", 2);

    //
    var studentList = [studentA, studentB, studentC];
    studentList.push(studentD);
    studentList.pop();
    studentList.splice(0, 1);
    studentList.splice(0, 0, studentD);
    console.log(studentB);
    console.log("So luong sinh vien:", studentList.length);

    //4
    console.log("Thong tin sinh vien 1:", studentA);
    studentA.fullname = "Nguyen Van ABC";
    studentA.age = 25;
    studentA.address = "TPHCM";
    studentA.rollno = "R005";
    studentA.score = 10;
    studentA.email = "[EMAIL_ADDRESS]";
    delete studentA.address;
    console.log("Thong tin sinh vien 1 sau update:", studentA);

    //5
    const getStudentCount = (studentList) => {
        return studentList.length;
    }

    const getStudentByRollno = (studentList, rollno) => {
        return studentList.find(s => s.rollno === rollno);
    }

    const getAverageScore = (studentList) => {
        if (studentList.length === 0) return 0;
        let avg = 0;
        for (let i = 0; i < studentList.length; i++) {
            avg += studentList[i].score;
        }
        return (avg / studentList.length);
    }
    var avg = getAverageScore(studentList);

    const getStudentStatus = (student, score) => {
        if (score >= 8) {
            student.status = "Gioi";
        } else if (score >= 6.5 && score < 8) {
            student.status = "Kha";
        } else if (score >= 5 && score < 6.5) {
            student.status = "Trung binh";
        } else {
            student.status = "Yeu";
        }
    }

    //6
    var dat = 0, kodat = 0;
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].score >= 5) {
            dat++;
            console.log("Sinh vien thu " + (i + 1) + " dat");
        } else {
            kodat++;
            console.log("Sinh vien thu " + (i + 1) + " ko dat");
        }
    }

    //7
    var gioi = 0, kha = 0, tb = 0, yeu = 0;
    for (let i = 0; i < studentList.length; i++) {
        getStudentStatus(studentList[i], studentList[i].score);
        switch (studentList[i].status) {
            case "Gioi": {
                gioi++;
                console.log("Thang nay gioi!"); break;
            } case "Kha": {
                kha++;
                console.log("Thang nay kha!"); break;
            } case "Trung binh": {
                tb++;
                console.log("Thang nay trung binh!"); break;
            } case "Yeu": {
                yeu++;
                console.log("Thang nay yeu"); break;
            }
        }
    }
    // //8
    // for (let i = 0; i < studentList.length; i++) {
    //     console.log(studentList[i]);
    // }
    // let i = 0;
    // while (i < studentList.length) {
    //     console.log(studentList[i]);
    //     i++;
    // }
    // let j = 0;
    // do {
    //     console.log(studentList[i]);
    //     j++;
    // } while (j < studentList.length);
    studentList.forEach((item) => {
        console.log(item);
    })

    //9
    var highest = 0, lowest = 10, oldest = 0;
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].score > highest) {
            highest = studentList[i].score;
        }
        if (studentList[i].score < highest) {
            highest = studentList[i].score;
        }
        if (studentList[i].age > oldest) {
            oldest = studentList[i].age;
        }
    }
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].score === highest) {
            console.log("Sinh vien co diem cao nhat: " + studentList[i].fullname);
        }
        if (studentList[i].score === lowest) {
            console.log("Sinh vien co diem thap nhat: " + studentList[i].fullname);
        }
        if (studentList[i].age === oldest) {
            console.log("Sinh vien gia nhat: " + studentList[i].fullname);
        }
        if (studentList[i].address === 'Ha Noi') {
            console.log("Sinh vien o Ha Noi: " + studentList[i].fullname);
        }
        if (studentList[i].score >= 8) {
            console.log("Sinh vien co score>=8: " + studentList[i].fullname);
        }
    }

    //10
    if (url === '/lesson03') {
        res.writeHead(200);
        res.end(`<h1>Thống kê</h1>
        <h2>Tổng số sinh viên:${studentList.length}</h2><br>
        <h2>Số sinh viên đạt: ${dat}</h2><br>
        <h2>Số sinh viên ko đạt: ${kodat}</h2><br>
        <h2>Số sinh viên giỏi: ${gioi}</h2><br>
        <h2>Số sinh viên khá: ${kha}</h2><br>
        <h2>Số sinh viên trung bình: ${tb}</h2><br>
        <h2>Số sinh viên yếu: ${yeu}</h2><br>
        <h2>Điểm trung bình: ${avg}</h2>
        `);
    } else {
        res.writeHead(404);
        res.end(`<h1>404 - Không tìm thấy trang</h1>
        <p>Truy cập <a href="/lesson03">/lesson03</a> để xem thống kê.</p>`);
    }
})
server.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});