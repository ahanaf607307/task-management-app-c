import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import MainLayout from "../MainLayout/MainLayout";
import AddTask from "../Pages/AddTask/AddTask";



const routes = createBrowserRouter([
{
    path : '/',
    element : <MainLayout/> , 
    children : [
        {
            path : '/' , 
            element : <Home/>
        },
        {
            path : '/addTask' , 
            element : <AddTask/>
        },

    ]
},
])

export default routes