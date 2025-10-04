import { useState } from 'react'
import cl from './tasks_modal.module.sass'

const TasksModal = (
    {
        tasksCount,
        onEditTasks,
        onCancel,
    }: 
    {
        tasksCount: number
        onEditTasks: (tasksCount: number) => void
        onCancel: () => void
    }) => {

    const [count, setCount] = useState<string>(String(tasksCount))

    return (
        <div className={cl.modal}>
            <div className={cl.header}>
                <h1>Изменить кол-во заданий</h1>
            </div>
            <div className={cl.body}>
                <div className={cl.content}>
                    <input type={'number'} className={cl.count_input} value={count} onChange={(e) => setCount(e.target.value)} placeholder='Количество заданий' />
                </div>
                <div className={cl.btns}>
                    <button className={cl.btn} onClick={onCancel}>Отмена</button>
                    <button className={cl.btn} onClick={() => onEditTasks(Number(count))}>ОК</button>
                </div>
            </div>
        </div>
    )
}
export default TasksModal;