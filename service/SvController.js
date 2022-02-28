let svController = {
    renderTable(array) {
        let body = document.getElementById('tbodySinhVien');
        let arr = Array.from(array);
        let contentHTML = '';
        contentHTML += arr.map((item, index) => `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.toan}</td>
        <td><button data-index = ${index} class = "btn btn-success btn-edit">sửa</button>
        <button data-index = ${index} class = "btn btn-danger btn-dele">Xóa</button></td>
        </tr>`).join('');

        body.innerHTML = contentHTML;
    },
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
    findIndex(id, arrays){
        for(let array in arrays){
            if(arrays[array].id == id){
                return array;
            }
        }
    }
}

export default svController;