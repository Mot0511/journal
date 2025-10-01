import cl from './table_header.module.sass';
import type GroupType from '../../types/group';

const TableHeader = ({group}: {group: GroupType}) => {

    return (
        <div className={cl.table_header}>
            <div className={cl.student_name_box + ' ' + cl.table_header_box}>
                <h3>ФИО</h3>
            </div>
            <div className={cl.table_header_box + ' ' + cl.lessons_header_box}>
                <h3>Лекции</h3>
                <div className={cl.days}>
                    {
                        group.students[0].lectures.map(lecture => {
                            return <div className={cl.day}>
                                <p>{lecture.date}</p>
                            </div>
                        }
                            
                        )
                    }
                </div>
            </div>
            <div className={cl.table_header_box + ' ' + cl.lessons_header_box}>
                <h3>Практика</h3>
                <div className={cl.days}>
                    {
                        group.students[0].practices.map(practice => 
                            <div className={cl.day}>
                                <p>{practice.date}</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={cl.table_header_box + ' ' + cl.labs_header_box}>
                <h3>Лабораторные работы</h3>
                <div className={cl.labs}>
                    {
                        group.students[0].labs.map(lab => {
                            let num = 0
                            return <div className={cl.lab} style={{width: 30 * lab.tasks.length + 10}}>
                                <p>{lab.title}</p>
                                <div className={cl.lab_tasks}>
                                    {
                                        lab.tasks.map(_ => {
                                            num += 1
                                            return <div className={cl.lab_task}>{num}</div>
                                        })
                                    }   
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={cl.table_header_box + ' ' + cl.summary_header_box}>
                <p>Посещение<br /> лекций</p>
                <p>Посещение<br /> практик</p>
                <p>Сдача<br /> лабораторных<br /> работ</p>
            </div>
            <div className={cl.table_header_box}>
                <h3>Сумма</h3>
            </div>
        </div>
    )
}
export default TableHeader;