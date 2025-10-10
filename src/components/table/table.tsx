import cl from './table.module.sass';
import TableHeader from '../table_header/table_header';
import Group from '../group/group';
import type GroupType from '../../types/group';
import type {ScoresType} from '../../types/scores';
import type StudentType from '../../types/student';

const Table = (
    {
        groups, 
        onStudentSelected,
        onSetCellValue,
        onSetLabTaskValue,
        editDate,
        selectedColumns,
        setSelectedColumns,
        editLabTasks,
        scores,
        setScores,
        hiddenStudents,
        setHiddenStudents,
        isFiltersCollapsed,
        setIsFiltersCollapsed
    }: {
        groups: GroupType[],
        onStudentSelected: (studentID: string, isSelected: boolean) => void
        onSetCellValue: (student: StudentType, lessonID: string, lessonType: string, value: string, valueType: string) => void
        onSetLabTaskValue: (student: StudentType, labID: string, taskID: string, value: string, valueType: string) => void
        editDate: (lessonID: string, lessonType: string, date: string) => void,
        selectedColumns: string[],
        setSelectedColumns: (columns: string[]) => void,
        editLabTasks: (labID: string, tasksCount: number) => void,
        scores: ScoresType,
        setScores: (scores: ScoresType) => void,
        hiddenStudents: string[],
        setHiddenStudents: (students: string[]) => void
        isFiltersCollapsed: boolean,
        setIsFiltersCollapsed: (state: boolean) => void
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
                hiddenStudents={hiddenStudents}
                setHiddenStudents={setHiddenStudents}
                isFiltersCollapsed={isFiltersCollapsed}
                setIsFiltersCollapsed={setIsFiltersCollapsed}
            />
            {
                groups.map(group => <Group 
                    group={group} 
                    onStudentSelected={onStudentSelected}
                    onSetCellValue={onSetCellValue}
                    onSetLabTaskValue={onSetLabTaskValue}
                    hiddenStudents={hiddenStudents}
                    scores={scores}
                />)
            }
            
        </div>
    )
}
export default Table;