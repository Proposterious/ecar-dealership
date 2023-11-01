import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) { // recognize req
        console.log(req)
  }, 
  {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error"
  },
});
export const config = { matcher: ["/dashboard","/dashboard/:path*"] };