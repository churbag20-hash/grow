import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  Sparkles, 
  Award, 
  Plus, 
  CheckCircle, 
  Brain, 
  TrendingUp, 
  BarChart2, 
  Calendar, 
  Star, 
  Edit3, 
  Check, 
  Bookmark, 
  RefreshCw 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 데이터 상태 관리 (초기 데이터 비움)
  const [books, setBooks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [reframings, setReframings] = useState([]);
  const [reflections, setReflections] = useState([]);

  // 입력 폼 상태
  const [newBook, setNewBook] = useState({ title: '', author: '', status: 'reading', totalPages: 0, currentPage: 0 });
  const [newGoal, setNewGoal] = useState({ title: '', category: '주간', period: '2026-W45' });
  const [newReframing, setNewReframing] = useState({ fixed: '', growth: '' });
  
  // Self-Evaluation 폼 상태
  const [evaluation, setEvaluation] = useState({
    periodType: 'weekly',
    challengeScore: 3,
    resilienceScore: 3,
    effortScore: 3,
    feedbackScore: 3,
    learningScore: 3,
    smallWins: '',
    nextAction: ''
  });

  // 구글 폰트 동적 로드 (Gamja Flower)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // 책 추가
  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title) return;
    setBooks([...books, { ...newBook, id: Date.now() }]);
    setNewBook({ title: '', author: '', status: 'reading', totalPages: 0, currentPage: 0 });
  };

  // 목표 추가
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title) return;
    setGoals([...goals, { ...newGoal, id: Date.now(), completed: false }]);
    setNewGoal({ title: '', category: '주간', period: '2026-W45' });
  };

  // 목표 완료 토글
  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  // 성장 리프레이밍 추가
  const handleAddReframing = (e) => {
    e.preventDefault();
    if (!newReframing.fixed || !newReframing.growth) return;
    setReframings([...reframings, { ...newReframing, id: Date.now() }]);
    setNewReframing({ fixed: '', growth: '' });
  };

  // 회고 저장
  const handleSaveReflection = (e) => {
    e.preventDefault();
    const avg = (
      evaluation.challengeScore + 
      evaluation.resilienceScore + 
      evaluation.effortScore + 
      evaluation.feedbackScore + 
      evaluation.learningScore
    ) / 5;

    let level = '씨앗 🌱';
    if (avg >= 4.5) level = '성숙한 나무 🌳';
    else if (avg >= 3.8) level = '아름다운 꽃 🌸';
    else if (avg >= 3.0) level = '튼튼한 줄기 🌿';
    else if (avg >= 2.0) level = '파릇한 싹 🌾';

    setReflections([
      { ...evaluation, id: Date.now(), averageScore: avg.toFixed(1), level, date: new Date().toLocaleDateString() },
      ...reflections
    ]);

    setEvaluation({
      periodType: 'weekly',
      challengeScore: 3,
      resilienceScore: 3,
      effortScore: 3,
      feedbackScore: 3,
      learningScore: 3,
      smallWins: '',
      nextAction: ''
    });
    alert('성찰 평가가 완료되었습니다!');
  };

  // 계산된 성과 지표
  const completedGoalsCount = goals.filter(g => g.completed).length;
  const goalCompletionRate = goals.length > 0 ? Math.round((completedGoalsCount / goals.length) * 100) : 0;
  const readBooksCount = books.filter(b => b.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-blue-50 text-slate-800" style={{ fontFamily: "'Gamja Flower', cursive, sans-serif" }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-sky-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-[#0284c7] items-center gap-2">
            <Sparkles className="w-7 h-7 text-sky-500 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              성장 마인드셋 코치
            </h1>
          </div>
          <span className="text-xl text-sky-600 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
            리더의 여정
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <nav className="flex justify-around bg-white/60 p-1.5 rounded-2xl border border-sky-200 mb-6 shadow-sm">
          {[
            { id: 'dashboard', label: '대시보드', icon: BarChart2 },
            { id: 'reading', label: '독서 서재', icon: BookOpen },
            { id: 'goals', label: '성장 실천', icon: Target },
            { id: 'reframing', label: '마인드셋', icon: Brain },
            { id: 'evaluation', label: '성장 리포트', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-xl text-xl transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md font-bold'
                    : 'text-slate-600 hover:bg-sky-100/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 1. Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-6 text-white shadow-lg">
              <h2 className="text-3xl font-bold mb-2">오늘의 성장 일치 💡</h2>
              <p className="text-2xl text-sky-50 leading-relaxed">
                "능력은 고정된 것이 아니라 노력과 배움을 통해 확장됩니다. 오늘 마주한 도전은 내 리더십이 성장하는 최고의 기회입니다."
              </p>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm text-center">
                <BookOpen className="w-6 h-6 text-sky-500 mx-auto mb-1" />
                <div className="text-xl text-slate-500">완독한 책</div>
                <div className="text-3xl font-bold text-sky-600">{readBooksCount}권</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm text-center">
                <Target className="w-6 h-6 text-sky-500 mx-auto mb-1" />
                <div className="text-xl text-slate-500">목표 달성률</div>
                <div className="text-3xl font-bold text-sky-600">{goalCompletionRate}%</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm text-center">
                <Brain className="w-6 h-6 text-sky-500 mx-auto mb-1" />
                <div className="text-xl text-slate-500">리프레이밍</div>
                <div className="text-3xl font-bold text-sky-600">{reframings.length}개</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm text-center">
                <Award className="w-6 h-6 text-sky-500 mx-auto mb-1" />
                <div className="text-xl text-slate-500">성찰 평가 완료</div>
                <div className="text-3xl font-bold text-sky-600">{reflections.length}회</div>
              </div>
            </div>

            {/* Quick Actions / Recent status */}
            <div className="bg-white/80 rounded-2xl p-5 border border-sky-200">
              <h3 className="text-2xl font-bold mb-4 text-sky-900 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-sky-500" /> 최근 성장 목표
              </h3>
              {goals.length === 0 ? (
                <p className="text-xl text-slate-400 text-center py-4">등록된 목표가 없습니다. 성장 실천 탭에서 새 목표를 입력해보세요!</p>
              ) : (
                <ul className="space-y-2">
                  {goals.slice(0, 3).map((goal) => (
                    <li key={goal.id} className="flex items-center justify-between p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                      <span className={`text-xl ${goal.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        [{goal.category}] {goal.title}
                      </span>
                      <button onClick={() => toggleGoal(goal.id)} className="text-sky-500">
                        {goal.completed ? <CheckCircle className="w-6 h-6 fill-sky-500 text-white" /> : <div className="w-6 h-6 rounded-full border-2 border-sky-300" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* 2. Reading Tab */}
        {activeTab === 'reading' && (
          <div className="space-y-6">
            <form onSubmit={handleAddBook} className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm space-y-3">
              <h3 className="text-2xl font-bold text-sky-800">📖 새 책 등록하기</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="책 제목"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="p-2.5 text-xl border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input
                  type="text"
                  placeholder="저자"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="p-2.5 text-xl border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <button type="submit" className="w-full bg-sky-500 text-white text-xl py-2.5 rounded-xl hover:bg-sky-600 transition flex items-center justify-center gap-1">
                <Plus className="w-5 h-5" /> 서재에 추가하기
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {books.length === 0 ? (
                <div className="col-span-2 text-center py-10 bg-white/50 rounded-2xl border border-dashed border-sky-200 text-slate-400 text-xl">
                  아직 서재가 비어있습니다. 직접 읽고 계신 책을 추가해보세요!
                </div>
              ) : (
                books.map((book) => (
                  <div key={book.id} className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-2xl font-bold text-slate-800">{book.title}</h4>
                        <span className="text-sm bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full">
                          {book.status === 'reading' ? '읽는 중' : '완독'}
                        </span>
                      </div>
                      <p className="text-xl text-slate-500">{book.author}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <form onSubmit={handleAddGoal} className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm space-y-3">
              <h3 className="text-2xl font-bold text-sky-800">🎯 새로운 성장 목표</h3>
              <div className="flex gap-2">
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="p-2.5 text-xl border border-sky-200 rounded-xl bg-sky-50 text-sky-800 focus:outline-none"
                >
                  <option value="주간">주간</option>
                  <option value="월간">월간</option>
                </select>
                <input
                  type="text"
                  placeholder="실천할 리더십 목표를 작성하세요 (예: 팀원 피드백 시 경청하기)"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="flex-1 p-2.5 text-xl border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <button type="submit" className="w-full bg-sky-500 text-white text-xl py-2.5 rounded-xl hover:bg-sky-600 transition flex items-center justify-center gap-1">
                <Plus className="w-5 h-5" /> 목표 등록하기
              </button>
            </form>

            <div className="bg-white rounded-2xl p-5 border border-sky-200 shadow-sm">
              <h4 className="text-2xl font-bold text-slate-700 mb-4">실천 목록</h4>
              {goals.length === 0 ? (
                <p className="text-xl text-slate-400 text-center py-6">등록된 목표가 없습니다.</p>
              ) : (
                <ul className="space-y-3">
                  {goals.map((goal) => (
                    <li key={goal.id} className="flex items-center justify-between p-3.5 bg-sky-50/50 rounded-xl border border-sky-100">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleGoal(goal.id)}>
                          {goal.completed ? (
                            <CheckCircle className="w-6 h-6 text-sky-500 fill-sky-100" />
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-sky-300 bg-white" />
                          )}
                        </button>
                        <span className={`text-xl ${goal.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          <span className="font-bold text-sky-600">[{goal.category}]</span> {goal.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* 4. Reframing Tab */}
        {activeTab === 'reframing' && (
          <div className="space-y-6">
            <form onSubmit={handleAddReframing} className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm space-y-3">
              <h3 className="text-2xl font-bold text-sky-800">🧠 고정 마인드셋 ➔ 성장 마인드셋 변환</h3>
              <input
                type="text"
                placeholder="고정 마인드셋 (예: '나는 이 문제를 해결할 수 없어')"
                value={newReframing.fixed}
                onChange={(e) => setNewReframing({ ...newReframing, fixed: e.target.value })}
                className="w-full p-2.5 text-xl border border-red-200 bg-red-50/30 rounded-xl focus:outline-none"
              />
              <input
                type="text"
                placeholder="성장 마인드셋 (예: '아직 방법을 찾지 못했을 뿐, 시도하면 배울 수 있어')"
                value={newReframing.growth}
                onChange={(e) => setNewReframing({ ...newReframing, growth: e.target.value })}
                className="w-full p-2.5 text-xl border border-sky-200 bg-sky-50/30 rounded-xl focus:outline-none"
              />
              <button type="submit" className="w-full bg-sky-500 text-white text-xl py-2.5 rounded-xl hover:bg-sky-600 transition">
                성장의 언어로 바꿔 저장하기
              </button>
            </form>

            <div className="space-y-3">
              {reframings.length === 0 ? (
                <div className="text-center py-10 bg-white/50 rounded-2xl border border-dashed border-sky-200 text-slate-400 text-xl">
                  생각을 성장의 언어로 다듬어보세요!
                </div>
              ) : (
                reframings.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm space-y-2">
                    <div className="text-lg text-red-400 line-through">❌ {item.fixed}</div>
                    <div className="text-xl font-bold text-sky-700">✨ {item.growth}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 5. Self-Evaluation Report Tab */}
        {activeTab === 'evaluation' && (
          <div className="space-y-6">
            <form onSubmit={handleSaveReflection} className="bg-white p-6 rounded-2xl border border-sky-200 shadow-sm space-y-5">
              <h3 className="text-2xl font-bold text-sky-900 border-b border-sky-100 pb-3 flex items-center gap-2">
                <BarChart2 className="w-6 h-6 text-sky-500" /> 주간/월간 성장 성찰 평가표
              </h3>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xl cursor-pointer">
                  <input
                    type="radio"
                    name="period"
                    checked={evaluation.periodType === 'weekly'}
                    onChange={() => setEvaluation({ ...evaluation, periodType: 'weekly' })}
                  /> 주간 평가
                </label>
                <label className="flex items-center gap-2 text-xl cursor-pointer">
                  <input
                    type="radio"
                    name="period"
                    checked={evaluation.periodType === 'monthly'}
                    onChange={() => setEvaluation({ ...evaluation, periodType: 'monthly' })}
                  /> 월간 평가
                </label>
              </div>

              {/* 5가지 평가 항목 (1~5점) */}
              {[
                { key: 'challengeScore', label: '1. 새로운 도전과 어려움에 얼마나 적극적이었는가?' },
                { key: 'resilienceScore', label: '2. 실수나 실패 시 포기하지 않고 회복하려고 노력했는가?' },
                { key: 'effortScore', label: '3. 결과보다 준비 과정과 집요한 노력에 가치를 두었는가?' },
                { key: 'feedbackScore', label: '4. 주변의 피드백과 조언을 겸손하게 수용했는가?' },
                { key: 'learningScore', label: '5. 동료나 타인의 성공을 통해 자극과 배움을 얻었는가?' },
              ].map((item) => (
                <div key={item.key} className="space-y-1">
                  <div className="text-xl text-slate-700 font-medium">{item.label}</div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setEvaluation({ ...evaluation, [item.key]: score })}
                        className={`w-10 h-10 rounded-xl text-xl font-bold border transition ${
                          evaluation[item.key] === score
                            ? 'bg-sky-500 text-white border-sky-500'
                            : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                    <span className="text-lg text-slate-400 ml-2">({evaluation[item.key]}점)</span>
                  </div>
                </div>
              ))}

              <div className="space-y-3 pt-3 border-t border-sky-100">
                <textarea
                  placeholder="이번 주/월간에 잘한 작은 성공(Small Wins)들을 적어보세요."
                  value={evaluation.smallWins}
                  onChange={(e) => setEvaluation({ ...evaluation, smallWins: e.target.value })}
                  className="w-full p-3 text-xl border border-sky-200 rounded-xl focus:outline-none"
                  rows={2}
                />
                <textarea
                  placeholder="다음 주기를 위한 개선점이나 나만의 액션 플랜을 적어보세요."
                  value={evaluation.nextAction}
                  onChange={(e) => setEvaluation({ ...evaluation, nextAction: e.target.value })}
                  className="w-full p-3 text-xl border border-sky-200 rounded-xl focus:outline-none"
                  rows={2}
                />
              </div>

              <button type="submit" className="w-full bg-sky-500 text-white text-2xl py-3 rounded-xl hover:bg-sky-600 transition shadow-md">
                평가 및 회고 제출하기
              </button>
            </form>

            {/* 기록된 회고 리스트 */}
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-sky-900">📑 지난 성찰 기록</h4>
              {reflections.length === 0 ? (
                <p className="text-xl text-slate-400 text-center py-6 bg-white/50 rounded-2xl border border-dashed border-sky-200">
                  아직 기록된 성찰 평가가 없습니다.
                </p>
              ) : (
                reflections.map((ref) => (
                  <div key={ref.id} className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center border-b border-sky-100 pb-2">
                      <span className="text-xl font-bold text-sky-800">
                        {ref.periodType === 'weekly' ? '주간' : '월간'} 리포트 ({ref.date})
                      </span>
                      <span className="text-2xl font-bold text-sky-600">
                        평점: {ref.averageScore} / 5.0 ({ref.level})
                      </span>
                    </div>
                    {ref.smallWins && <p className="text-xl text-slate-700">🌱 Small Wins: {ref.smallWins}</p>}
                    {ref.nextAction && <p className="text-xl text-sky-700">🚀 Next Step: {ref.nextAction}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
