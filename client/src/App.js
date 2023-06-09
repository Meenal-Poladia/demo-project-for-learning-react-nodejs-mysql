import * as React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>This is home</div>,
    },
    {
        path: "/about",
        element: <div>About</div>,
    },
]);

function App() {
  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
