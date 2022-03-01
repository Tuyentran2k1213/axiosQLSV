let svController = {
    //function for render table
    renderTable(array) {
        let body = document.getElementById('tbodySinhVien');
        let arr = Array.from(array);
        let contentHTML = '';
        contentHTML += arr.map((item, index) => `<tr id = '${item.id}' class = "inList">
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${(item.toan + item.ly + item.hoa) / 3}</td>
        <td><button data-index = ${index} class = "btn btn-success btn-edit">sửa</button>
        <button data-index = ${index} class = "btn btn-danger btn-dele">Xóa</button></td>
        </tr>`).join('');

        body.innerHTML = contentHTML;
    },
    //  return all the student info without id
    getInfo(tenSv, maSv, mailSv, math, phys, chem) {
        if(maSv == '' &&
        tenSv != '' &&
        mailSv != '' &&
        math != '' &&
        phys != '' &&
        chem != ''
        ){
            return {
                name: tenSv,
                email: mailSv,
                toan: math,
                ly: phys,
                hoa: chem,
            }
        }
    },
    // return the student info include id
    getIdInfo(tenSv, maSv, mailSv, math, phys, chem){
        if(maSv != '' &&
        tenSv != '' &&
        mailSv != '' &&
        math != '' &&
        phys != '' &&
        chem != ''
        ){
            return {
                id: maSv,
                name: tenSv,
                email: mailSv,
                toan: math,
                ly: phys,
                hoa: chem,
            }
        }
    },
    // find student through input arrays
    findIndex(id, arrays){
        for(let array in arrays){
            if(arrays[array].id == id){
                return array;
            }
        }
    },
    // find name in array and return index of name in array
    searchName(name, datas){
        var listIndex = [];
        for(let data in datas){
            if(datas[data].name.includes(name)){
                listIndex.push(data);
            }
        }
        return listIndex;
    }
}

export default svController;