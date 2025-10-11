// Описание задания в лабе
interface LabTask {
    id: string,
    value: string
    valueType: string
}

// Описание лабы
export default interface LabType {
    id: string
    number: number
    date: string
    tasks: LabTask[]
}