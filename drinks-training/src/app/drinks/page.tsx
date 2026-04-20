'use client';

import { useState } from 'react';
import { drinks, categories, DrinkRecipe, Step } from '@/data/drinks';
import BartenderStation from '@/components/BartenderStation';
import { Wine, GlassWater, Leaf, Droplets, Citrus, ChevronLeft, BookOpen, Play, CheckCircle, AlertCircle } from 'lucide-react';

type ViewMode = 'menu' | 'detail' | 'game';

const categoryIcons: Record<string, React.ReactNode> = {
  cocktail: <Wine className="w-6 h-6" />,
  signature: <GlassWater className="w-6 h-6" />,
  seasonal: <Leaf className="w-6 h-6" />,
  refreshing: <Droplets className="w-6 h-6" />,
  tea: <Citrus className="w-6 h-6" />,
};

const glassNames: Record<string, string> = {
  highball: '长饮杯',
  rock: '古典杯',
  champagne: '香槟杯',
  mug: '马克杯',
};

const actionNames: Record<string, string> = {
  add: '加入',
  shake: '摇匀',
  stir: '搅拌',
  pour: '过滤倒出',
  garnish: '点缀',
};

export default function DrinksTrainingPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [selectedDrink, setSelectedDrink] = useState<DrinkRecipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDrinks = selectedCategory
    ? drinks.filter((d) => d.category === selectedCategory)
    : drinks;

  const handleDrinkSelect = (drink: DrinkRecipe) => {
    setSelectedDrink(drink);
    setViewMode('detail');
  };

  const handleStartGame = () => {
    setViewMode('game');
  };

  const handleGameComplete = (score: number) => {
    console.log('Game completed with score:', score);
    // Could save score to localStorage or backend here
  };

  const handleExit = () => {
    setViewMode('menu');
    setSelectedDrink(null);
  };

  const handleBackToDetail = () => {
    setViewMode('detail');
  };

  // 配方详情页面
  if (viewMode === 'detail' && selectedDrink) {
    const category = categories.find((c) => c.id === selectedDrink.category);

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
        {/* Header */}
        <header className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleExit}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                返回列表
              </button>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">{selectedDrink.name}</h1>
                <p className="text-slate-400 text-sm">{selectedDrink.nameEn}</p>
              </div>
              <button
                onClick={handleStartGame}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                <Play className="w-4 h-4" />
                开始练习
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* 饮品基本信息 */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-sm px-3 py-1 rounded-full text-white ${category?.color || 'bg-slate-600'}`}>
                {category?.name}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <GlassWater className="w-4 h-4" />
                {glassNames[selectedDrink.glass]}
              </span>
            </div>

            {selectedDrink.tips.length > 0 && (
              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">注意事项</span>
                </div>
                <ul className="space-y-1">
                  {selectedDrink.tips.map((tip, idx) => (
                    <li key={idx} className="text-amber-200/80 text-sm">• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 原料清单 */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              所需原料
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {selectedDrink.ingredients.map((ing, idx) => (
                <div key={idx} className="bg-slate-700/50 rounded-xl p-3 text-center">
                  <span className="text-slate-300 text-sm">{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 制作步骤 */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              制作步骤
            </h2>
            <div className="space-y-4">
              {selectedDrink.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 text-sm font-medium">
                        {actionNames[step.action]}
                      </span>
                      {step.ingredient && (
                        <span className="text-white font-medium">{step.ingredient}</span>
                      )}
                      {step.amount && (
                        <span className="text-slate-500 text-sm">({step.amount})</span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{step.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 开始练习按钮 */}
          <button
            onClick={handleStartGame}
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            开始制作练习
          </button>
        </main>
      </div>
    );
  }

  // 游戏模式
  if (viewMode === 'game' && selectedDrink) {
    return (
      <div className="min-h-screen bg-slate-950 p-4">
        <div className="max-w-4xl mx-auto">
          <BartenderStation
            drink={selectedDrink}
            onComplete={handleGameComplete}
            onExit={handleBackToDetail}
          />
        </div>
      </div>
    );
  }

  // 菜单列表
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white">饮品制作培训</h1>
          <p className="text-slate-400 mt-2">选择一款饮品开始学习制作</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm mb-3">分类筛选</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? `${cat.color} text-white`
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {categoryIcons[cat.id]}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDrinks.map((drink) => {
            const category = categories.find((c) => c.id === drink.category);

            return (
              <button
                key={drink.id}
                onClick={() => handleDrinkSelect(drink)}
                className="group bg-slate-800 hover:bg-slate-700 rounded-2xl p-5 text-left transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full text-white ${
                      category?.color || 'bg-slate-600'
                    }`}
                  >
                    {category?.name}
                  </span>
                  <span className="text-slate-500 text-sm">{glassNames[drink.glass]}</span>
                </div>

                {/* Drink Info */}
                <h3 className="text-xl font-bold text-white mb-1">{drink.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{drink.nameEn}</p>

                {/* Ingredients Preview */}
                <div className="flex flex-wrap gap-1.5">
                  {drink.ingredients.slice(0, 4).map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-slate-900/50 text-slate-400 rounded-lg"
                    >
                      {ing}
                    </span>
                  ))}
                  {drink.ingredients.length > 4 && (
                    <span className="text-xs px-2 py-1 text-slate-500">
                      +{drink.ingredients.length - 4}
                    </span>
                  )}
                </div>

                {/* Steps Count */}
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-sm text-slate-500">
                  <span>{drink.steps.length} 个步骤</span>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                    查看配方 →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredDrinks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">该分类下暂无饮品</p>
          </div>
        )}
      </main>
    </div>
  );
}
