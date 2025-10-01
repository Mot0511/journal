import React, { useState } from 'react'
import cl from './student_modal.module.sass'
import type GroupType from '../../types/group'

const StudentModal = (
    {
        groups, 
        onAddStudent,
        onCancel,
    }: 
    {
        groups: GroupType[], 
        onAddStudent: (name: string, groupID: string) => void
        onCancel: () => void
    }) => {

    const [groupID, setGroupID] = useState<string>(groups[0].id)
    const [name, setName] = useState<string>('')

    return (
        <div className={cl.modal}>
            <div className={cl.header}>
                <h1>Добавить студента</h1>
            </div>
            <div className={cl.body}>
                <div className={cl.content}>
                    <select onChange={(e) => setGroupID(e.target.value)} value={groupID}>
                        {
                            groups.map(group => <option value={group.id}>{group.title}</option>)
                        }
                    </select>
                    <input className={cl.input} value={name} onChange={(e) => setName(e.target.value)} placeholder='Имя' />
                </div>
                <div className={cl.btns}>
                    <button className={cl.btn} onClick={onCancel}>Отмена</button>
                    <button className={cl.btn} onClick={() => {
                        if (name != '') onAddStudent(name, groupID)
                    }}>ОК</button>
                </div>
            </div>
        </div>
    )
}
export default StudentModal;