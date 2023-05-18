const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
];

const formatDateTime = (dateTime) => {
    const d = new Date(dateTime);
    const year = d.getFullYear();
    const date = d.getDate();
    const month = months[d.getMonth()];

    const hour = d.getHours().toString().length === 1 ? `0${d.getHours().toString()}` : d.getHours().toString();

    const minute = d.getMinutes().toString().length === 1 ? `0${d.getMinutes().toString()}` : d.getMinutes().toString();

    const second = d.getSeconds().toString().length === 1 ? `0${d.getSeconds().toString()}` : d.getSeconds().toString();

    return `${date}-${month}-${year}`;
};


const convertToDate =(dateTime) => {
    const d = new Date(dateTime);
    const year = d.getFullYear();
    const date = d.getDate();
    const month = months[d.getMonth()];
    return `${date}-${month}-${year}`;
}

// function compareFn(a, b) {
//     if (a < b) {
//         return -1;
//     }
//     if (a > b) {
//         return 1;
//     }
//     // a must be equal to b
//     return 0;
// }

const Common = {
    formatDateTime: formatDateTime,
    convertToDate: convertToDate
};
export default Common;