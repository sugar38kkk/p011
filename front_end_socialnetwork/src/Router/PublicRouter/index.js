import PageNotFound from "~/pages/Pagenotfound";
import auth from "~/services/authService/authHelper";

function PublicRoute({ children }) {
    if (auth.isAuthenticated()) return <PageNotFound></PageNotFound>;
    return children;
}

export default PublicRoute;
