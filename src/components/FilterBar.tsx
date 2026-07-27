import type { Difficulty, Platform } from '../types'
import styles from './FilterBar.module.css'

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;

    selectedDifficulty: Difficulty | 'all';
    onDifficultyChange: (difficulty: Difficulty | 'all') => void;

    selectedPlatform: Platform | 'all';
    onPlatformChange: (platform: Platform | 'all') => void;
}

function FilterBar({
    searchQuery,
    onSearchChange,
    selectedDifficulty,
    onDifficultyChange,
    selectedPlatform,
    onPlatformChange,
}: FilterBarProps) {

    return (
        <div className='styles.filterBar'>

            <input
                type="text"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onSearchChange(e.target.value)}
                placeholder="문제 제목 검색..."
                className={styles.searchInput}
            />

            <select
                value={selectedDifficulty}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onDifficultyChange(e.target.value as Difficulty | 'all')}
                className={styles.select}
            >
                <option value="all">모든 난이도</option>
                <option value="easy">쉬움</option>
                <option value="medium">보통</option>
                <option value="hard">어려움</option>
            </select>

            <select
                value={selectedPlatform}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onPlatformChange(e.target.value as Platform | 'all')}
                className={styles.select}
            >
                <option value="all">모든 플랫폼</option>
                <option value="백준">백준</option>
                <option value="프로그래머스">프로그래머스</option>
                <option value="LeetCode">LeetCode</option>
            </select>
        </div>
    )
}

export default FilterBar;
