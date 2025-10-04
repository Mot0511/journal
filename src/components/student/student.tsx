import { useState } from 'react'
import cl from './student.module.sass';
import type StudentType from '../../types/student';
import type Cell from '../../types/cell';

const Student = (
    {
        student,
        onSelected,
        onSetCellValue,
        onCheckLabTask
    }: {
        student: StudentType
        onSelected: (studentID: string, isSelected: boolean) => void
        onSetCellValue: (groupID: string, studentID: string, lessonID: string, lessonType: string, value: string) => void
        onCheckLabTask: (groupID: string, studentID: string, labID: string, taskID: number) => void
    }) => {

    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [selectedCell, setSelectedCell] = useState<Cell | null>()
    const [selectedCellValue, setSelectedCellValue] = useState<string>('')

    return (
        <div 
            className={cl.student}
            style={{backgroundColor: isSelected ? '#F0F3F9' : '#ffffff'}} 
            onClick={() => {
                onSelected(student.id, !isSelected)
                setIsSelected(!isSelected)
            }}
        >
            <div className={cl.student_name}>
                <p>{student.name}</p>
            </div>
            <div className={cl.marks + ' ' + cl.lectures_marks}>
                {
                    student.lectures.map((lecture) => {
                        return <div className={cl.mark} style={{color: 'red'}} onClick={() => {
                                    setSelectedCellValue(lecture.presence ? '' : 'Н')
                                    setSelectedCell(
                                        {
                                            id: lecture.id,
                                            studentID: student.id,
                                            lessonID: lecture.id,
                                            lessonType: 'lecture'
                                        }
                                    )
                                }
                            }>
                            {
                                selectedCell && selectedCell.lessonID == lecture.id
                                    ? <input 
                                        type="text" 
                                        maxLength={1} 
                                        className={cl.cell_input} 
                                        style={{width: '30px', color: 'red'}}
                                        value={selectedCellValue}
                                        onChange={e => {
                                            if (['', 'н', 'Н'].includes(e.target.value)) {
                                                setSelectedCellValue(e.target.value.toUpperCase())
                                            }
                                        }}
                                        onBlur={() => {
                                            onSetCellValue(student.groupID, student.id, lecture.id, 'lecture', selectedCellValue)
                                            setSelectedCell(null)
                                            setSelectedCellValue('')
                                        }}
                                    />
                                    : lecture.presence == false && 'Н'
                            }
                        </div>
                    })
                }
            </div>
            <div className={cl.marks + ' ' + cl.practic_marks}>
                {
                    student.practices.map((practice) => 
                        <div className={cl.mark} style={{color: practice.value == 'Н' ? 'red' : 'black'}} onClick={() => {
                            setSelectedCellValue(practice.value)
                            setSelectedCell(
                                {
                                    id: practice.id,
                                    studentID: student.id,
                                    lessonID: practice.id,
                                    lessonType: 'practice'
                                }
                            )
                        }
                    }>

                            {
                                selectedCell && selectedCell.lessonID == practice.id
                                ? <input 
                                    type="text" 
                                    className={cl.cell_input} 
                                    style={{width: '30px', color: selectedCellValue == 'Н' ? 'red' : 'black'}}
                                    value={selectedCellValue}
                                    onChange={e => {
                                        setSelectedCellValue(e.target.value.toUpperCase())
                                    }}
                                    onBlur={() => {
                                        onSetCellValue(student.groupID, student.id, practice.id, 'practice', selectedCellValue)
                                        setSelectedCell(null)
                                        setSelectedCellValue('')
                                    }}
                                />
                                : practice.value
                            }
                        </div>
                    )
                }
            </div>
            <div className={cl.marks + ' ' + cl.labs_marks}>
                <div className={cl.labs}>
                    {
                        student.labs.map((lab) => {
                            let count = -1
                            return <div className={cl.lab}>
                                {
                                    lab.tasks.map(task => {
                                        count += 1
                                        return <div className={cl.mark}>
                                            <input 
                                                type="checkbox" 
                                                className={cl.checkbox + ' ' + cl.pink_checkbox}
                                                id={String(count)}
                                                checked={task} 
                                                onChange={(e) => onCheckLabTask(student.groupID, student.id, lab.id, Number(e.target.id))}
                                            />
                                        </div>
                                    }
                                    )
                                }
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={cl.counts}>
                <p className={cl.table_value}>{student.lecture_presences}/{student.lectures.length}</p>
                <p className={cl.table_value}>{student.practice_presences}/{student.practices.length}</p>
                <p className={cl.table_value}>{student.lab_dones}/{student.labs.length}</p>
            </div>
            <div className={cl.summary}>
                <p className={cl.table_sum}>{student.summary}</p>
            </div>
        </div>
    )
}
export default Student;