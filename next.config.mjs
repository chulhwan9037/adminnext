/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
    async rewrites(){
        return[
            {
            // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
            source : "/api/login",
            destination : "http://localhost:8080/api/login"
            },
            {
                // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
                source : "/api/logout",
                destination : "http://localhost:8080/api/logout"
            },
            {
                // /freeBoard 
                source : "/api/freeBoard", 
                destination : "http://localhost:8080/api/freeBoard"
            },
            {
                // /detail 
                source : "/api/detail",
                destination : "http://localhost:8080/api/detail"
            },
            {
                // /admin 
                source : "/api/admin",
                destination : "http://localhost:8080/api/admin"
            },
            {
                // /user 
                source : "/api/user",
                destination : "http://localhost:8080/api/user"
            },
            {
                // /freeBoardDetail 
                source : "/api/freeBoardDetail",
                destination : "http://localhost:8080/api/freeBoardDetail"
            },
            {
                // /tradeboard
                source : "/api/tradeboard",
                destination : "http://localhost:8080/api/tradeboard"
            },
            {
                // /tradeboard
                source : "/api/detailTrade",
                destination : "http://localhost:8080/api/detailTrade"
            },
            {
                // /public 
                source : "/api/public",
                destination : "http://localhost:8080/api/public"
            }
        ];
    }
};

export default nextConfig;
