import axios from "axios";

export async function useLoginStatus(): Promise<boolean> {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN)
    if (!token) {
        return true;
    }
    try {
        const res = await axios.get(import.meta.env.VITE_END_ADDRESS + '/admin/isLogin?token=' + token, {
            headers: {
                "Authorization": token
            }
        });
        const isLoginRes = res.data as HttpResponse<boolean>;
        if (isLoginRes.code === '200') {
            return isLoginRes.data
        } else {
            return false
        }
    } catch (e) {
        return false;
    }
}