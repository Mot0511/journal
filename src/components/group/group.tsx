import { useState } from 'react'
import cl from './group.module.sass'
import Student from '../student/student';
import type GroupType from '../../types/group';

const Group = (
    {
        group,
        onStudentSelected,
        onSetCellValue,
        onCheckLabTask
    }: {
        group: GroupType,
        onStudentSelected: (studentID: string, isSelected: boolean) => void
        onSetCellValue: (groupID: string, studentID: string, lessonID: string, lessonType: string, value: string) => void
        onCheckLabTask: (groupID: string, studentID: string, labID: string, taskID: number) => void
    }) => {

    const [isStudentsVisible, setIsStudentsVisible] = useState<boolean>(true);

    return (
        <div className={cl.group}>
            <div onClick={() => setIsStudentsVisible(!isStudentsVisible)} className={cl.group_name}>
                <p>{group.title}</p>
            </div>
            {
                
                isStudentsVisible &&
                    group.students.map((student) => <Student 
                        student={student} 
                        onSelected={onStudentSelected} 
                        onCheckLabTask={onCheckLabTask}
                        onSetCellValue={onSetCellValue}
                    />)
            }
        </div>
    )
}
export default Group;