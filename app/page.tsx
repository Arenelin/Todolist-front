"use client"
import {useEffect, useState} from "react";
import {Task} from "@/app/containers/Task/Task";

export default function Home() {
    const [tasks, setTasks] = useState<{id:number,     isDone: boolean;     taskName: string;}[]>([])
    const [newTaskName, setNewTaskName] = useState("")

    useEffect(() => {
        fetch("https://my-todo.online/api/tasks", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            response.json().then(res => setTasks(res.tasks))
            ;
        })

    }, []);

    const onCreateTask = () => {
        if (newTaskName !== "") {
            fetch("https://my-todo.online/api/tasks", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({taskName: newTaskName})
            }).then((response) => {
                // @ts-ignore
                response.json().then(res => fetch("https://my-todo.online/api/tasks", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    // @ts-ignore
                    response.json().then(res => setTasks(res.tasks))
                    ;
                }))
                ;
            })
            setNewTaskName("")
        }
    }

// @ts-ignore
        const onChangeTaskName =(e)=> {
            setNewTaskName(e.currentTarget.value)
        }


        return (
            <div>
                <main>
                    <input type="text" value={newTaskName} onChange={onChangeTaskName}/>
                    <button onClick={onCreateTask}>Add new task</button>
                    {tasks?.map(t => <Task setTasks={setTasks} key={t.id} task={t}/>)}
                </main>
            </div>
        );
    }
