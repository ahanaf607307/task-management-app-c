import React from "react";
import { Link } from "react-router-dom";
import Login from "../Firebase/Authentication/Login";
import useAuth from "../Firebase/Authentication/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="   bg-white dark:bg-gray-800 min-h-screen">
      <div className="">
     {
      user ?    <div className="bg-gray-50 font-sans antialiased">
      {/* Hero Section */}
      <section className=" px-5 bg-gradient-to-r min-h-[500px] from-purple-700 to-purple-300 dark:bg-gradient-to-r dark:from-gray-400 dark:to-gray-800 text-white py-16 flex flex-col justify-center ">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">
            Manage Your Tasks Effortlessly
          </h2>
          <p className="text-lg mb-6">
            Stay organized and boost your productivity with Task Now. Drag
            and drop tasks to track your progress easily!
          </p>
          <div className="flex flex-col justify-center items-center">
            {user ? (
              <Link
                to="/task"
                className="bg-white text-purple-600 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition duration-200"
              >
                Get Started
              </Link>
            ) : (
              <Link
                className="bg-white text-purple-600 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition duration-200"
                color="purple"
                to="/loginPage"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </section>
      {/* how it works */}

      <section className="py-16 bg-gray-100 dark:bg-gray-800 ">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-6">
            How Task Now Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-white mb-12 max-w-2xl mx-auto">
            Task Now makes task management easier and more efficient by
            allowing you to organize your tasks visually with a simple
            drag-and-drop interface. Here's how it works:
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-600  p-8 rounded-lg shadow-lg">
              <div className="flex justify-center items-center mb-6">
                <div className="h-16 w-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-3xl">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Create a Task
              </h3>
              <p className="text-gray-600 dark:text-white/90">
                Easily add new tasks by clicking the "Add Task" button. Fill
                in the title and description, then save to create a task.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-600  p-8 rounded-lg shadow-lg">
              <div className="flex justify-center items-center mb-6">
                <div className="h-16 w-16 bg-yellow-400 text-white rounded-full flex items-center justify-center text-3xl">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Organize Your Tasks
              </h3>
              <p className="text-gray-600 dark:text-white/90">
                Move tasks between different columns, such as "To Do", "In
                Progress", and "Done" using the drag-and-drop feature for
                seamless organization.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-600  p-8 rounded-lg shadow-lg">
              <div className="flex justify-center items-center mb-6">
                <div className="h-16 w-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Track Your Progress
              </h3>
              <p className="text-gray-600 dark:text-white/90">
                Easily track the progress of your tasks and stay on top of
                your work. When you're done, simply drag them to the "Done"
                column.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* free trail section  */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 dark:bg-gradient-to-r dark:from-gray-400 dark:to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Start Your Free Trial Today!
          </h2>
          <p className="text-lg sm:text-xl mb-6">
            Experience all the features of Task Now with no strings
            attached. Organize, track, and collaborate on tasks efficiently.
            Start now and stay on top of your work.
          </p>
          {user ? (
            <Link
              to="/task"
              className="inline-block bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
            >
              Get Started Free
            </Link>
          ) : (
            <Link
              to="/loginPage"
              className="inline-block bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </section>
      <div className="py-8 dark:bg-gray-800"></div>
      {/* footer  */}
      <div className="">
        <footer className="bg-[#1b1a1d] dark:bg-[#000000] text-white  py-8 ">
          <div className="px-8 md:px-16 lg:px-24 mx-auto ">
            <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
              <div>
                <p className="text-sm text-white">
                  &copy; {new Date().getFullYear()} Ahanaf Mubasshir. All
                  rights reserved.
                </p>
              </div>
              <div></div>
              <div className="space-x-6 ">
                <Link
                  to="/addTask"
                  className="text-sm font-semibold hover:text-purple-300 transition duration-300"
                >
                  Add Task
                </Link>
                <Link
                  to="/manageTask"
                  className="text-sm font-semibold hover:text-purple-300 transition duration-300"
                >
                  Manage Task
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div> : <Login/>
     }
      </div>
    </div>
  );
};

export default Home;
