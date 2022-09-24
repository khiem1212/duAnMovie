export const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDay();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
export const formatDate2 = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDay();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
  
    return `${day}-${month}-${year} 12:00:00 `;
  };
  
//   const formatNumber = (num) => {
//     if (num < 10) return `0${num}`;
//     return num;
//   };
  