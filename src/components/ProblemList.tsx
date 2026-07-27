// import

import type {Problem} from '../types'
import ProblemCard from './ProblemCard'
import styles from './ProblemList.module.css'

interface ProblemListProps {
    problems: (problem: Problem) => void;
    onDelete: (id: number) => void;
}

function ProblemList({ problems, onEdit, onDelete }: ProblemListProps) {
    
    // 빈 목록 -> 안내 화면
    if (problems.length === 0) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyIcon}>�</p>
                <p className={styles.emptytext}>아직 기록된 문제가 없습니다.</p>
                <p className={styles.emptyHint}>위에서 첫 번째 문제를 추가해보세요!</p>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {problems.map((problem) => (
                <ProblemCard
                    key={problem.id}
                    problem={problem}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default ProblemList;