import { useQuery } from "@tanstack/react-query";
import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../Firebase/Authentication/useAuth";
import useAxiosSecure from "../../Hook/AxiosPublic/AxiosSecure/AxiosSecure";

const UpdateTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  // get own task ----
  const {
    data: taskData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["updateTask"],
    enabled: !!user?.email && !!localStorage.getItem(`access-token`),
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task-id/${id}`);
      return data;
    },
  });

  console.log(taskData);

  // get own task end----

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: taskData,
  });
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
    axiosSecure
      .patch(`/task-update/${taskData?._id}`, taskInfo)
      .then((res) => {
        console.log("post req seccess in task", res.data);
        reset();
        refetch();
        if (res.data.modifiedCount) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Task Update Successfully",
          });
          navigate("/manageTask");
        }
      })
      .catch((error) => {
        console.log("error from task post", error);
      });
  };

  useEffect(() => {
    if (taskData) {
      setValue("title", taskData.title || "");
      setValue("category", taskData.category || "");
      setValue("description", taskData.description || "");
      setValue("status", taskData.status || "");
      setValue("email", user?.email || "");
    }
  }, [taskData, setValue, user?.email]);

  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" dark:bg-gray-800 px-5 py-[90px] min-h-screen">
     {
        isLoading ? <Loading/> :  <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[600px] mx-auto bg-[#ffffff] dark:bg-gray-700 px-[30px] py-4 border-2 border-gray-300 shadow-xl dark:shadow-none shadow-gray-200 hover:scale-105 duration-300 rounded-[9px] space-y-3 grid grid-cols-2"
      >
        <div className="col-span-full">
          <h2 className="bg-transparent text-[30px] font-bold rounded-[6px] text-center text-black dark:text-white px-[16px] py-[10px]">
            Update Task
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
              Update
            </button>
          </div>
        </div>
      </form>
     }
    </div>
  );
};

export default UpdateTask;
