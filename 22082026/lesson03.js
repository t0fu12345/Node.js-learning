const People = require('./people');

const lesson03 = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // - Khai báo biến, toản tử, ...
    var a = 1;
    let b = 2;
    const c = 3;

    console.log("a = ", a);
    console.log("b = ", b);
    console.log("c = ", c);

    // - Funtion
    function add(a, b) {
        return a + b;
    }
    console.log("add(1, 2) = ", add(1, 2));


    // - Mảng: index & key -> value
    // - Mang index
    // B1. Hoc cach khai bao
    var arr1 = new Array();
    var arr2 = new Array(5);
    var arr3 = new Array(1, 2, 3, 4, 5);
    var arr4 = [];
    var arr5 = [1, 2, 3, 4, 5];

    // B2. Them cac phan tu
    arr5.push(60);
    arr5.push(70);

    // B3. Lay phan tu & duyet cac phan tu trong
    console.log("arr5[1] = ", arr5[1]);

    for (let i = 0; i < arr5.length; i++) {
        console.log("arr5[i] = ", arr5[i]);
    }
    // B4. Insert 1 phan tu vao vi tri bat ky
    arr5.splice(2, 0, 99);
    console.log("arr5 = ", arr5);

    // B5. Update 1 phan tu trong
    arr5[3] = 101;
    console.log("arr5 = ", arr5);

    // B6. Xoa 1 phan tu trong
    arr5.splice(2, 1);
    console.log("arr5 = ", arr5);

    arr5.pop();
    console.log("arr5 = ", arr5);

    //B7. Xoa mang
    arr5 = [];
    console.log("arr5 = ", arr5);

    // Mang key -> value -> Object
    // B1. Tao
    // sinh vien: fullname = TRAN VAN A, age = 20, address = Ha Noi
    var sinhVien = {
        fullname: "TRAN VAN A",
        age: 20,
        address: "Ha Noi"
    };

    // B2. Lay value theo key
    console.log("sinhVien.fullname = ", sinhVien.fullname);
    console.log("sinhVien.age = ", sinhVien.age);
    console.log("sinhVien.address = ", sinhVien.address);

    // B3. Update value theo key
    sinhVien.age = 21;
    console.log("sinhVien.age = ", sinhVien.age);

    // B4. Them key moi
    sinhVien.email = "[EMAIL_ADDRESS]";
    console.log("sinhVien = ", sinhVien);

    // B5. Xoa key
    delete sinhVien.address;
    console.log("sinhVien = ", sinhVien);

    var dataList = [];
    dataList.push(sinhVien);
    dataList.push({
        fullname: "TRAN VAN B",
        age: 22,
        address: "Ha Noi",
        email: "[EMAIL_ADDRESS]"
    });
    // - If, else, for, while, do .. while, foreach
    // - If else
    if (dataList.length > 0) {
        console.log("dataList = ", dataList);
    } else {
        console.log("dataList = []");
    }
    // - Switch case
    switch (dataList.length) {
        case 10:
            console.log("dataList có 10 phần tử");
            break;
        default:
            console.log("dataList không có 10 phần tử");
            break;
    }

    // - For
    for (let i = 0; i < dataList.length; i++) {
        console.log("dataList[i] = ", dataList[i]);
    }

    // - While
    let i = 0;
    while (i < dataList.length) {
        console.log("dataList[i] = ", dataList[i]);
        i++;
    }

    // - Do .. while
    let j = 0;
    do {
        console.log("dataList[j] = ", dataList[j]);
        j++;
    } while (j < dataList.length);

    // - Foreach
    for (item of dataList) {
        console.log("item = ", item);
    }

    // Cu phap: lambda function
    dataList.forEach((item) => {
        console.log("item = ", item);
    });

    var p1 = new People("TRAN VAN A", 20, "Ha Noi");
    console.log("p1 = ", p1);
    console.log("p1.fullname = ", p1.fullname);
    console.log("p1.age = ", p1.age);
    console.log("p1.address = ", p1.address);

    var p2 = new People("TRAN VAN B", 22, "Ha Noi");
    console.log("p2 = ", p2);
    console.log("p2.fullname = ", p2.fullname);
    console.log("p2.age = ", p2.age);
    console.log("p2.address = ", p2.address);

    // - Object, Class Object (OOP)
    // - Object doi tuong -> cu the (Instance) Doi Tuong A: fullname -> TRAN VAN A, age: 20, address: HN, rollno: R001
    // - Object doi tuong B: fullname -> TRAN VAN B, age: 22, address: HN, rollno: R002
    // - Object doi tuong C: fullname -> TRAN VAN C, age: 21, address: HN, rollno: R003
    // - Class Object -> Khuon mau SV: fullName, age, address, rollno

    // class Student {
    //     fullname;
    //     age;
    //     address;
    //     rollno;
    // }

    // var stdA = new Student();
    // stdA.fullname = "Tran Van A";
    // stdA.age = 20;
    // stdA.address = "Ha Noi";
    // stdA.rollno = "R001";
    // console.log("stdA = ", stdA);

    // var stdB = new Student();
    // stdB.fullname = "Tran Van B";
    // stdB.age = 20;
    // stdB.address = "Ha Noi";
    // stdB.rollno = "R001";
    // console.log("stdB = ", stdB);

    class Student {
        fullname;
        age;
        address;
        rollno;

        constructor(fullname, age, address, rollno) {
            this.fullname = fullname;
            this.age = age;
            this.address = address;
            this.rollno = rollno;
        }
    }
    var studentA = new Student("TRAN VAN A", 20, "Ha Noi", "R001");
    console.log("studentA = ", studentA);
    console.log("studentA.fullname = ", studentA.fullname);
    console.log("studentA.age = ", studentA.age);
    console.log("studentA.address = ", studentA.address);
    console.log("studentA.rollno = ", studentA.rollno);

    // var studentB = new Student("TRAN VAN B", 22, "Ha Noi", "R002");
    // var studentC = new Student("TRAN VAN C", 21, "Ha Noi", "R003");
    // var studentD = new Student("TRAN VAN D", 23, "Ha Noi", "R004");
    // var studentE = new Student("TRAN VAN E", 24, "Ha Noi", "R005");
    // var studentF = new Student("TRAN VAN F", 25, "Ha Noi", "R006");
    // var studentG = new Student("TRAN VAN G", 26, "Ha Noi", "R007");
    // var studentH = new Student("TRAN VAN H", 27, "Ha Noi", "R008");
    // var studentI = new Student("TRAN VAN I", 28, "Ha Noi", "R009");
    // var studentJ = new Student("TRAN VAN J", 29, "Ha Noi", "R010");

    // var studentList = [];
    // studentList.push(studentA);
    // studentList.push(studentB);
    // studentList.push(studentC);
    // studentList.push(studentD);
    // studentList.push(studentE);
    // studentList.push(studentF);
    // studentList.push(studentG);
    // studentList.push(studentH);
    // studentList.push(studentI);
    // studentList.push(studentJ);
    // console.log("studentList = ", studentList);
    // console.log("studentA = ", studentA);
    // console.log("studentB = ", studentB);
    // console.log("studentC = ", studentC);
    // console.log("studentD = ", studentD);
    // console.log("studentE = ", studentE);
    // console.log("studentF = ", studentF);
    // console.log("studentG = ", studentG);
    // console.log("studentH = ", studentH);
    // console.log("studentI = ", studentI);
    // console.log("studentJ = ", studentJ);

    res.end('<h1>Bài học JS</h1><p>Xin chào</p>');
};

module.exports = lesson03;