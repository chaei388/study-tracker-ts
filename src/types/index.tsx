// 난이도 (셋 중 하나)
export type Difficulty = 'easy' | 'medium' | 'hard';

// 플랫폼 (셋 중 하나)
export type Platform = '백준' | '프로그래머스' | 'LeetCode';

// 문제 1건
export interface Problem {
    id: number;
    title: string;
    difficulty: Difficulty;
    platform: Platform;
    solvedAt: string; // 푼 날짜 "2026-07-26"
    timeSpent?: number; // 소요 시간(분), 선택
    tags: string[];
    memo: string;
    url?: string; // 문제 링크, 선택
}
