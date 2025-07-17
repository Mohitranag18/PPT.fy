import axios from 'axios';

const BASE_URL = 'https://ppt-fy.onrender.com/api/'
const LOGIN_URL = `${BASE_URL}token/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const NOTES_URL = `${BASE_URL}notes/`
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`
const REGISTER_URL = `${BASE_URL}register/`
const LOGOUT_URL = `${BASE_URL}logout/`

const CREATE_PRESENTAION = `${BASE_URL}presentations/create/`
const CREATE_PRESENTAION_WITH_AI = `${BASE_URL}presentations/createwithai/`





axios.defaults.withCredentials = true; 

export const login = async (username, password) => {
    try {
        // Send POST request to the backend with username and password
        const response = await axios.post(
            LOGIN_URL, 
            { username, password }  // Object shorthand for cleaner syntax
        );

        // Check if the response contains the expected success attribute
        if (response.data.success) {  // Assuming you get a token on success
            console.log("Login successful:", response.data);
            return response.data;  // Return the data (e.g., token or user info)
        } else {
            console.error("Login failed: No token found in response.");
            return false;  // Or handle in a more user-friendly way
        }
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return false;  // Return false or a more specific error message
    }
};



export const refresh_token = async () =>{
    try{
        await axios.post(REFRESH_URL,
            {},
            { withCredentials: true }
        )
        return true
    }catch(error){
        return false
    }
}

const call_refresh = async (error, func) =>{
    if(error.response && error.response.status === 401){
        const tokenRefreshed = await refresh_token()

        if(tokenRefreshed){
            const retryResponse = await func()
            return retryResponse.data
        }
    }
    return false
}

export const logout = async () => {
    const response = await axios.post(LOGOUT_URL, { withCredentials: true });
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await axios.post(REGISTER_URL, {username, email, password}, { withCredentials: true });
    return response.data;
};

export const authenticated_user = async () => {
    try{
        await axios.post(AUTHENTICATED_URL,{}, { withCredentials: true });
        return true
    }catch(error){
        return false
    }
}
 
export const create_presentation = async (pname) => {
    try{
        const response = await axios.post(CREATE_PRESENTAION,{pname}, { withCredentials: true });
        return response.data
    }catch(error){
        return false
    }
}

export const create_presentation_with_AI = async (pname, number_of_slides, prompt) => {
    try{
        const response = await axios.post(CREATE_PRESENTAION_WITH_AI,{pname, number_of_slides, prompt}, { withCredentials: true });
        return response.data
    }catch(error){
        return false
    }
}

export const get_presentation_detail = async (pid) => {
    try{
        const response = await axios.get(`${BASE_URL}presentations/${pid}`,{}, { withCredentials: true });
        return response.data
    }catch(error){
        return false
    }
}

export const get_user_info = async () => {
    try {
        const response = await axios.get(`${BASE_URL}user/info/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return false;
    }
}

export const edit_user_profile = async (formData) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}user/edit/`,
            formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );
        return response.data;
    } catch (error) {
        return false;
    }
}