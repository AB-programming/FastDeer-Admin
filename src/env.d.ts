interface ImportMetaEnv {
    readonly VITE_TOKEN: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}