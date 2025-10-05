import { useState } from 'react'
import cl from './scores_modal.module.sass'
import type ScoreType from '../../types/scores'
import { RiDeleteBin6Line } from "react-icons/ri";
import CheckboxColors from '../../consts/checkbox_colors.ts'
import checkboxColors from '../../consts/checkbox_colors.ts';

const ScoresModal = (
    {
        scoresData,
        setScoresData,
        onCancel,
    }: 
    {
        scoresData: ScoreType[]
        setScoresData: (scores: ScoreType[]) => void
        onCancel: () => void
    }) => {

    const [valueType, setValueType] = useState<string>('checkbox')
    const [score, setScore] = useState<number>(0)

    const [editingScore, setEditingScore] = useState<number | null>()
    const [value, setValue] = useState<string>('')

    const [scores, setScores] = useState<ScoreType[]>(scoresData)

    const isExistingScoreWithSameValue = (value: string) => {
        for (let score of scores) {
            if (score.value == value) {
                return true
            }
        }
        return false
    }

    const addScore = () => {
        
        const data: any = {
            id: Date.now(),
            type: valueType,
            score: score
        }
        switch (valueType) {
            case 'checkbox':
                if (isExistingScoreWithSameValue('0')) return
                data.value = '0'
                break
            case 'symbol':
                if (isExistingScoreWithSameValue('Н')) return
                data.value = 'Н'
                break
            case 'number':
                if (isExistingScoreWithSameValue('2')) return
                data.value = '2'
                break
        }
        setScores([...scores, data])
        
    }

    const removeScore = (id: number) => {
        setScores(scores.filter(score => score.id != id))
    }

    const editValue = (id: number) => {
        if (isExistingScoreWithSameValue(value)) return
        setScores(scores.map(score => {
            if (score.id == id) {
                score.value = value
            }
            return score
        }))
    }

    const editCheckboxValue = (id: number) => {
        setScores(scores.map(score => {
            if (score.id == id) {
                const value = Number(score.value)
                if (value == CheckboxColors.length - 1) {
                    score.value = '0'
                } else {
                    score.value = String(value + 1)
                }
            }
            return score
        }))
    }

    return (
        <div className={cl.modal}>
            <div className={cl.header}>
                <h1>Настройка баллов</h1>
                <p onClick={addScore}>+ Добавить</p>
            </div>
            <div className={cl.body}>
                <div className={cl.content}>
                    <div className={cl.inputs}>
                        <select value={valueType} onChange={e => setValueType(e.target.value)}>
                            <option value="checkbox">Чекбокс</option>
                            <option value="symbol">Символ</option>
                            <option value="number">Число</option>
                        </select>
                        <input type={'number'} className={cl.count_input} value={score} onChange={(e) => setScore(Number(e.target.value))} placeholder='Балл' />
                    </div>
                    <div className={cl.scores}>
                        {
                            scores.map(score => 
                                <div className={cl.score}>
                                    {
                                        score.type == 'checkbox'
                                            ? <p className={cl.value}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={true} 
                                                    className={cl.checkbox}
                                                    style={{accentColor: CheckboxColors[Number(score.value)]}}
                                                    onClick={_ => editCheckboxValue(score.id)}
                                                />Чекбокс
                                                </p>
                                            : editingScore == score.id
                                                ? <input 
                                                    type={score.type == 'symbol' ? 'text' : 'number'}
                                                    className={cl.value_input} 
                                                    value={value}
                                                    onChange={e => setValue(e.target.value)}
                                                    onBlur={_ => {
                                                        editValue(score.id)
                                                        setEditingScore(null)
                                                    }}
                                                />
                                                : <p className={cl.value} onClick={_ => {
                                                    setValue(score.value)
                                                    setEditingScore(score.id)
                                                }}>{score.value}</p>
                                    }
                                    <p className={cl.score}>{score.score}</p>
                                    <button className={cl.removeBtn} onClick={() => removeScore(score.id)}><RiDeleteBin6Line size={32} /></button>
                                </div>
                            )
                        }
                    </div>
                    <div className={cl.btns}>
                        <button className={cl.btn} onClick={onCancel}>Отмена</button>
                        <button className={cl.btn} onClick={() => setScoresData(scores)}>ОК</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default ScoresModal;