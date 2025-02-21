import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "flowbite-react";
import React from "react";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../Firebase/Authentication/useAuth";
import useAxiosSecure from "../../Hook/AxiosPublic/AxiosSecure/AxiosSecure";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: taskData = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["taskData"],
    enabled: !!user?.email && !!localStorage.getItem(`access-token`),
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/task-email?email=${user?.email}`
      );
      return data;
    },
  });

  if (isPending) {
    return <Loading />;
  }

  // delete task
  const handleDelete = async (id) => {
        await axiosSecure
      .delete(`/task-delete/${id}`)
      .then((res) => {
        console.log(res.data);
        refetch()
        alert("delete item");
      })
      .catch((error) => {
        console.log("Error caught from delete task ", error);
      });
  };
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
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
            <Table.HeadCell>
              <button>Reorder</button>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {taskData?.map((task) => (
              <Table.Row
                key={task}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {task?.title}
                </Table.Cell>
                <Table.Cell> {(task?.category).slice(0, 30)}...</Table.Cell>
                <Table.Cell> {(task?.description).slice(0, 50)}...</Table.Cell>
                <Table.Cell> {task?.status}</Table.Cell>
                <Table.Cell>
                  <Button>Edit</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="cursor-pointer"
                    onClick={() => handleDelete(task?._id)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button>Reorder</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ManageTask;
