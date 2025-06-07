import axios from "axios";
import { getRefreshToken, getToken, logout, setRefreshToken, setToken, setUser } from "./service";

const base_url = "http://localhost:5000/node2-api/";
export const request = async (url = "", method = "", data = {}, new_access_token = null) => {
    let queryParam = "";
    
    // Build query string for GET requests
    if (method === "get" && Object.keys(data).length > 0) {
        Object.keys(data).map((key, index) => {
            queryParam += (index === 0 ? "?" : "&") + key + "=" + data[key];
        });
    }
    
    var access_token = getToken();
    if(new_access_token) {
        access_token = new_access_token;
    }
    return axios({
        url: base_url + url + queryParam,
        method: method,
        data: data,
        headers: {
            Authorization: "Bearer " + access_token,
        },
    })
    .then((res) => {
        return res.data;
    })
    .catch(async (error) => {
        if (error.response?.status === 401) {
            if (error.response.data?.error?.name === "TokenExpiredError") {
                const refresh_token = getRefreshToken();
    
                if (!refresh_token) {
                    console.warn("No refresh token found, logging out.");
                    logout();
                    return false;
                }
    
                try {
                    const res = await axios({
                        url: base_url + "user/refresh_token",
                        method: "post",
                        data: { refresh_token: refresh_token },
                    });
                    setToken(res?.data?.access_token);
                    setRefreshToken(res?.data?.refresh_token);
    
                    // Retry the original request with the new access token
                    const new_access_token_after_refresh = res?.data.access_token;
                    return request(url, method, data, new_access_token_after_refresh);
                } catch (error1) {
                    console.error("Failed to refresh token:", error1);
                    logout();
                }
            }
        }
        return false;
    });    
    
};