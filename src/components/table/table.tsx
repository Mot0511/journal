import cl from './table.module.sass';
import TableHeader from '../table_header/table_header';
import Group from '../group/group';
import type GroupType from '../../types/group';

const Table = (
    {
        groups, 
        onStudentSelected,
        onSetCellValue,
        onCheckLabTask,
        editDate,
        selectedColumns,
        setSelectedColumns,
        editLabTasks
    }: {
        groups: GroupType[],
        onStudentSelected: (studentID: string, isSelected: boolean) => void
        onSetCellValue: (groupID: string, studentID: string, lessonID: string, lessonType: string, value: string) => void
        onCheckLabTask: (groupID: string, studentID: string, labID: string, taskID: number) => void,
        editDate: (lessonID: string, lessonType: string, date: string) => void,
        selectedColumns: string[],
        setSelectedColumns: (columns: string[]) => void,
        editLabTasks: (labID: string, tasksCount: number) => void
    }) => {

    return (
        <div className={cl.table}>
            <TableHeader 
                group={groups[0]} 
                editDate={editDate}
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
                editLabTasks={editLabTasks}
            />
            {
                groups.map(group => <Group 
                    group={group} 
                    onStudentSelected={onStudentSelected}
                    onCheckLabTask={onCheckLabTask}
                    onSetCellValue={onSetCellValue}
                    
                />)
            }
            
        </div>
    )
}
export default Table;