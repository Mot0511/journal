import type Student from "./student"

// Описание группы
export default interface GroupType {
    id: string
    title: string
    subject: string
    students: Student[]
}