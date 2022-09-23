export const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDay();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
//   const formatNumber = (num) => {
//     if (num < 10) return `0${num}`;
//     return num;
//   };
  