import type Student from "./student"

export default interface GroupType {
    id: string
    title: string
    subject: string
    students: Student[]
}