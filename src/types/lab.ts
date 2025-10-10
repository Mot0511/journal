interface LabTask {
    id: string,
    value: string
    valueType: string
}

export default interface LabType {
    id: string
    number: number
    date: string
    tasks: LabTask[]
}