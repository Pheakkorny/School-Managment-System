import dayjs from "dayjs";
const isEmptyOrNull = (value) =>{
    if (value === "" || value === null || value === "null" || value === undefined || value === "undefined"){
        return true;
    }
    return false;
}
export const formatDateClient = (date) =>{
    if(!isEmptyOrNull(date)){
        return dayjs(date).format("DD/MM/YYYY");
    }
    return null;  
}
export const formatDateServer = (date) =>{
    if(!isEmptyOrNull(date)){
        return dayjs(date).format("YYYY/MM/DD");
    }
    return null;
}
export const setUser = (user) =>{
    localStorage.setItem("user",user);
};
export const getUser = () =>{
    const user = localStorage.getItem("user");
    if(!isEmptyOrNull(user)) {
        return JSON.parse(user);
    }
    return null;
    
};
export const setIsLogin = (value) =>{ //1 || 0
    localStorage.setItem("is_login",value);
};
export const getIsLogin = () =>{
    const isLogin = localStorage.getItem("is_login");
    if(isLogin === "1"){
        return true;
    }
    return false;
};
export const setToken = (access_token) =>{
    localStorage.setItem("access_token",access_token)
};
export const getToken = () =>{
    return localStorage.getItem("access_token")
};
export const setRefreshToken = (refresh_token) =>{
    localStorage.setItem("refresh_token", refresh_token)
};
export const getRefreshToken = () => {
    return localStorage.getItem("refresh_token");
};

export const logout = () =>{
    setUser("");
    setIsLogin("0");
    setToken("");
    setRefreshToken("");
    window.location.href = "/login";
}