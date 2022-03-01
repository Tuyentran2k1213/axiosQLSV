    //import module
    import {SvService} from './service/SvService.js'
    import svController from './service/SvController.js'
    
    //get Element using id
    var dssv = [];
    let tenSv = document.getElementById('txtTenSV');
    let maSv = document.getElementById('txtMaSV');
    let mailSv = document.getElementById('txtEmail');
    let math = document.getElementById('txtDiemToan');
    let phys = document.getElementById('txtDiemLy');
    let chem = document.getElementById('txtDiemHoa');
    let search = document.getElementById('txtSearch');
    
    //create loading element
    let animate = document.querySelector('.loading-animate');
function running(){


//loading start animation 
function load() {
    animate.classList.add("active");
}

// remove loading animation when event already loaded
function unLoad() {
    animate.classList.remove("active");
}

//reset the input when it done
function resetWhenDone(){
    tenSv.value = null;
    maSv.value = null;
    mailSv.value = null;
    math.value = null;
    phys.value = null;
    chem.value = null;
    search.value = null;
}

//get student data 
SvService.getSv()
    .then((res) => {
        dssv = [...res.data];
    })
    .catch((err) => {
        console.log(err);
    })

// render in the first loading
setTimeout(() => {
    svController.renderTable(dssv);
}, 2000);

// render table in tbodySinhVien field
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
        load();
        SvService.deleSv(dssv[index].id)
        .then((res) => {
            unLoad()
            dssv.splice(index, 1);
            svController.renderTable(dssv);
        })
        .catch((err) => {
            console.warn(err);
        })
    }
})

//add more student events
document.getElementById('themSv').addEventListener('click', () => {

    var info = svController.getInfo(tenSv.value, maSv.value, mailSv.value, Number(math.value), Number(phys.value), Number(chem.value));
    
    if(info) {
        load()
        SvService.addSv(info)
        .then((res) => {
            unLoad();
            dssv.push(res.data);
            svController.renderTable(dssv);
            resetWhenDone()
        })
        .catch(err => {
            console.warn(err);
        })
    }
})

// reset event in all input
document.getElementById('resetSv').addEventListener('click', resetWhenDone);

//onclick to enforcement the update event
document.getElementById('update').onclick = () => {
    var info = svController.getIdInfo(tenSv.value, maSv.value, mailSv.value, Number(math.value), Number(phys.value), Number(chem.value));
    if(info){
        var index = svController.findIndex(info.id, dssv);
        load()
        SvService.updateSv(info.id, info)
        .then((res) => {
            unLoad();
            dssv[index] = res.data;
            svController.renderTable(dssv);
            resetWhenDone();
        })
        .catch(err => {
            console.warn(err);
        })
    }
}

// handling searching by name event
document.getElementById('btnSearch').onclick = () => {
    var searchValue = search.value.trim();
    var listSv = Array.from(document.getElementsByClassName('inList'));
    // console.log(listSv);
    if(searchValue){
        // console.log(searchValue);
        var dssvByName = svController.searchName(searchValue, dssv);
        var dssvNameLength = dssvByName.length;
        console.log(dssvByName);
        if(dssvNameLength){
            listSv.forEach((sv, index) => {              
                if(!dssvByName.includes(`${index}`))
                    sv.style.display = 'none';
            })
        }
        
    }
}
}
running();
export default running;