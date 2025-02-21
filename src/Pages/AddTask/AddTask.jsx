import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Firebase/Authentication/useAuth";
import useAxiosSecure from "../../Hook/AxiosPublic/AxiosSecure/AxiosSecure";

const AddTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const title = data.title;
    const category = data.category;
    const description = data.description;
    const userName = user?.displayName;
    const userEmail = user?.email;
    const status = "todo";
    const createDate = new Date();
    const taskInfo = {
      title,
      category,
      description,
      userName,
      userEmail,
      status,
      createDate,
    };
    console.log(taskInfo);
    axiosSecure.post('/task' , taskInfo)
    .then(res=>{
        console.log('post req seccess in task',res.data)
        reset()
        if(res.data.insertedId) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Task Added Successfully"
              });
        }
    }).catch(error => {
        console.log('error from task post' , error)
    })
  };

  return (
    <div className=" dark:bg-gray-800 px-5 py-[90px] min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[600px] mx-auto bg-[#ffffff] dark:bg-gray-700 px-[30px] py-4 border-2 border-gray-300 shadow-xl dark:shadow-none shadow-gray-200 hover:scale-105 duration-300 rounded-[9px] space-y-3 grid grid-cols-2"
      >
        <div className="col-span-full">
          <h2 className="bg-transparent text-[30px] font-bold rounded-[6px] text-center text-black dark:text-white px-[16px] py-[10px]">
            Add Task
          </h2>
        </div>
        <div className="col-span-full">
          <label className="font-medium text-[#000000] dark:text-white pb-1.5 block">
            Title<span className="text-[red]"> *</span>
          </label>
          <input
            type="text"
            {...register("title")}
            name="title"
            placeholder="Task Title...."
            className="bg-transparent px-[16px] py-[16px] border-[1px] rounded-[10px] w-full p-2 focus:outline-none focus:border-blue-400 text-black dark:text-white"
            required
          />
        </div>
        <div className="col-span-full">
          <label className="font-medium text-[#000000] dark:text-white pb-1.5 block">
            Category<span className="text-[red]"> *</span>
          </label>
          <input
            type="text"
            name="category"
            {...register("category")}
            placeholder="Task Category....."
            className="bg-transparent px-[16px] py-[16px] border-[1px] rounded-[10px] w-full p-2 focus:outline-none focus:border-blue-400 text-black dark:text-white"
            required
          />
        </div>
        <div className="col-span-full">
          <label className="font-medium text-[#000000] dark:text-white pb-1.5 block">
            Description<span className="text-[red]"> *</span>
          </label>
          <textarea
            rows={3}
            name="description"
            {...register("description")}
            placeholder="Task Description......"
            className="bg-transparent px-[16px] py-[16px] border-[1px] rounded-[10px] w-full p-2 focus:outline-none focus:border-blue-400 text-black dark:text-white"
            required
          />
        </div>
        <div className="col-span-full">
          <div className="justify-end">
            <button
              type="submit"
              className="bg-[#7d35b8] text-[#ffffff] text-[16px] cursor-pointer rounded-[6px] px-[16px] py-[12px] w-[150px] text-center"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
