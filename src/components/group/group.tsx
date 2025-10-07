import { useState } from 'react'
import cl from './group.module.sass'
import Student from '../student/student';
import type GroupType from '../../types/group';
import type ScoreType from '../../types/scores';

const Group = (
    {
        group,
        onStudentSelected,
        onSetCellValue,
        onCheckLabTask,
        hiddenStudents,
        scores,
    }: {
        group: GroupType,
        onStudentSelected: (studentID: string, isSelected: boolean) => void
        onSetCellValue: (groupID: string, studentID: string, lessonID: string, lessonType: string, value: string) => void
        onCheckLabTask: (groupID: string, studentID: string, labID: string, taskID: number) => void
        hiddenStudents: string[],
        scores: ScoreType[]
    }) => {

    const [isStudentsVisible, setIsStudentsVisible] = useState<boolean>(true);

    return (
        <div className={cl.group}>
            <div onClick={() => setIsStudentsVisible(!isStudentsVisible)} className={cl.group_name}>
                <p>{group.title}</p>
            </div>
            {
                
                isStudentsVisible &&
                    group.students.map((student) => {
                        if (!hiddenStudents.includes(student.id)) {
                            return <Student 
                                student={student} 
                                onSelected={onStudentSelected} 
                                onCheckLabTask={onCheckLabTask}
                                onSetCellValue={onSetCellValue}
                                scores={scores}
                            />
                        }
                    })
            }
        </div>
    )
}
export default Group;