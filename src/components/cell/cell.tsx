import cl from './cell.module.sass'
import type { ScoreType } from '../../types/scores'
import checkboxColors from '../../consts/checkbox_colors'
import { MdClear } from "react-icons/md";
// Одна ячейка
const Cell = (
    {
        lesson,
        scores,
        isSelected,
        setSelectedCell,
        onSetCellValue
    }: {
        lesson: any
        scores: ScoreType[]
        isSelected: boolean
        setSelectedCell: (lessonID: string | null) => void,
        onSetCellValue: (value: string, valueType: string) => void
    }
) => {

    return (
        <div className={cl.cell} style={{color: lesson.value == 'Н' ? 'red' : 'black', background: isSelected ? '#EFF3F9' : 'none'}} onClick={() => {
                setSelectedCell(
                    lesson.cellID ? lesson.cellID : lesson.id
                )
            }
        }>
        {
            lesson.valueType == 'checkbox'
                ? <input type="checkbox" className='checkbox' style={{accentColor: checkboxColors[lesson.value]}} checked={true}/>
                : lesson.value
        }
        {/* Панель выбора оценки */}
        {
            isSelected &&
                <div className={cl.marks}>
                    {/* Пустое значение */}
                    <div 
                        className={cl.mark + ' ' + cl.emptyMark}
                        onClick={() => {
                            setSelectedCell(null)
                            onSetCellValue('',  'symbol')
                        }}
                    >
                    <MdClear size={'18px'} />
                    </div>
                    {/* Возможные оценки */}
                    {
                        scores.map(score => <div 
                                className={cl.mark}
                                onClick={() => {
                                    setSelectedCell(null)
                                    onSetCellValue(score.mark, score.type)
                                }}
                            >
                            {
                                score.type == 'checkbox'
                                    ? <input type="checkbox" className='checkbox' style={{accentColor: checkboxColors[Number(score.mark)]}} checked={true}/>
                                    : <p>{score.mark}</p>
                            }
                        </div>)
                    }
                </div>
        }
    </div>
    )
}
export default Cell;