import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.PNG'],
    resolve: {
        alias: {
            '@images': '/src/assets/images',
            '@components': '/src/components',
            '@configs': '/src/configs',
            // 다른 별칭들 추가 가능
            '@api': '/src/apis/api',
            '@util': '/src/apis/util',
        },
    },

    server: {
        proxy: {
            '/api': {
                // front 서버를 spring 서버로 바꿔주기
                // http://localhost/api/board
                target: 'http://localhost',
                // /api를 빈칸으로 대체
                rewrite: (path) => path.replace(/^\/api/, ''),
                // 직접 공공데이터를 가져오는 경우 origin 변경
                changeOrigin: true,
            },
            '/data': {
                target: 'http://openapi.molit.go.kr:8081',
                // pathRewrite: { "^/data": "" },
                rewrite: (path) => path.replace(/^\/data/, ''),
                changeOrigin: true,
            },
        },
    },
});
