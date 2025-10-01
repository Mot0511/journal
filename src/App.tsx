import { useEffect, useState } from 'react'
import './globals.css';
import Header from './components/header/header';
import Table from './components/table/table';
import type GroupType from './types/group';
import Data from './data'

const Home = () => {

    const [teacher, setTeacher] = useState<string>('ФИО преподавателя');
    const [subject, setSubject] = useState<string>('Предмет');
    const [groups, setGroups] = useState<GroupType[]>(Data)

    const [selectedStudents, setSelectedStudents] = useState<string[]>([])

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
      return () => {
         window.removeEventListener('keydown', onKeyDown);
      };
    }, [])

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key == 'Delete') {
            setGroups(groups.map(group => {
                console.log(selectedStudents)
                group.students = group.students.filter(student => !selectedStudents.includes(student.id))
                return group
            }))
            setSelectedStudents([])
        }
    }


    const onAddStudent = (name: string, groupID: string) => {
        setGroups(groups.map(group => {
            if (group.id == groupID) {
                group.students.push({
                    id: String(Date.now()),
                    name: name,
                    groupID: groupID,
                    lectures: group.students[0].lectures.map(lecture => {
                        return {id: lecture.id, date: lecture.date, presence: true}
                    }),
                    practices: group.students[0].practices.map(practice => {
                        return {id: practice.id, date: practice.date, value: ''}
                    }),
                    labs: group.students[0].labs.map(lab => {
                        return {id: lab.id, title: lab.title, date: lab.date, tasks: lab.tasks.map(_ => false)}
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

    const onStudentSelected = (studentID: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedStudents([...selectedStudents, studentID])
            console.log(selectedStudents)
        } else {
            setSelectedStudents(selectedStudents.filter(student => student != studentID))
        }
    }

    const onCheckLabTask = (groupID: string, studentID: string, labID: string, taskID: number) => {
        setGroups(groups.map(group => {
            if (group.id == groupID) {
                group.students = group.students.map(student => {
                    console.log(student.id)
                    console.log(studentID)
                    console.log('------------')
                    if (student.id == studentID) {
                        student.labs = student.labs.map(lab => {
                            if (lab.id == labID) {
                                lab.tasks[taskID] = !lab.tasks[taskID]
                            }
                            return lab
                        })
                    }
                    return student
                })
            }
            return group
        }))
    }

    const onSetCellValue = (groupID: string, studentID: string, lessonID: string, lessonType: string, value: string) => {
        setGroups(groups.map(group => {
            console.log(group.students)
            if (group.id == groupID) {
                group.students.forEach(student => {
                    if (student.id == studentID) {
                        if (lessonType == 'lecture') {
                            student.lectures.forEach(lecture => {
                                if (lecture.id == lessonID) {
                                    lecture.presence = value ? false : true
                                }
                            })
                        } else if (lessonType == 'practice') {
                            student.practices.forEach(practice => {
                                if (practice.id == lessonID) {
                                    practice.value = value
                                }
                            })
                        }
                    }
                    
                })
            }
            return group
        }))
    }

    return (
        <>
            <Header 
                teacher={teacher} 
                onTeacherEdit={(value: string) => setTeacher(value)}
                subject={subject} 
                onSubjectEdit={(value: string) => setSubject(value)}
                groups={groups}
                onAddStudent={onAddStudent}
            />
            <main>
                <Table 
                    groups={groups} 
                    onStudentSelected={onStudentSelected}
                    onCheckLabTask={onCheckLabTask}
                    onSetCellValue={onSetCellValue}
                />
            </main>
        </>
    )
}
export default Home;