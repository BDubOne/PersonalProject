import { createBrowserRouter } from "react-router-dom"

import App from "./App";

import GlobalDictionary  from './pages/GlobalDictionary';
import GlobalDetails from './pages/GlobalDetails';
import PersonalDetails from './pages/PersonalDetails';
import PersonalDictionary from './pages/PersonalDictionary';
import CalculatorPage from "./pages/CalculatorPage";

import About from "./pages/AboutPage";

import AnimatedRoute from "./components/AnimatedRoute";
import { Home } from './pages/Home';
import { RegisterPage } from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element:(
			<AnimatedRoute>
			<Home />
			</AnimatedRoute>
		)
            },
            {
                path: "register/",
                element:(
                        <AnimatedRoute>
                        <RegisterPage />
			</AnimatedRoute>
		)
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
            {
                path: "about/",
                element: <About />,

            },
            
        ],
        errorElement: <NotFoundPage />
    } 
]);

export default router
