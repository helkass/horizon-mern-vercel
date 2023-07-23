export const linkFormater = (link) => {
   let t = "hrs=";
   let newLink = link.toString().split(" ")[0][0];

   t += newLink;

   if (link.length >= 0) {
      newLink = link.toString().split(" ")[1][0];
      t += newLink;
   }

   return t;
};
