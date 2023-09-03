import axios from "axios";

export async function useLoginStatus(): Promise<boolean> {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN)
    if (!token) {
        return true;
    }
    try {
        const res = await axios.get('http://localhost:8080/admin/isLogin');
        const isLoginRes = res.data as HttpResponse<boolean>;
        console.log(isLoginRes);
        return true;
    } catch (e) {
        return true;
    }
}