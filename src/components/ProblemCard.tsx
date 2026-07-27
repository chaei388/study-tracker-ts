import type {Problem} from '../types';
import styles from './ProblemCard.module.css'

interface ProblemCardProps {
    problem: Problem;
    onEdit: (problem: Problem) => void;
    onDelete: (id: number) => void;
}

function ProblemCard({problem, onEdit, onDelete}: ProblemCardProps) {
    // 내부 값 -> 화면용 한글
    const difficultyLabel = {easy: '쉬움', medium:'보통', hard:'어려움'};

    const handelDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onDelete(problem.id);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>{problem.title}</h3>
                {/* 난이도별 배지 색 자동 선택하기 */}
                <span className={`${styles.badge} ${styles[problem.difficulty]}`}>
                    {difficultyLabel[problem.difficulty]}
                </span>
            </div>

            <div className={styles.meta}>
                <span className={styles.platform}>{problem.platform}</span>
                <span className={styles.date}>{problem.solveAt}</span>
                {problem.timeSpent && (
                    <span className={styles.time}>⏱️ {problem.timeSpent}분</span>
                )}
            </div>

            {problem.tags.length > 0 && (
                <div className={styles.tags}>
                    {problem.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            )}

            {problem.memo && <p className={styles.memo}>{problem.memo}</p>}
            {problem.url && (
                <a href={problem.url} target="_blank" rel="noopener noreferrer" className={styles.link}>🔗 문제 링크</a>
            )}

            <div className={styles.actions}>
                <button onClick={() => onEdit(problem)} className={styles.editBtn}>수정</button>
                <button onClick={handelDelete} className={styles.deleteBtn}>삭제</button>
            </div>
        </div>
    );
}

export default ProblemCard;