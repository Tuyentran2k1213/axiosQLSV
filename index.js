import {SvService} from './service/SvService.js'
import svController from './service/SvController.js'

var dssv = [];
let tenSv = document.getElementById('txtTenSV');
let maSv = document.getElementById('txtMaSV');
let mailSv = document.getElementById('txtEmail');
let math = document.getElementById('txtDiemToan');
let phys = document.getElementById('txtDiemLy');
let chem = document.getElementById('txtDiemHoa');


SvService.getSv()
    .then((res) => {
        dssv = [...res.data];
    })
    .catch((err) => {
        console.log(err);
    })

setTimeout(() => {
    svController.renderTable(dssv);
}, 2000);

document.getElementById('tbodySinhVien').addEventListener('click', function(e){
    var index = e.target.dataset.index;
    if(e.target.closest('.btn-edit')){
        var sv = dssv[index];
        tenSv.value = sv.name;
        maSv.value = sv.id;
        mailSv.value = sv.email;
        math.value = sv.toan;
        phys.value = sv.ly;
        chem.value = sv.hoa;
    }
    if(e.target.closest('.btn-dele')){
        SvService.deleSv(dssv[index].id)
        .then((res) => {
            dssv.splice(index, 1);
            svController.renderTable(dssv);
            console.warn(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
})

document.getElementById('themSv').addEventListener('click', () => {

    var info = svController.getInfo(tenSv.value, maSv.value, mailSv.value, Number(math.value), Number(phys.value), Number(chem.value));
    if(info) {
        SvService.addSv(info)
        .then((res) => {
        tenSv.value = null;
        maSv.value = null;
        mailSv.value = null;
        math.value = null;
        phys.value = null;
        chem.value = null;
            dssv.push(res.data);
            svController.renderTable(dssv);
        })
        .catch(err => {
            console.warn(err);
        })
    }
})