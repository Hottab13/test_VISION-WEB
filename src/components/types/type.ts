export type MessenType={
    id:number
    messen:string
    like: number
}
export type ContactsType={
    github:string
    vk:string
    facebook:string
    instagram:string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type Photos={
    small:string | null
    large:string | null
}
export type PostUserType={
    userId:number
    lookingForAJob:boolean
    lookingForAJobDescription: string
    fullName:string 
    contacts: ContactsType
    photos: Photos
    aboutMe:string
}
export type UsersType ={
    id: number
    name: string
    status: string
    photos: Photos
    followed: boolean
}