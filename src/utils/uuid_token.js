import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    //先在浏览器本地存储中查找
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if (!uuid_token) {
        //如果没有，创建一个uuid
        uuid_token = localStorage.setItem('UUIDTOKEN', uuidv4());
    }
    return uuid_token;
}
