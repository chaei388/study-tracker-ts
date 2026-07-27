import { useEffect, useRef, useState } from "react";

// import styles from './ProblemForm.module.css';

interface ProblemFormProps {
    onAdd: (problem: Omit<Problem, 'id'>) => void;
    editingProblem: Problem | null;
    onUpdate: (problem: Problem) => void;
    onCancelEdit: ) => void;
}

const emptyForm = () => ({
    title: '',
    difficulty: 'medium' as Difficulty,
    plasform: '백준' as Platform,
    solvedAt: new Date().toISOString().split('T')[0],
    timeSpent: '',
    tags: '',
    memo: '',
    url: '',
})

export default function ProblemForm({
    onAdd,
    editingProblem,
    onUpdate,
    onCancelEdit,
}: ProblemFormProps) {
    const [form, setForm] = useState(emptyForm);
    const titleInputRef = useRef<HTMLInputElement>(null);

    //수정모드 -> 기존 값으로 폼 채우기

    useEffect(() => {
        if (editingProblem) {
            setForm({
                title: editingProblem.title,
                difficulty: editingProblem.difficulty,
                plasform: editingProblem.platform,
                solvedAt: editingProblem.solvedAt,
                timeSpent: editingProblem.timeSpent?.toString() || '',
                tags: editingProblem.tags.join(', '),
                memo: editingProblem.memo,
                url: editingProblem.url || '',
            });
            titleInputRef.current?.focus();
        }
    }, [editingProblem]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.title.trim()) {
            alert('문제 제목을 입력해주세요!');
            return;
        }

        const problemData = {
            title: form.title,
            difficulty: form.difficulty,
            platform: form.platform,
            solvedAt: form.solvedAt,
            timeSpent: form.timeSpent ? parseInt(form.timeSpent) : undefined,
            tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
            memo: form.memo,
            url: form.url || undefined,
        };

        if (editingProblem) {
            onUpdate({ ...problemData, id: editingProblem.id });
        } else {
            onAdd(problemData);
        }

        setForm(emptyForm());
        titleInputRef.current?.focus();
    };

    const handelCancel = () => {
        setForm(emptyForm());
        onCancelEdit();
        titleInputRef.current?.focus();
    };


    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{editingProblem ? '문제 수정' : '새 문제 추가'}</h2>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label> 문제 제목 *</label>
                    <input
                        ref={titleInputRef}
                        type="text"
                        value={form.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        placeholder="예) 피보나치 수"
                    />
                </div>

                <div className={styles.field}>
                    <label>플랫폼</label>
                    <select
                        value={form.platform}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setForm({ ...form, platform: e.target.value as Platform })
                        }
                    >
                        <option value="백준">백준</option>
                        <option value="프로그래머스">프로그래머스</option>
                        <option value="LeetCode">LeetCode</option>
                    </select>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label>난이도</label>
                    <select
                        value={form.difficulty}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setForm({ ...form, difficulty: e.target.value as Difficulty })
                        }
                    >
                        <option value="easy">쉬움</option>
                        <option value="medium">보통</option>
                        <option value="hard">어려움</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label>풀이 날짜</label>
                    <input
                        type="date"
                        value={form.solvedAt}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setForm({ ...form, solvedAt: e.target.value })
                        }
                    />
                </div>

                <div className={styles.field}>
                    <label>소요 시간 (분)</label>
                    <input
                        type="number"
                        value={form.timeSpent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setForm({ ...form, timeSpent: e.target.value })
                        }
                        placeholder="30"
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label>태그 (쉼표로 구분)</label>
                <input
                    type="text"
                    value={form.tags}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)
                        => setForm({ ...form, tags: e.target.value })
                    }
                    placeholder="DP, 그리디, 구현"
                />
            </div>

            <div className={styles.field}>
                <label>메모</label>
                <textarea
                    value={form.memo}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, memo: e.target.value })
                    }
                    placeholder="풀이 방법, 느낀 점 등"
                    rows={4}
                />
            </div>

            <div className={styles.field}>
                <label>문제 링크</label>
                <input
                    type="url"
                    value={form.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)
                        => setForm({ ...form, url: e.target.value })
                    }
                    placeholder="http://..."
                />
            </div>

            <div className={styles.buttons}>
                <button type="submit" className={styles.submitBtn}>
                    {editingProblem ? '수정하기' : '추가하기'}
                </button>
                {editingProblem && (
                    <button
                        type="button"
                        onClick={handelCancel}
                        className={styles.cancelBtn}>
                        취소
                    </button>
                )}
            </div>
        </form>
    );
}