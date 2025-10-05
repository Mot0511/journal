import cl from './table.module.sass';
import TableHeader from '../table_header/table_header';
import Group from '../group/group';
import type GroupType from '../../types/group';
import type ScoreType from '../../types/scores';

const Table = (
    {
        groups, 
        onStudentSelected,
        onSetCellValue,
        onCheckLabTask,
        editDate,
        selectedColumns,
        setSelectedColumns,
        editLabTasks,
        scores,
        setScores
    }: {
        groups: GroupType[],
        onStudentSelected: (studentID: string, isSelected: boolean) => void
        onSetCellValue: (groupID: string, studentID: string, lessonID: string, lessonType: string, value: string) => void
        onCheckLabTask: (groupID: string, studentID: string, labID: string, taskID: number) => void,
        editDate: (lessonID: string, lessonType: string, date: string) => void,
        selectedColumns: string[],
        setSelectedColumns: (columns: string[]) => void,
        editLabTasks: (labID: string, tasksCount: number) => void,
        scores: ScoreType[],
        setScores: (scores: ScoreType[]) => void,
    }) => {

    return (
        <div className={cl.table}>
            <TableHeader 
                groups={groups} 
                editDate={editDate}
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
                editLabTasks={editLabTasks}
                scores={scores}
                setScores={setScores}
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