import { useEffect, useState } from 'react'
import cl from './student.module.sass';
import type StudentType from '../../types/student';
import type { ScoresType } from '../../types/scores';
import Cell from '../cell/cell';

const Student = (
    {
        student,
        onSelected,
        onSetCellValue,
        onSetLabTaskValue,
        scores
    }: {
        student: StudentType
        onSelected: (studentID: string, isSelected: boolean) => void
        onSetCellValue: (student: StudentType, lessonID: string, lessonType: string, value: string, valueType: string) => void
        onSetLabTaskValue: (student: StudentType, labID: string, taskID: string, value: string, valueType: string) => void
        scores: ScoresType
    }) => {

    const [isSelected, setIsSelected] = useState<boolean>(false)
    
    const [lecturePresneces, setLecturePresences] = useState<number>(0)
    const [practicePresneces, setPracticePresences] = useState<number>(0)
    const [labDones, setLabDones] = useState<number>(0)
    const [summary, setSummary] = useState<number>(0)

    const [selectedCell, setSelectedCell] = useState<string | null>()

    useEffect(() => {
        getLecturePresences()
        getPracticePresences()
        getLabDones()
        getSummary()
    }, [JSON.stringify(student)])

    const getLecturePresences = () => {
        let count = 0
        student.lectures.forEach(lecture => {
            if (lecture.value != 'Н') count++
        })

        setLecturePresences(count)
    }

    const getPracticePresences = () => {
        let count = 0
        student.practices.forEach(practice => {
            if (practice.value != 'Н') count++
        })

        setPracticePresences(count)
    }

    const getLabDones = () => {
        let count = 0
        student.labs.forEach(lab => {
            let tasks_count = 0
            lab.tasks.forEach(task => {
                if (task.value) tasks_count++
            })
            if (tasks_count == lab.tasks.length) count++
        })
        setLabDones(count)
    }

    const getSummary = () => {
        let summary = 0

        student.lectures.forEach(lecture => {
            for (let score of scores.lectures) {
                if (score.mark == lecture.value) {
                    if (score.score > 0) {
                        summary += score.score
                    } else {
                        summary -= score.score
                    }
                    break
                }
            }
        })

        student.practices.forEach(practice => {
            for (let score of scores.practices) {
                if (score.mark == practice.value) {
                    if (score.score > 0) {
                        summary += score.score
                    } else {
                        summary -= score.score
                    }
                }
            }
        })

        student.labs.forEach(lab => {
            lab.tasks.forEach(task => {
                for (let score of scores.labs) {
                    if (score.mark == task.value) {
                        if (score.score > 0) {
                            summary += score.score
                        } else {
                            summary -= score.score
                        }
                        break
                    }
                }
            })
        })

        setSummary(summary)
    }

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
                    student.lectures.map((lecture) => 
                        <Cell
                            lesson={lecture}
                            scores={scores.lectures}
                            isSelected={selectedCell == lecture.id}
                            setSelectedCell={setSelectedCell}
                            onSetCellValue={(value: string, valueType: string) => {
                                onSetCellValue(student, lecture.id, 'lecture', value, valueType)
                            }}
                        />
                    )
                }
            </div>
            <div className={cl.marks + ' ' + cl.practic_marks}>
                {
                    student.practices.map((practice) => 
                        <Cell 
                            lesson={practice}
                            scores={scores.practices}
                            isSelected={selectedCell == practice.id}
                            setSelectedCell={setSelectedCell}
                            onSetCellValue={(value: string, valueType: string) => {
                                onSetCellValue(student, practice.id, 'practice', value, valueType)
                            }}
                        />
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
                                        return <Cell 
                                            lesson={task}
                                            isSelected={selectedCell == task.id}
                                            scores={scores.labs}
                                            setSelectedCell={setSelectedCell}
                                            onSetCellValue={(value: string, valueType: string) => {
                                                onSetLabTaskValue(student, lab.id, task.id, value, valueType)
                                            }}
                                        />
                                    }
                                    )
                                }
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={cl.counts}>
                <p className={cl.table_value}>{lecturePresneces}/{student.lectures.length}</p>
                <p className={cl.table_value}>{practicePresneces}/{student.practices.length}</p>
                <p className={cl.table_value}>{labDones}/{student.labs.length}</p>
            </div>
            <div className={cl.summary}>
                <p className={cl.table_sum}>{summary}</p>
            </div>
        </div>
    )
}
export default Student;