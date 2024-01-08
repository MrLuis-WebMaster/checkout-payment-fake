import { createBrowserRouter } from "react-router-dom";
import Product from "./views/Product";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Product,
    },
]);

export default router