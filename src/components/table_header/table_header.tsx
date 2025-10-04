import cl from './table_header.module.sass';
import type GroupType from '../../types/group';
import { useState } from 'react';
import { IoMdSettings } from "react-icons/io";
import { IoSettingsOutline } from 'react-icons/io5';
import TasksModal from '../tasks_modal/tasks_modal';
import type LabType from '../../types/lab';

const TableHeader = (
        {
            group,
            editDate,
            selectedColumns,
            setSelectedColumns,
            editLabTasks
        }: 
        {
            group: GroupType
            editDate: (lessonID: string, lessonType: string, date: string) => void
            selectedColumns: string[],
            setSelectedColumns: (columns: string[]) => void
            editLabTasks: (labID: string, tasksCount: number) => void
        }
    ) => {

    const [editingLesson, setEditingLesson] = useState<any>()
    const [editingLessonValue, setEditingLessonValue] = useState<string>('')

    const [editingLab, setEditingLab] = useState<LabType | null>()
    
    return (
        <div className={cl.table_header}>
            {
                editingLab &&
                    <TasksModal
                        onEditTasks={(tasksCount: number) => {
                            editLabTasks(editingLab.id, tasksCount)
                            setEditingLab(null)
                        }}
                        onCancel={() => {
                            setEditingLab(null)
                        }}
                        tasksCount={editingLab.tasks.length}
                    />
            }
            <div className={cl.student_name_box + ' ' + cl.table_header_box}>
                <h3>ФИО</h3>
            </div>
            <div className={cl.table_header_box + ' ' + cl.lessons_header_box}>
                <h3>Лекции</h3>
                <div className={cl.days}>
                    {
                        group.students[0].lectures.map(lecture => {
                            return <div 
                                className={cl.day} 
                                style={{backgroundColor: selectedColumns.includes(lecture.id) ? '#F0F3F9' : 'white'}} 
                                onClick={() => {
                                    if (selectedColumns.includes(lecture.id)) {
                                        setSelectedColumns(selectedColumns.filter(lessonID => lessonID != lecture.id))
                                    } else {
                                        setSelectedColumns([...selectedColumns, lecture.id])
                                    }
                                    console.log(selectedColumns)

                                }}>
                                {
                                    editingLesson?.lessonID == lecture.id
                                        ? <input 
                                            type="text"
                                            value={editingLessonValue}
                                            onChange={e => setEditingLessonValue(e.target.value)}
                                            onBlur={() => {
                                                editDate(lecture.id, 'lecture', editingLessonValue)
                                                setEditingLesson(null)
                                                setEditingLessonValue('')
                                            }}
                                        />
                                        : <p onClick={() => {
                                            setEditingLessonValue(lecture.date)
                                            setEditingLesson({
                                                lessonType: 'lecture',
                                                lessonID: lecture.id,
                                            })
                                        }}>{lecture.date}</p>
                                }
                            </div>
                        }
                            
                        )
                    }
                </div>
            </div>
            <div className={cl.table_header_box + ' ' + cl.lessons_header_box}>
                <h3>Практика</h3>
                <div className={cl.days}>
                    {
                        group.students[0].practices.map(practice => 
                            <div 
                                className={cl.day}
                                style={{backgroundColor: selectedColumns.includes(practice.id) ? '#F0F3F9' : 'white'}} 
                                onClick={() => {
                                    if (selectedColumns.includes(practice.id)) {
                                        setSelectedColumns(selectedColumns.filter(lessonID => lessonID != practice.id))
                                    } else {
                                        setSelectedColumns([...selectedColumns, practice.id])
                                    }

                                }}>
                                {
                                    editingLesson?.lessonID == practice.id
                                    ? <input 
                                        type="text"
                                        value={editingLessonValue}
                                        onChange={e => setEditingLessonValue(e.target.value)}
                                        onBlur={() => {
                                            editDate(practice.id, 'practice', editingLessonValue)
                                            setEditingLesson(null)
                                            setEditingLessonValue('')
                                        }}
                                    />
                                    : <p onClick={() => {
                                        setEditingLessonValue(practice.date)
                                            setEditingLesson({
                                            lessonType: 'practice',
                                            lessonID: practice.id,
                                        })
                                    }}>{practice.date}</p>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={cl.table_header_box + ' ' + cl.labs_header_box}>
                <h3>Лабораторные работы</h3>
                <div className={cl.labs}>
                    {
                        group.students[0].labs.map(lab => {
                            let num = 0
                            return <div 
                                className={cl.lab} 
                                style={{width: 30 * lab.tasks.length + 10, backgroundColor: selectedColumns.includes(lab.id) ? '#F0F3F9' : 'white'}} 
                                onClick={() => {
                                    if (selectedColumns.includes(lab.id)) {
                                        setSelectedColumns(selectedColumns.filter(lessonID => lessonID != lab.id))
                                    } else {
                                        setSelectedColumns([...selectedColumns, lab.id])
                                    }

                                }}>
                                <div className={cl.lab_header}>
                                    <span className={cl.lab_title}>Лабораторная работа</span>
                                    <span className={cl.lab_number}>{lab.number}</span>
                                    <button onClick={() => setEditingLab(lab)}><IoSettingsOutline /></button>
                                </div>
                                
                                <div className={cl.lab_tasks}>
                                    {
                                        lab.tasks.map(_ => {
                                            num += 1
                                            return <div className={cl.lab_task}>{num}</div>
                                        })
                                    }   
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={cl.table_header_box + ' ' + cl.summary_header_box}>
                <p>Посещение<br /> лекций</p>
                <p>Посещение<br /> практик</p>
                <p>Сдача<br /> лабораторных<br /> работ</p>
            </div>
            <div className={cl.table_header_box}>
                <h3>Сумма</h3>
            </div>
        </div>
    )
}
export default TableHeader;