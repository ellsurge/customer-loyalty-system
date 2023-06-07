import bcrypt from "bcrypt"

export const hash = async(password:string)=>{
    const salt = 10;
    const hash = await bcrypt.hash(password, salt)
    return hash
};
export const compare = async(password:string, hash:string)=>{
    const compare =await  bcrypt.compare(password, hash)
    return compare
}
