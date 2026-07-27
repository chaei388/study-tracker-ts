import styles from './Header.module.css';

interface HeaderProps {
    total: number;
    easy: number;
    medium: number;
    hard: number;
}

export default function Header({ total, easy, medium, hard }: HeaderProps) {
    return (
        <header className={styles.header}>
            <h1>코딩테스트 학습 기록</h1>
            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <span className={styles.number}>{total}</span>
                    <span className={styles.label}>전체</span>
                </div>
                <div className={styles.statItem}>
                    <span className={`${styles.number} ${styles.easy}`}>{easy}</span>
                    <span className={styles.label}>쉬움</span>
                </div>
                <div className={styles.statItem}>
                    <span className={`${styles.number} ${styles.medium}`}>{medium}</span>
                    <span className={styles.label}>보통</span>
                </div>
                <div className={styles.statItem}>
                    <span className={`${styles.number} ${styles.hard}`}>{hard}</span>
                    <span className={styles.label}>어려움</span>
                </div>
            </div>
        </header>
    );
}
