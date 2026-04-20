'use client';

import { useState, useCallback } from 'react';
import { DrinkRecipe, Step } from '@/data/drinks';
import { GlassWater, IceCream, Citrus, Wine, Coffee, Leaf, Droplets, RefreshCw, CheckCircle, XCircle, Flame } from 'lucide-react';

interface BartenderStationProps {
  drink: DrinkRecipe;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ingredientIcons: Record<string, React.ReactNode> = {
  '金酒': <Wine className="w-6 h-6" />,
  '伏特加': <Wine className="w-6 h-6" />,
  '朗姆酒': <Wine className="w-6 h-6" />,
  '咖啡酒': <Wine className="w-6 h-6" />,
  '香槟': <Wine className="w-6 h-6" />,
  '汤力水': <Droplets className="w-6 h-6" />,
  '苏打水': <Droplets className="w-6 h-6" />,
  '干姜水': <Droplets className="w-6 h-6" />,
  '可乐': <Droplets className="w-6 h-6" />,
  '雪碧': <Droplets className="w-6 h-6" />,
  '橙汁': <Citrus className="w-6 h-6" />,
  '菠萝汁': <Citrus className="w-6 h-6" />,
  '番茄汁': <Citrus className="w-6 h-6" />,
  '酸梅汁': <Citrus className="w-6 h-6" />,
  '柠檬汁': <Citrus className="w-6 h-6" />,
  '牛奶': <GlassWater className="w-6 h-6" />,
  '咖啡': <Coffee className="w-6 h-6" />,
  '冰块': <IceCream className="w-6 h-6" />,
  '柠檬片': <Citrus className="w-6 h-6" />,
  '柠檬角': <Citrus className="w-6 h-6" />,
  '薄荷叶': <Leaf className="w-6 h-6" />,
  '樱桃': <Citrus className="w-6 h-6" />,
  '盐': <IceCream className="w-6 h-6" />,
  '砂糖': <IceCream className="w-6 h-6" />,
  '薄荷糖浆': <Droplets className="w-6 h-6" />,
  '冻干果茶': <Leaf className="w-6 h-6" />,
  '矿泉水': <Droplets className="w-6 h-6" />,
  '搅拌棒': <RefreshCw className="w-6 h-6" />,
};

const glassColors: Record<string, string> = {
  '金酒': 'bg-amber-100',
  '伏特加': 'bg-transparent',
  '朗姆酒': 'bg-amber-200',
  '咖啡酒': 'bg-amber-900',
  '香槟': 'bg-yellow-200',
  '汤力水': 'bg-blue-50',
  '苏打水': 'bg-cyan-50',
  '干姜水': 'bg-amber-50',
  '可乐': 'bg-amber-950',
  '雪碧': 'bg-green-50',
  '橙汁': 'bg-orange-400',
  '菠萝汁': 'bg-yellow-300',
  '番茄汁': 'bg-red-400',
  '酸梅汁': 'bg-amber-700',
  '柠檬汁': 'bg-yellow-100',
  '牛奶': 'bg-white',
  '咖啡': 'bg-amber-800',
  '冰块': 'bg-blue-100',
};

export default function BartenderStation({ drink, onComplete, onExit }: BartenderStationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [glassContents, setGlassContents] = useState<string[]>([]);
  const [liquidLevel, setLiquidLevel] = useState(0);
  const [, setShowTip] = useState(true);

  const currentStepData = drink.steps[currentStep];
  const isCompleted = currentStep >= drink.steps.length;

  const handleIngredientClick = useCallback((ingredient: string) => {
    if (isCompleted) return;

    if (currentStepData.ingredient === ingredient) {
      // 正确步骤
      setError(null);
      setCompletedSteps(prev => [...prev, currentStepData]);
      setGlassContents(prev => [...prev, ingredient]);

      // 增加液面高度
      if (currentStepData.action === 'add') {
        setLiquidLevel(prev => Math.min(prev + 25, 100));
      }

      setCurrentStep(prev => prev + 1);
      setShowTip(true);
    } else {
      // 错误步骤
      setError(`提示: 当前需要 ${currentStepData.ingredient || '完成特定操作'}`);
      setTimeout(() => setError(null), 2000);
    }
  }, [currentStep, currentStepData, isCompleted]);

  const handleStir = useCallback(() => {
    if (isCompleted) return;

    if (currentStepData.action === 'stir') {
      setError(null);
      setCompletedSteps(prev => [...prev, currentStepData]);
      setCurrentStep(prev => prev + 1);
      setShowTip(true);
    } else {
      setError('现在不需要搅拌');
      setTimeout(() => setError(null), 2000);
    }
  }, [currentStep, currentStepData, isCompleted]);

  const handleShake = useCallback(() => {
    if (isCompleted) return;

    if (currentStepData.action === 'shake') {
      setError(null);
      setCompletedSteps(prev => [...prev, currentStepData]);
      setCurrentStep(prev => prev + 1);
      setShowTip(true);
    } else {
      setError('现在不需要摇匀');
      setTimeout(() => setError(null), 2000);
    }
  }, [currentStep, currentStepData, isCompleted]);

  const handlePour = useCallback(() => {
    if (isCompleted) return;

    if (currentStepData.action === 'pour') {
      setError(null);
      setCompletedSteps(prev => [...prev, currentStepData]);
      setCurrentStep(prev => prev + 1);
      setShowTip(true);
    } else {
      setError('现在不需要倒出');
      setTimeout(() => setError(null), 2000);
    }
  }, [currentStep, currentStepData, isCompleted]);

  const calculateScore = () => {
    const baseScore = 100;
    const stepScore = baseScore / drink.steps.length;
    return Math.round(completedSteps.length * stepScore);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] p-8 bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl">
        <div className="text-center">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">完成!</h2>
          <p className="text-xl text-slate-300 mb-2">{drink.name}</p>
          <p className="text-lg text-slate-400 mb-6">{drink.nameEn}</p>

          <div className="bg-slate-700 rounded-xl p-6 mb-6">
            <p className="text-slate-400 mb-2">得分</p>
            <p className="text-5xl font-bold text-yellow-400">{calculateScore()}</p>
          </div>

          <div className="space-y-2 mb-6 text-left max-w-md">
            <p className="text-slate-400 text-sm">制作步骤:</p>
            {completedSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>{step.tip}</span>
              </div>
            ))}
          </div>

          {drink.tips.length > 0 && (
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-4 mb-6 text-left max-w-md">
              <p className="text-amber-400 text-sm font-medium mb-2">注意事项:</p>
              {drink.tips.map((tip, idx) => (
                <p key={idx} className="text-amber-200/80 text-sm">• {tip}</p>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => onComplete(calculateScore())}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
            >
              确认
            </button>
            <button
              onClick={onExit}
              className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-xl font-medium transition-colors"
            >
              返回菜单
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 border-b border-slate-700">
        <button
          onClick={onExit}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← 返回
        </button>
        <div className="text-center">
          <h2 className="text-white font-semibold">{drink.name}</h2>
          <p className="text-slate-400 text-sm">{drink.nameEn}</p>
        </div>
        <div className="text-slate-400 text-sm">
          步骤 {currentStep + 1}/{drink.steps.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-2">
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep / drink.steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex relative">
        {/* Glass Visualization */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Glass */}
            <div className="relative w-32 h-48 border-4 border-slate-400/30 rounded-b-3xl rounded-t-lg bg-slate-800/30 backdrop-blur-sm overflow-hidden">
              {/* Liquid */}
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out"
                style={{ height: `${liquidLevel}%` }}
              >
                {glassContents.map((content, idx) => (
                  <div
                    key={idx}
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
                      glassColors[content] || 'bg-blue-400'
                    }`}
                    style={{
                      height: `${100 / glassContents.length}%`,
                      bottom: `${(idx * 100) / glassContents.length}%`,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>

              {/* Garnishes */}
              {glassContents.includes('柠檬片') && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-500" />
              )}
              {glassContents.includes('薄荷叶') && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full" />
              )}
              {glassContents.includes('樱桃') && (
                <div className="absolute top-2 left-2 w-4 h-4 bg-red-500 rounded-full" />
              )}
              {glassContents.includes('搅拌棒') && (
                <div className="absolute top-0 left-1/2 w-1 h-16 bg-slate-400 -translate-x-1/2 rotate-12" />
              )}
            </div>

            {/* Glass Reflection */}
            <div className="absolute top-2 left-2 w-2 h-32 bg-white/10 rounded-full" />
          </div>
        </div>

        {/* Ingredients Panel */}
        <div className="w-48 p-4 bg-slate-800/50">
          <p className="text-slate-400 text-sm mb-3">原料选择</p>
          <div className="space-y-2">
            {drink.ingredients.map((ingredient) => {
              const isUsed = glassContents.includes(ingredient);
              const isCurrent = currentStepData.ingredient === ingredient;

              return (
                <button
                  key={ingredient}
                  onClick={() => handleIngredientClick(ingredient)}
                  disabled={isUsed}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    isUsed
                      ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                      : isCurrent
                      ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500 animate-pulse'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  {ingredientIcons[ingredient] || <GlassWater className="w-6 h-6" />}
                  <span className="text-sm">{ingredient}</span>
                </button>
              );
            })}

            {/* Action Buttons */}
            {drink.steps.some(s => s.action === 'stir') && (
              <button
                onClick={handleStir}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  currentStepData.action === 'stir'
                    ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500 animate-pulse'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                <RefreshCw className="w-6 h-6" />
                <span className="text-sm">搅拌</span>
              </button>
            )}
            {drink.steps.some(s => s.action === 'shake') && (
              <button
                onClick={handleShake}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  currentStepData.action === 'shake'
                    ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500 animate-pulse'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                <Flame className="w-6 h-6" />
                <span className="text-sm">摇匀</span>
              </button>
            )}
            {drink.steps.some(s => s.action === 'pour') && (
              <button
                onClick={handlePour}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  currentStepData.action === 'pour'
                    ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500 animate-pulse'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                <GlassWater className="w-6 h-6" />
                <span className="text-sm">过滤倒出</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Step Tip */}
      <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700">
        {error ? (
          <div className="flex items-center gap-2 text-red-400">
            <XCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
              {currentStep + 1}
            </div>
            <div>
              <p className="text-white font-medium">{currentStepData.tip}</p>
              {currentStepData.amount && (
                <p className="text-slate-400 text-sm mt-1">用量: {currentStepData.amount}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
