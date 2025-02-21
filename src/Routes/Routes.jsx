import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import MainLayout from "../MainLayout/MainLayout";
import AddTask from "../Pages/AddTask/AddTask";
import ManageTask from "../Pages/ManageTask/ManageTask";
import UpdateTask from "../Pages/UpdateTask/UpdateTask";



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
        {
            path : '/manageTask' , 
            element : <ManageTask/>
        },
        {
            path : '/updateTask/:id' , 
            element : <UpdateTask/>
        },

    ]
},
])

export default routes