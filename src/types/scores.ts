interface ScoreType {
    id: number
    type: string
    mark: string
    score: number
}

interface ScoresType {
    lectures: ScoreType[]
    practices: ScoreType[]
    labs: ScoreType[]
}

export type {ScoreType, ScoresType}