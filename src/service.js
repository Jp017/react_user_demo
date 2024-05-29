import axios from "axios";

const DEVICE_PUSH_TOKEN = `cBJFRH_IQOq5bkb2Ohy5oa:APA91bFit0s0T48y-rqc2vnI_3qBBNqY1SUXpoB9Bvib0lg2Gvf4erCJR0J1bbTf-mNmE0Bv1Y_km_d6uw1DHZ0pvJoNCAf_moLOh5UO6DTLTBihW3mNTFbDN6EEjyrz3U4ONwBQd15p`

const axiosInstance = axios.create({
    baseURL: 'https://notify.dinjaninfotech.com/api/v1/user',
});

export const register = (data) => {
    data.device_push_token = DEVICE_PUSH_TOKEN
    return axiosInstance.post("/register", data)
}

export const login = (data) => {
    data.device_push_token = DEVICE_PUSH_TOKEN
    return axiosInstance.post("/login", data)
}

export const getUserProfileDetails = (token) => {
    return axiosInstance.get("/profile", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const generateOtp = (email) => {
    return axiosInstance.post("/generateOtp", { email })
}

export const verifyResetPasswordOtp = (data) => {
    return axiosInstance.post("/verifyResetPasswordOtp", data)
}

export const resetPassword = (data) => {
    return axiosInstance.post("/resetPassword", data)
}


