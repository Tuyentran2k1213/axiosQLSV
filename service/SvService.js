const BASE_URL = "https://620e4fdc585fbc3359ddbfcf.mockapi.io/sinhvien";

export const SvService = {
    getSv() {
        return axios({
            url: BASE_URL,
            method: "GET",
        })
    },
    addSv(data) {
        return axios({
            url: BASE_URL,
            method: "POST",
            data: data,
        })
    },
    deleSv(id) {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "DELETE",
        })
    },
    addDeltailSv(id) {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "GET",
        })
    },
    updateSv(id, data) {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "PUT",
            data: data,
        })
    }
};


// SvService.getSv()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// axios({
//     url: BASE_URL,
//     method: "GET",
// })
//     .then((res) => {
//     var dataSvs = res.data;
//     for(var dataSv of dataSvs){
//         console.log(dataSv.name);
//     }
// })
//     .catch((err) => {
//     console.log('err', err);
// })