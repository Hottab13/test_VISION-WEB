import React from "react";
import styles from "./FormControl.module.css"


export const Texteria=({input,meta,...props})=>{
    return(
        <div className={styles.formControl +" " +(meta.error && meta.touched?  styles.error: " ") }> 
            <div>
                <textarea {...props} {...input}/>
            </div>
            <div>
               {meta.error && meta.touched && <span>{meta.error}</span>}
               {//meta.touched && meta.error && <span>{"Ошибка!"}</span>
               }
            </div>
        </div>
    )
} 
export const Input=({input,meta,...props})=>{
    return(
        <div className={styles.formControl +" " +(meta.error && meta.touched?  styles.error: " ") }> 
            <div>
                <input {...props} {...input}/>
            </div>
            <div>
               {meta.error && meta.touched && <span>{meta.error}</span>}
               {//meta.touched && meta.error && <span>{"Ошибка!"}</span>
               }
            </div>
        </div>
    )
} 