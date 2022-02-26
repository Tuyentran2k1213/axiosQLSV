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
        <td><button class = "btn btn-success btn-edit">sửa</button>
        <button data-index = ${index} class = "btn btn-danger btn-dele">Xóa</button></td>
        </tr>`).join('');

        body.innerHTML = contentHTML;
    },
    getInfo() {
        let tenSv = document.getElementById('txtTenSV').value;
        let maSv = document.getElementById('txtMaSV').value;
        let mailSv = document.getElementById('txtEmail').value;
        let math = Number(document.getElementById('txtDiemToan').value);
        let phys = Number(document.getElementById('txtDiemLy').value);
        let chem = Number(document.getElementById('txtDiemHoa').value);
        
        if(tenSv != '' &&
        maSv != '' &&
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
    }
}

export default svController;