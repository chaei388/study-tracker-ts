import { useState, useEffect } from 'react';
import type { Problem, Difficulty, Platform } from './types';
import Header from './components/Header';
import ProblemForm from './components/ProblemForm';
import FilterBar from './components/FilterBar';
import ProblemList from './components/ProblemList';
import './App.css';

function App() {
  const [problems, setProblems] = useState<Problem[]>(() => {
    const saved = localStorage.getItem('problems');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');

  useEffect(() => {
    localStorage.setItem('problems', JSON.stringify(problems));
  }, [problems]);

  // 추가
  const handleAdd = (problemData: Omit<Problem, 'id'>) => {
    const newProblem: Problem = { ...problemData, id: Date.now() };
    setProblems([newProblem, ...problems]);
  };

  // 수정 저장
  const handleUpdate = (updatedProblem: Problem) => {
    setProblems(problems.map((p) => (p.id === updatedProblem.id ? updatedProblem : p)));
    setEditingProblem(null);
  };

  // 삭제(id 불일치만 남김)
  const handleDelete = (id: number) => {
    setProblems(problems.filter((p) => p.id !== id));
  };

  // 수정 진입
  const handleEdit = (problem: Problem) => {
    setEditingProblem(problem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => setEditingProblem(null);

  // 필터링
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesPlatform = selectedPlatform === 'all' || problem.platform === selectedPlatform;
    return matchesSearch && matchesDifficulty && matchesPlatform;
  });

  // 통계
  const stats = {
    total: problems.length,
    easy: problems.filter((p) => p.difficulty === 'easy').length,
    medium: problems.filter((p) => p.difficulty === 'medium').length,
    hard: problems.filter((p) => p.difficulty === 'hard').length,
  };

  return (
    <div className="App">
      <Header total={stats.total} easy={stats.easy} medium={stats.medium} hard={stats.hard} />

      <ProblemForm
        onAdd={handleAdd}
        editingProblem={editingProblem}
        onUpdate={handleUpdate}
        onCancelEdit={handleCancelEdit}
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
      />

      <ProblemList problems={filteredProblems} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;