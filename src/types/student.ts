import type Lab from "./lab"
import type Lecture from "./lecture"
import type Practice from "./practice"

// Описание одного студеннта
export default interface StudentType {
    id: string
    name: string
    groupID: string

    lectures: Lecture[]
    practices: Practice[]
    labs: Lab[]

    lecture_presences: number
    practice_presences: number
    lab_dones: number

    summary: number
}