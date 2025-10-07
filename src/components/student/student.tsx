import { useEffect, useState } from 'react'
import cl from './student.module.sass';
import type StudentType from '../../types/student';
import type Cell from '../../types/cell';
import checkboxColors from '../../consts/checkbox_colors';
import type ScoreType from '../../types/scores';

const Student = (
    {
        student,
        onSelected,
        onSetCellValue,
        onCheckLabTask,
        scores
    }: {
        student: StudentType
        onSelected: (studentID: string, isSelected: boolean) => void
        onSetCellValue: (groupID: string, studentID: string, lessonID: string, lessonType: string, value: string) => void
        onCheckLabTask: (groupID: string, studentID: string, labID: string, taskID: number) => void
        scores: ScoreType[]
    }) => {

    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [selectedCell, setSelectedCell] = useState<Cell | null>()
    const [selectedCellValue, setSelectedCellValue] = useState<string>('')
    
    const [lecturePresneces, setLecturePresences] = useState<number>(0)
    const [practicePresneces, setPracticePresences] = useState<number>(0)
    const [labDones, setLabDones] = useState<number>(0)
    const [summary, setSummary] = useState<number>(0)

    useEffect(() => {
        getLecturePresences()
        getPracticePresences()
        getLabDones()
        getSummary()
    }, [JSON.stringify(student)])

    const getLecturePresences = () => {
        let count = 0
        student.lectures.forEach(lecture => {
            if (lecture.presence) count++
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
                if (task == true) tasks_count++
            })
            if (tasks_count == lab.tasks.length) count++
        })
        setLabDones(count)
    }

    const getSummary = () => {
        let summary = 0

        student.lectures.forEach(lecture => {
            if (lecture.presence) {
                for (let score of scores) {
                    if (score.value == 'Н') {
                        if (score.score > 0) {
                            summary += score.score
                        } else {
                            summary -= score.score
                        }
                        break
                    }
                }
            }
            
        })

        student.practices.forEach(practice => {
            for (let score of scores) {
                if (score.type == 'number' && score.value == practice.value) {
                    if (score.score > 0) {
                        summary += score.score
                    } else {
                        summary -= score.score
                    }
                    break
                }
            }
        })

        student.labs.forEach(lab => {
            lab.tasks.forEach(task => {
                if (task) {
                    for (let score of scores) {
                        if (score.type == 'checkbox' && score.value == String(lab.checkboxColor)) {
                            if (score.score > 0) {
                                summary += score.score
                            } else {
                                summary -= score.score
                            }
                            break
                        }
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
                                                className={'checkbox'}
                                                id={String(count)}
                                                checked={task}
                                                onChange={(e) => onCheckLabTask(student.groupID, student.id, lab.id, Number(e.target.id))}
                                                style={{accentColor: checkboxColors[lab.checkboxColor]}}
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