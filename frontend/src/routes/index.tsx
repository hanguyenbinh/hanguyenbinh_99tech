import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { publicRoutes } from "./allRoutes";


const Index = () => {
    return (
        <Routes>
            {publicRoutes.map((route, idx) => {
                const Component = route.component
                return (
                    (
                        <Route
                            path={route.path}
                            element={<Component />}
                            key={idx}
                        />
                    )
                )
            })}
        </Routes>
    );
};

export default Index;