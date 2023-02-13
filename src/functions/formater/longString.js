// replace id 293865...
export function replaceLongChar(char) {
   let result = "";
   for (let i = 0; i <= 7; i++) {
      result += char[i];
   }
   return result + "...";
}
