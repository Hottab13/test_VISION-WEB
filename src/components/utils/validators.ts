export type FiledValidatoeType = (value:string)=>string | undefined
export const requiredField:FiledValidatoeType =(value)=>{
    if (value) return undefined
    return "Это поле обязательное"
}
export const maxLengthCreator =(maxLenght:number):FiledValidatoeType => (value)=>{
    if (value.length>maxLenght) return `Максимальное количество символов ${maxLenght}!`
    return undefined
} 