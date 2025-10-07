import type GroupType from "./types/group"
import type ScoreType from "./types/scores"

const groups_data: GroupType[] = [
    {
        id: '100',
        title: 'ИВТб-1301-05-00',
        subject: 'informatiсs',
        students: [
            {
                id: '1000',
                name: 'Матвей',
                groupID: '100',
                lectures: [
                    {
                        id: '1',
                        date: '04/09',
                        presence: true
                    },
                    {
                        id: '2',
                        date: '04/09',
                        presence: false
                    },
                    {
                        id: '3',
                        date: '04/09',
                        presence: true
                    },
                ],
                practices: [
                    {
                        id: '4',
                        date: '04/09',
                        value: '1.0'
                    },
                    {
                        id: '5',
                        date: '04/09',
                        value: '3.0'
                    }
                ],
                labs: [
                    {
                        id: '6',
                        number: 1,
                        date: '04/10',
                        tasks: [true, true, false, true],
                        checkboxColor: 0
                    },
                    {
                        id: '7',
                        number: 2,
                        date: '04/10',
                        tasks: [true, true, false, true, true],
                        checkboxColor: 1
                    },
                    {
                        id: '8',
                        number: 3,
                        date: '04/10',
                        tasks: [true, true, false, true, true],
                        checkboxColor: 2
                    }
                ],
                lecture_presences: 10,
                practice_presences: 7,
                lab_dones: 75,
                summary: 92
            },
            {
                id: '4000',
                name: 'А',
                groupID: '100',
                lectures: [
                    {
                        id: '1',
                        date: '04/09',
                        presence: true
                    },
                    {
                        id: '2',
                        date: '04/09',
                        presence: false
                    },
                    {
                        id: '3',
                        date: '04/09',
                        presence: true
                    },
                ],
                practices: [
                    {
                        id: '4',
                        date: '04/09',
                        value: '1.0'
                    },
                    {
                        id: '5',
                        date: '04/09',
                        value: '3.0'
                    }
                ],
                labs: [
                    {
                        id: '6',
                        number: 1,
                        date: '04/10',
                        tasks: [true, true, false, true],
                        checkboxColor: 0
                    },
                    {
                        id: '7',
                        number: 2,
                        date: '04/10',
                        tasks: [true, true, false, true, true],
                        checkboxColor: 1
                    },
                    {
                        id: '8',
                        number: 3,
                        date: '04/10',
                        tasks: [true, true, false, true, true],
                        checkboxColor: 2
                    }
                ],
                lecture_presences: 10,
                practice_presences: 7,
                lab_dones: 75,
                summary: 92
            },
            {
                id: '3000',
                name: 'в',
                groupID: '100',
                lectures: [
                    {
                        id: '1',
                        date: '04/09',
                        presence: true
                    },
                    {
                        id: '2',
                        date: '04/09',
                        presence: false
                    },
                    {
                        id: '3',
                        date: '04/09',
                        presence: true
                    },
                ],
                practices: [
                    {
                        id: '4',
                        date: '04/09',
                        value: '1.0'
                    },
                    {
                        id: '5',
                        date: '04/09',
                        value: '3.0'
                    }
                ],
                labs: [
                    {
                        id: '6',
                        number: 1,
                        date: '04/10',
                        tasks: [true, true, false, true],
                        checkboxColor: 0
                    },
                    {
                        id: '7',
                        number: 2,
                        date: '04/10',
                        tasks: [true, true, false, true, true],
                        checkboxColor: 1
                    },
                    {
                        id: '8',
                        number: 3,
                        date: '04/10',
                        tasks: [true, true, false, true, true],
                        checkboxColor: 2
                    }
                ],
                lecture_presences: 10,
                practice_presences: 7,
                lab_dones: 75,
                summary: 92
            },
            {
                id: '2000',
                name: 'Б',
                groupID: '100',
                lectures: [
                    {
                        id: '1',
                        date: '04/09',
                        presence: true
                    },
                    {
                        id: '2',
                        date: '04/09',
                        presence: false
                    },
                    {
                        id: '3',
                        date: '04/09',
                        presence: true
                    },
                ],
                practices: [
                    {
                        id: '4',
                        date: '04/09',
                        value: '1.0'
                    },
                    {
                        id: '5',
                        date: '04/09',
                        value: '3.0'
                    }
                ],
                labs: [
                    {
                        id: '6',
                        number: 1,
                        date: '04/10',
                        tasks: [true, true, false, true],
                        checkboxColor: 0
                    },
                    {
                        id: '7',
                        number: 2,
                        date: '04/10',
                        tasks: [true, true, false, true, true],
                        checkboxColor: 1
                    },
                    {
                        id: '8',
                        number: 3,
                        date: '04/10',
                        tasks: [true, true, false, true, true],
                        checkboxColor: 2
                    }
                ],
                lecture_presences: 10,
                practice_presences: 7,
                lab_dones: 75,
                summary: 92
            },
        ]
    },
]

const scores_data: ScoreType[] = [
    {
        id: 6,
        type: 'number',
        value: '1',
        score: 1
    },
    {
        id: 1,
        type: 'number',
        value: '5',
        score: 5
    },
    {
        id: 2,
        type: 'checkbox',
        value: '0',
        score: 10
    },
    {
        id: 3,
        type: 'checkbox',
        value: '1',
        score: 20
    },
    {
        id: 4,
        type: 'checkbox',
        value: '2',
        score: 30
    },
    {
        id: 5,
        type: 'symbol',
        value: 'Н',
        score: -1
    },
]

export {groups_data, scores_data}