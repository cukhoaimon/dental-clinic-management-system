export default  function(dateStr){
    let dateObj = new Date(dateStr);
    let day = String(dateObj.getDate()).padStart(2, '0'); // padStart để đảm bảo ngày luôn có 2 chữ số
    let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0-11, nên cần cộng thêm 1
    let year = dateObj.getFullYear();
    let formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export function isFormat(date){
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    return regex.test(date);
}