import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../Firebase/PrivateRoute/PrivateRoute";
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
            element : <PrivateRoute><Home/></PrivateRoute>
        },
        {
            path : '/addTask' , 
            element : <PrivateRoute><AddTask/></PrivateRoute>
        },
        {
            path : '/manageTask' , 
            element : <PrivateRoute><ManageTask/></PrivateRoute>
        },
        {
            path : '/updateTask/:id' , 
            element : <PrivateRoute><UpdateTask/></PrivateRoute>
        },

    ]
},
])

export default routes