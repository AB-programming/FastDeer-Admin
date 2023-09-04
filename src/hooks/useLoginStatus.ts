import axios from "axios";

export async function useLoginStatus(): Promise<boolean> {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN)
    if (!token) {
        return false;
    }
    try {
        const res = await axios.get(import.meta.env.VITE_END_ADDRESS + '/admin/isLogin?token=' + token);
        const isLoginRes = res.data as HttpResponse<boolean>;
        console.log(isLoginRes)
        if (isLoginRes.code === '200') {
            return isLoginRes.data
        } else {
            return false
        }
    } catch (e) {
        return false;
    }
}