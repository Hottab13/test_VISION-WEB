export const requiredField =value=>{
    if (value) return undefined;
    return "Это поле обязательное";
}
export const maxLengthCreator =(maxLenght) => (value)=>{
    if (value.length>maxLenght) return `Максимальное количество символов ${maxLenght}!`;
    return undefined;
} 