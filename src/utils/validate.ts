/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s:string){
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-z0-9_-]{2,3}){1,2})$/.test(s)
} 

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s:string){
    return /^1[0-9]{10}&/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s:string){
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证校验
 *  @param {*}s
 */
export function checkIdCard(s:string){
    const idCard = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!idCard.test(s)){
        return false;
    }
    else{
        return true;
    }
}
