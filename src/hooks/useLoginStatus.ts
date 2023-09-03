
export function useLoginStatus(): boolean {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN)
    return token != null;
}