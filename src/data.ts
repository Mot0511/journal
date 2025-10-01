export default [
    {
        id: '100',
        title: 'ИВТб-1301-05-00',
        subject: 'informatiсs',
        students: [
            {
                id: '1000',
                name: 'Matvey',
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
                        id: '1',
                        title: 'Лабораторная работа 1',
                        date: '04/09',
                        tasks: [true, true, false, true]
                    },
                    {
                        id: '2',
                        title: 'Лабораторная работа 2',
                        date: '04/09',
                        tasks: [true, true, false, true, true]
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