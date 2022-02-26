import {SvService} from './service/SvService.js'
import svController from './service/SvController.js'

var dssv = [];

SvService.getSv()
    .then((res) => {
        dssv = [...res.data];
    })
    .catch((err) => {
        console.log(err);
    })

setTimeout(() => {
    svController.renderTable(dssv);
}, 1000);

document.getElementById('tbodySinhVien').addEventListener('click', function(e){
    if(e.target.closest('.btn-edit')){
        console.log(e.target);
    }
    if(e.target.closest('.btn-dele')){
        var index = e.target.dataset.index;
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
    var info = svController.getInfo()
    if(info) {
        SvService.addSv(info)
        .then((res) => {
            dssv.push(res.data);
            svController.renderTable(dssv);
        })
        .catch(err => {
            console.warn(err);
        })
    }
})