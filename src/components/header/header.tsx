import { useState } from 'react'
import cl from './header.module.sass'
import { GoPencil } from "react-icons/go"
import { FaCheck } from "react-icons/fa6";

import SortIcon from '../../img/sort.png'
import FilterIcon from '../../img/filter.png'
import TableIcon from '../../img/table.png'
import StudentIcon from '../../img/student.png'
import StudentModal from '../student_modal/student_modal';
import type GroupType from '../../types/group';

const Header = (
    {   
        teacher, 
        onTeacherEdit, 
        subject, 
        onSubjectEdit,
        groups,
        onAddStudent
    }: {
        teacher: string, 
        onTeacherEdit: (teacher: string) => void,
        subject: string,
        onSubjectEdit: (subject: string) => void,
        groups: GroupType[],
        onAddStudent: (name: string, groupID: string) => void
    }) => {

    const [isInfoEditing, setInfoEditing] = useState<boolean>();
    const [isContextStudentsVisible, setIsContextStudentsVisible] = useState<boolean>();
    const [isStudentModalVisible, setIsStudentModalVisible] = useState<boolean>(false)

    return (
        <div className={cl.header}>
            {
                isStudentModalVisible &&
                    <StudentModal 
                        groups={groups} 
                        onAddStudent={(name: string, groupID: string) => {
                            onAddStudent(name, groupID)
                            setIsStudentModalVisible(false)
                        }} 
                        onCancel={() => setIsStudentModalVisible(false)}
                    />
            }
            <div className={cl.info}>
                {
                    isInfoEditing
                        ? <div>
                            <input className='input' value={teacher} onChange={e => onTeacherEdit(e.target.value)} />
                            /
                            <input className='input' value={subject} onChange={e => onSubjectEdit(e.target.value)} />
                        </div>
                        : <h2 className={cl.heading}>{teacher} / {subject}</h2>
                }
                
                <button className={cl.edit_btn} onClick={() => setInfoEditing(!isInfoEditing)}>
                    {
                        isInfoEditing
                            ? <FaCheck className={cl.icon} />
                            : <GoPencil className={cl.icon} />
                    }
                </button>
            </div>
            <input type="search" className={cl.search} placeholder='Поиск' />
            <div className={cl.menu}>
                <button>
                    <img src={SortIcon} alt="" /><br />
                    Сортировка
                </button>
                <button>
                    <img src={FilterIcon} alt="" /><br />
                    Фильтр
                </button>
                <button>
                    <img src={TableIcon} alt="" /><br />
                    Столбцы
                </button>
                <button onClick={() => setIsContextStudentsVisible(!isContextStudentsVisible)}>
                    <img src={StudentIcon} alt="" /><br />
                    Студенты
                    {
                        isContextStudentsVisible &&
                        <div className={cl.context_menu}>
                            <div onClick={() => setIsStudentModalVisible(true)}>
                                + Добавить
                            </div>
                            <div style={{borderRadius: '0 0 10px 10px'}}>
                                - Удалить
                            </div>
                        </div>
                    }
                    
                </button>
            </div>
        </div>
    )
}
export default Header;