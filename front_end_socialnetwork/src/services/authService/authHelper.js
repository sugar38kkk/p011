import { faL } from "@fortawesome/free-solid-svg-icons";
import { logout } from "./authService";

const auth = {
    authenticate(jwt, cb) {
        if (typeof window !== "undefined") sessionStorage.setItem("jwt", JSON.stringify(jwt));
        cb();
    },
    isAdmin(role) {
        if (role == "admin") return true;
        return false;
    },
    isAuthenticated() {
        if (typeof window == "undefined") return false;
        if (sessionStorage.getItem("jwt")) return JSON.parse(sessionStorage.getItem("jwt"));
        else return false;
    },

    clearJWT(cb) {
        if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
        cb();
        // logout().then((data) => {
        //     document.cookie = "t=; expires = Thu 01 Jan 1970 00:00:00 UTC path=/;";
        // });
    },
};
export default auth;

// import { logout } from './authService';

// const auth = {
//     authenticate(jwt, cb) {
//         if (typeof window !== 'undefined') sessionStorage.setItem('jwt', JSON.stringify(jwt));
//         cb();
//     },
//     isAuthenticated() {
//         if (typeof window == 'undefined') return false;
//         if (sessionStorage.getItem('jwt')) return JSON.parse(sessionStorage.getItem('jwt'));
//         else return false;
//     },

//     clearJWT(cb) {
//         if (typeof window !== 'undefined') sessionStorage.removeItem('jwt');
//         cb();
//         logout().then((data) => {
//             document.cookie = 't=; expires = Thu 01 Jan 1970 00:00:00 UTC path=/;';
//         });
//     },
// };
// export default auth;
