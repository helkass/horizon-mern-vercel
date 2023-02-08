export const currencyFormater = (number) => {
   return new Intl.NumberFormat("id-Rp", {
      style: "currency",
      currency: "IDR",
   }).format(number);
};
