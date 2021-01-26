import React, { useState } from "react";

type PropsType={
    isOwner:boolean
}
const PostInfo:React.FC<PropsType> = ({isOwner,...props})=>{
    const [editMode,setEditMode] = useState(false)
return (
  <div>
    {/*isLoader? <Loader/>  : null*/}
   
  </div>
);}
type ProfileDataPropsType={
    isOwner:boolean
}

export default PostInfo
