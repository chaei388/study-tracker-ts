import {useEffect, useRef, useState} from "react";

interface ProblemFormProps {
    onAdd: (problem: Omit<Problem,'id'>) => void;
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
                timeSpent: editingProblem.timeSpent?.toString() ||'',
                tags: editingProblem.tags.join(', '),
                memo:editingProblem.memo,
                url:editingProblem.url || '',
            });
            titleInputRef.current?.focus();
        }
    },[editingProblem]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.title.trim()){
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
            url:form.url || undefined,
        };

        if (editingProblem) {
            onUpdate({...problemData, id: editingProblem.id});
        } else {
            onAdd(problemData);
        }

        setForm(emptyForm() );
        titleInputRef.current?.focus();
    };

    const handelCancel = () => {
        setForm(emptyForm());
        onCancelEdit();
        titleInputRef.current?.focus();
    };


    return (

    );
}