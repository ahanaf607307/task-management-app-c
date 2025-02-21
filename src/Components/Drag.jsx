import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import useAuth from "../Firebase/Authentication/useAuth";
import useAxiosSecure from "../Hook/AxiosPublic/AxiosSecure/AxiosSecure";
import Loading from "./Loading/Loading";

const ItemType = {
  TASK: "task",
};


const Task = ({ task, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TASK,
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 border rounded-lg cursor-grab ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
    </div>
  );
};


const TaskColumn = ({ status, tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.TASK,
    drop: (item) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border p-4 min-h-[200px] rounded-md ${
        isOver ? "bg-purple-100" : "bg-white"
      }`}
    >
      <h2 className="text-center font-semibold mb-4">{status}</h2>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};


const Drag = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [taskData, setTaskData] = useState([]);

  const { isLoading, refetch } = useQuery({
    queryKey: ["taskData"],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task-email?email=${user?.email}`);
      setTaskData(data);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      await axiosSecure.patch(`/task-status/${id}`, { status: newStatus });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleDrop = (id, newStatus) => {
    mutation.mutate({ id, newStatus });
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pt-10 text-black max-w-7xl mx-auto dark:text-white">
        <div className="pb-8">
          <Link to="/addTask">
            <Button className="cursor-pointer" color="purple">
              Add Task
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
          <TaskColumn
            status="todo"
            tasks={taskData.filter((task) => task.status === "todo")}
            className='text-black dark:text-white bg-white dark:bg-gray-800'
            onDrop={handleDrop}
          />
          <TaskColumn
            status="In Progress"
            tasks={taskData.filter((task) => task.status === "In Progress")}
              className='text-black dark:text-white bg-white dark:bg-gray-800'
            onDrop={handleDrop}
          />
          <TaskColumn
            status="Done"
            tasks={taskData.filter((task) => task.status === "Done")}
              className='text-black dark:text-white bg-white dark:bg-gray-800'
            onDrop={handleDrop}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Drag;
