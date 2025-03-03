import Header from "~/components/Layouts/Header/index";
import Sidebar from "~/components/Layouts/Sidebar/index";

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <Sidebar />
        </>
    );
}

export default DefaultLayout;
