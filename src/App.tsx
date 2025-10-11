import { useState } from 'react'
import './globals.css';
import Header from './components/header/header';
import Table from './components/table/table';
import type GroupType from './types/group';
import type {ScoresType} from './types/scores';
import {groups_data, scores_data} from './data'
import alphabet from './consts/alphabet';
import type StudentType from './types/student';
import getRandomInt from './utils/random';

const Home = () => {

    // Состояния и локальные хранилища данных
    const [teacher, setTeacher] = useState<string>('ФИО преподавателя');
    const [subject, setSubject] = useState<string>('Предмет');
    const [groups, setGroups] = useState<GroupType[]>(groups_data)
    const [scores, setScores] = useState<ScoresType>(scores_data)

    const [selectedStudents, setSelectedStudents] = useState<string[]>([])
    const [selectedColumns, setSelectedColumns] = useState<string[]>([])
    const [hiddenStudents, setHiddenStudents] = useState<string[]>([])
    const [isFiltersCollapsed, setIsFiltersCollapsed] = useState<boolean>(true)

    // Добавление студента
    const onAddStudent = (name: string, groupID: string) => {
        setGroups(groups.map(group => {
            if (group.id == groupID) {
                group.students.push({
                    id: String(Date.now()),
                    name: name,
                    groupID: groupID,
                    lectures: group.students[0].lectures.map(lecture => {
                        return {id: lecture.id, cellID: String(Date.now() + getRandomInt(0, 10000)), date: lecture.date, value: '', valueType: 'string'}
                    }),
                    practices: group.students[0].practices.map(practice => {
                        return {id: practice.id, cellID: String(Date.now() + getRandomInt(0, 10000)), date: practice.date, value: '', valueType: 'string'}
                    }),
                    labs: group.students[0].labs.map(lab => {
                        return {id: lab.id, number: lab.number, date: lab.date, tasks: lab.tasks.map(_ => {
                            return {id: String(Date.now() + getRandomInt(0, 10000)), value: '', valueType: 'string'}
                        })}
                    }),
                    lecture_presences: 0,
                    practice_presences: 0,
                    lab_dones: 0,
                    summary: 0
                })
            }
            return group
        }))
    }
    
    // Удаление студента
    const onRemoveStudent = () => {
        setGroups(groups.map(group => {
            group.students = group.students.filter(student => !selectedStudents.includes(student.id))
            return group
        }))
    }

    // Выделение студента
    const onStudentSelected = (studentID: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedStudents([...selectedStudents, studentID])
        } else {
            setSelectedStudents(selectedStudents.filter(studentID => studentID != studentID))
        }
    }

    // Установление значения для ячейки задания лабы
    const onSetLabTaskValue = (student: StudentType, labID: string, taskID: string, value: string, valueType: string) => {
        for (let group of groups) {
            if (group.id == student.groupID) {
                for (let person of group.students) {
                    if (person.id == student.id) {
                        for (let lab of student.labs) {
                            if (lab.id == labID) {
                                for (let task of lab.tasks) {
                                    if (task.id == taskID) {
                                        task.value = value
                                        task.valueType = valueType
                                        break
                                    }
                                }
                                break
                            }
                        }
                        break
                    }
                }
                break
            }
        }
        setGroups(groups)
    }

    // Установление значение для ячейки лекции или практики
    const onSetCellValue = (student: StudentType, lessonID: string, lessonType: string, value: string, valueType: string) => {
        for (let group of groups) {
            if (group.id == student.groupID) {
                for (let person of group.students) {
                    if (person.id == student.id) {
                        if (lessonType == 'lecture') {
                            for (let lecture of person.lectures) {
                                if (lecture.id == lessonID) {
                                    lecture.value = value
                                    lecture.valueType = valueType
                                    break
                                }
                            }
                        } else if (lessonType == 'practice') {
                            for (let practice of person.practices) {
                                if (practice.id == lessonID) {
                                    practice.value = value
                                    practice.valueType = valueType
                                    break
                                }
                            }
                        }
                        break
                    }
                }
                break
            }
        }
        setGroups(groups)
    }

    // Добавление колонки
    const onAddColumns = (columns: any, lessonType: string) => {
        let labNumber = groups[0].students[0].labs[groups[0].students[0].labs.length - 1].number
        for (let column of columns) {
            setGroups(groups.map(group => {
                group.students.forEach(student => {
                    switch (lessonType) {
                        case 'lecture':
                            student.lectures.push(column)
                            break
                        case 'practice':
                            student.practices.push(column)
                            break
                        case 'lab':
                            labNumber++
                            column.number = labNumber
                            student.labs.push(column)
                    }
                })
                return group
            }))
        }
    }

    // Изменение даты лекции или практики
    const editDate = (lessonID: string, lessonType: string, date: string) => {
        setGroups(groups.map(group => {
            group.students.forEach(student => {
                switch (lessonType) {
                    case 'lecture':
                        for (let lecture of student.lectures) {
                            if (lecture.id == lessonID) {
                                lecture.date = date
                                break
                            }
                        }
                        break
                    case 'practice':
                        for (let practice of student.practices) {
                            if (practice.id == lessonID) {
                                practice.date = date
                                break
                            }
                        }
                }
            })
            return group
        }))
    }

    // Удаление колонки
    const onRemoveColumns = () => {
        setGroups(groups.map(group => {
            group.students.forEach(student => {
                student.lectures = student.lectures.filter(lecture => !selectedColumns.includes(lecture.id))
                student.practices = student.practices.filter(lecture => !selectedColumns.includes(lecture.id))
                student.labs = student.labs.filter(lecture => !selectedColumns.includes(lecture.id))
            })
            return group
        }))
    }

    // Изменение кол-ва заданий в лабах
    const editLabTasks = (labID: string, tasksCount: number) => {
        setGroups(groups.map(group => {
            group.students.forEach(student => {
                for (let lab of student.labs) {
                    if (lab.id == labID) {
                        if (tasksCount > lab.tasks.length) {
                            const newTasks = []
                            for (let i = 0; i < tasksCount - lab.tasks.length; i++) {
                                newTasks.push({
                                    id: String(Date.now() + getRandomInt(0, 10000)),
                                    value: '',
                                    valueType: 'symbol'
                                })
                            }
                            Array.prototype.push.apply(lab.tasks, newTasks)
                        } else {
                            const tasks = []
                            for (let i = 0; i < tasksCount; i++) {
                                tasks.push(lab.tasks[i])
                            }
                            lab.tasks = tasks
                        }
                        break
                    }
                }
            })
            return group
        }))
    }

    // Сортировка по возрастанию (по алфавиту)
    const sortByAscending = () => {
        setGroups(groups.map(group => {
            group.students.sort((s1, s2) => {
                return alphabet.indexOf(s1.name[0].toLowerCase()) - alphabet.indexOf(s2.name[0].toLowerCase())
            })
            return group
        }))
    }

    // Сортировка по убыванию (по алфавиту)
    const sortByDescending = () => {
        setGroups(groups.map(group => {
            console.log(group)
            group.students.sort((s1, s2) => {
                return alphabet.indexOf(s2.name[0].toLowerCase()) - alphabet.indexOf(s1.name[0].toLowerCase())
            })
            return group
        }))
    }

    return (
        <>
            {/* Шапка */}
            <Header 
                teacher={teacher} 
                onTeacherEdit={(value: string) => setTeacher(value)}
                subject={subject} 
                onSubjectEdit={(value: string) => setSubject(value)}
                groups={groups}
                onAddStudent={onAddStudent}
                onRemoveStudent={onRemoveStudent}
                onAddColumns={onAddColumns}
                onRemoveColumns={onRemoveColumns}
                isFiltersCollapsed={isFiltersCollapsed}
                setIsFiltersCollapsed={setIsFiltersCollapsed}
                sortByAscending={sortByAscending}
                sortByDescending={sortByDescending}
            />
            <main>
                {/* Таблица */}
                <Table 
                    groups={groups} 
                    onStudentSelected={onStudentSelected}
                    onSetCellValue={onSetCellValue}
                    onSetLabTaskValue={onSetLabTaskValue}
                    editDate={editDate}
                    selectedColumns={selectedColumns}
                    setSelectedColumns={setSelectedColumns}
                    editLabTasks={editLabTasks}
                    scores={scores}
                    setScores={setScores}
                    hiddenStudents={hiddenStudents}
                    setHiddenStudents={setHiddenStudents}
                    isFiltersCollapsed={isFiltersCollapsed}
                    setIsFiltersCollapsed={setIsFiltersCollapsed}
                />
            </main>
        </>
    )
}
export default Home;