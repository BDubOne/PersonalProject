import { createBrowserRouter } from "react-router-dom"
import App from "./App";

import { GlobalDictionary } from './pages/GlobalDictionary';
import { Home } from './pages/Home';
import { PersonalDictionary } from './pages/PersonalDictionary';
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
                path: "personal-dictionary/",
                element: <PersonalDictionary />,

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