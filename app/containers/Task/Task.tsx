import {Checkbox} from "@/app/components/checkbox/Checkbox";
import {useRef} from "react";
import s from './styles.module.scss'
import {clsx} from "clsx";

type Props = {
    task: {id: number, isDone: boolean, taskName: string}
    setTasks: any
}

export const Task = ({task, setTasks}: Props) => {
    const isCheckedValue = useRef(task.isDone)

    const onChangeStatus = () => {

        isCheckedValue.current = !isCheckedValue.current
        fetch("http://153.80.193.119:8087/tasks", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task:{isDone: isCheckedValue.current}, id: task.id })
        }).then((response) => {
            // @ts-ignore
            response.json().then(res=>fetch("http://153.80.193.119:8087/tasks", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // @ts-ignore
                response.json().then(res=>setTasks(res.tasks))
                ;
            }))
            ;
        })
    }
    const onDeleteTask = ()=> {
        fetch(`http://153.80.193.119:8087/tasks/${task.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            // @ts-ignore
            fetch("http://153.80.193.119:8087/tasks", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // @ts-ignore
                response.json().then(res=>setTasks(res.tasks))
                ;
            })
            ;
        })
    }

    return (
        <>
            <div className={s.taskContainer}>
                <Checkbox checked={task.isDone} onCheckedChange={onChangeStatus}/>
                <p className={clsx(task.isDone && s.taskNameDone)}>{task.taskName}</p>
                <button onClick={onDeleteTask}>X</button>
            </div>
            ---------------------
        </>

    );
};
