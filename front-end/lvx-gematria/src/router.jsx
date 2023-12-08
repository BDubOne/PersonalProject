import { createBrowserRouter } from "react-router-dom"
import App from "./App";

import  GlobalDictionary  from './pages/GlobalDictionary';
import GlobalDetails from './pages/GlobalDetails';
import PersonalDetails from './pages/PersonalDetails';
import { Home } from './pages/Home';
import PersonalDictionary from './pages/PersonalDictionary';
import { RegisterPage } from "./pages/RegisterPage";
import { CalculatorPage } from "./pages/CalculatorPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />

            },
            {
                path: "register/",
                element: <RegisterPage/>,
            },
            {
                path: "global-dictionary/",
                element: <GlobalDictionary/>,
            },
            {
                path: "global-dictionary/:number",
                element: <GlobalDetails/>,
            },
            {
                path: "personal-dictionary/",
                element: <PersonalDictionary />,

            },
            {
                path: "personal-dictionary/:number",
                element: <PersonalDetails />,

            },
            {
                path: "lvx-calculator/",
                element: <CalculatorPage />,

            },
        ],
        errorElement: <NotFoundPage />
    } 
]);

export default router