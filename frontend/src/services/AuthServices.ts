import axios from "axios";

export const signUp=async({ username, email, password })=> {
    console.log(23)
    try {
        const res = await axios.post(`http://localhost:3000/user/signup`, {
            userName: username,
            email: email,
            password: password,
        });

        return res.data;
    } catch (e) {
        throw new Error(e.response.data.data.error.errorResponse.code)
    }
}
export const login=async ({ email, password })=> {

    const res = await axios.post(`http://localhost:3000/user/login`, {
        email: email,
        password: password
    });
    if (res.status === 401) {
        throw new Error(`Incorrect Password or Email`)
    }
    return res.data;

}