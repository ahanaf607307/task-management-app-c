import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../Firebase/Authentication/useAuth";
import useAxiosSecure from "../../Hook/AxiosPublic/AxiosSecure/AxiosSecure";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: taskData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["taskDataManage" , user?.email],
    enabled: !!user?.email && !!localStorage.getItem(`access-token`),
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/tasks?email=${user?.email}`
      );

      return data;
    },
  });
console.log('taskdata',taskData)
  if (isLoading) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }

  // delete task
  const handleDelete = async (id) => {
    await axiosSecure
      .delete(`/tasks/${id}`)
      .then((res) => {
        refetch();
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
          title: "Task Deleted Successfully",
        });
      })
      .catch((error) => {
        console.log("Error caught from delete task ", error);
      });
  };
  return (
    <div className="min-h-screen  bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold py-8 text-blue-950 dark:text-white text-center">
        Manage Task
      </h1>
      <div className="overflow-x-auto md:px-5 ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Task Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <button>Edit</button>
            </Table.HeadCell>
            <Table.HeadCell>
              <button>Delete</button>
            </Table.HeadCell>
          
          </Table.Head>
          {isLoading ? (
            <Loading />
          ) : (
            <Table.Body className="divide-y">
             {Array.isArray(taskData) ? (
  taskData.map((task) => (
    <Table.Row key={task._id}>
      <Table.Cell>{task?.title}</Table.Cell>
      <Table.Cell>{task?.category?.slice(0, 30)}...</Table.Cell>
      <Table.Cell>{task?.description?.slice(0, 50)}...</Table.Cell>
      <Table.Cell>{task?.status}</Table.Cell>
      <Table.Cell>
        <Link to={`/updateTask/${task?._id}`}>
          <Button color='purple' className="cursor-pointer">Edit</Button>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Button color='purple' className="cursor-pointer" onClick={() => handleDelete(task?._id)}>Delete</Button>
      </Table.Cell>
    
    </Table.Row>
  ))
) : (
  <p>Error: Task data is not an array</p>
)}
            </Table.Body>
          )}
        </Table>
      </div>
      </div>
    </div>
  );
};

export default ManageTask;
