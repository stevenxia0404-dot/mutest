export interface Step {
  id: number;
  action: 'add' | 'shake' | 'stir' | 'pour' | 'garnish';
  ingredient?: string;
  amount?: string;
  targetLevel?: number;
  tip: string;
}

export interface DrinkRecipe {
  id: string;
  name: string;
  nameEn: string;
  category: 'cocktail' | 'signature' | 'seasonal' | 'refreshing' | 'tea';
  glass: 'highball' | 'rock' | 'champagne' | 'mug';
  steps: Step[];
  tips: string[];
  ingredients: string[];
}

// 9款鸡尾酒调制（来自客舱服务作业指导手册 第195页）
export const drinks: DrinkRecipe[] = [
  {
    id: 'gin-tonic',
    name: '金汤力',
    nameEn: 'Gin Tonic',
    category: 'cocktail',
    glass: 'highball',
    ingredients: ['金酒', '汤力水', '冰块', '柠檬片'],
    steps: [
      { id: 1, action: 'add', ingredient: '冰块', tip: '杯中放冰块' },
      { id: 2, action: 'add', ingredient: '金酒', amount: '3/2 Oz', tip: '倒入金酒' },
      { id: 3, action: 'add', ingredient: '汤力水', tip: '注入汤力水' },
      { id: 4, action: 'garnish', ingredient: '柠檬片', tip: '柠檬片点缀，插入搅拌棒' },
    ],
    tips: ['服务时建议旅客在饮用前搅拌'],
  },
  {
    id: 'tom-collins',
    name: '汤姆卡林',
    nameEn: 'Tom Collins',
    category: 'cocktail',
    glass: 'highball',
    ingredients: ['金酒', '柠檬汁', '砂糖', '苏打水', '冰块', '柠檬片'],
    steps: [
      { id: 1, action: 'add', ingredient: '冰块', tip: '调酒壶里依次放冰块' },
      { id: 2, action: 'add', ingredient: '金酒', amount: '1/2 Oz', tip: '加入金酒' },
      { id: 3, action: 'add', ingredient: '柠檬汁', amount: '1 Oz', tip: '加入柠檬汁' },
      { id: 4, action: 'shake', tip: '加入砂糖摇匀' },
      { id: 5, action: 'pour', tip: '滤入已放置冰块的杯中' },
      { id: 6, action: 'add', ingredient: '苏打水', tip: '注入苏打水' },
      { id: 7, action: 'garnish', ingredient: '柠檬片', tip: '柠檬片点缀，插入搅拌棒' },
    ],
    tips: ['使用调酒壶摇匀后过滤倒入'],
  },
  {
    id: 'cuba-libra',
    name: '自由古巴',
    nameEn: 'Cuba Libra',
    category: 'cocktail',
    glass: 'highball',
    ingredients: ['朗姆酒', '可乐', '冰块', '柠檬片'],
    steps: [
      { id: 1, action: 'add', ingredient: '冰块', tip: '杯中放冰块' },
      { id: 2, action: 'add', ingredient: '朗姆酒', amount: '3/2 Oz', tip: '倒入朗姆酒' },
      { id: 3, action: 'add', ingredient: '可乐', tip: '注入可乐' },
      { id: 4, action: 'garnish', ingredient: '柠檬片', tip: '柠檬点缀，插入搅拌棒' },
    ],
    tips: ['服务时建议旅客在饮用前搅拌'],
  },
  {
    id: 'screwdriver',
    name: '螺丝钻',
    nameEn: 'Screwdriver',
    category: 'cocktail',
    glass: 'highball',
    ingredients: ['伏特加', '橙汁', '冰块', '柠檬片'],
    steps: [
      { id: 1, action: 'add', ingredient: '冰块', tip: '杯中放冰块' },
      { id: 2, action: 'add', ingredient: '伏特加', amount: '1 Oz', tip: '加入伏特加' },
      { id: 3, action: 'add', ingredient: '橙汁', amount: '3 Oz', tip: '再加入橙汁' },
      { id: 4, action: 'garnish', ingredient: '柠檬片', tip: '柠檬片点缀' },
    ],
    tips: ['使用长饮杯时插入搅拌棒'],
  },
  {
    id: 'absolute-ginger',
    name: '绝对干姜',
    nameEn: 'Absolute Ginger Ale',
    category: 'cocktail',
    glass: 'highball',
    ingredients: ['伏特加', '干姜水', '冰块', '柠檬角'],
    steps: [
      { id: 1, action: 'add', ingredient: '冰块', tip: '杯中放冰块' },
      { id: 2, action: 'add', ingredient: '伏特加', amount: '1 Oz', tip: '加入伏特加' },
      { id: 3, action: 'add', ingredient: '干姜水', amount: '3 Oz', tip: '注入干姜水' },
      { id: 4, action: 'garnish', ingredient: '柠檬角', tip: '柠檬角点缀，插入搅拌棒' },
    ],
    tips: ['服务时建议旅客在饮用前搅拌'],
  },
  {
    id: 'absolute-tonic',
    name: '绝对汤力',
    nameEn: 'Absolute Tonic',
    category: 'cocktail',
    glass: 'highball',
    ingredients: ['伏特加', '汤力水', '冰块', '柠檬角'],
    steps: [
      { id: 1, action: 'add', ingredient: '冰块', tip: '杯中放冰块' },
      { id: 2, action: 'add', ingredient: '伏特加', amount: '1 Oz', tip: '加入伏特加' },
      { id: 3, action: 'add', ingredient: '汤力水', amount: '3 Oz', tip: '注入汤力水' },
      { id: 4, action: 'garnish', ingredient: '柠檬角', tip: '柠檬角点缀，插入搅拌棒' },
    ],
    tips: ['服务时建议旅客在饮用前搅拌'],
  },
  {
    id: 'black-russian',
    name: '黑俄罗斯',
    nameEn: 'Black Russian',
    category: 'cocktail',
    glass: 'rock',
    ingredients: ['伏特加', '咖啡酒', '冰块', '樱桃'],
    steps: [
      { id: 1, action: 'add', ingredient: '冰块', tip: '杯中放冰块' },
      { id: 2, action: 'add', ingredient: '伏特加', amount: '1 Oz', tip: '加入伏特加' },
      { id: 3, action: 'add', ingredient: '咖啡酒', amount: '1/2 Oz', tip: '加入咖啡力娇酒' },
      { id: 4, action: 'garnish', ingredient: '樱桃', tip: '樱桃点缀' },
    ],
    tips: ['古典杯盛装'],
  },
  {
    id: 'white-russian',
    name: '白俄罗斯',
    nameEn: 'White Russian',
    category: 'cocktail',
    glass: 'rock',
    ingredients: ['伏特加', '咖啡酒', '牛奶', '冰块', '樱桃'],
    steps: [
      { id: 1, action: 'add', ingredient: '冰块', tip: '杯中放冰块' },
      { id: 2, action: 'add', ingredient: '伏特加', amount: '1 Oz', tip: '加入伏特加' },
      { id: 3, action: 'add', ingredient: '咖啡酒', amount: '1/2 Oz', tip: '加入咖啡力娇酒' },
      { id: 4, action: 'add', ingredient: '牛奶', amount: '1 Oz', tip: '注入牛奶' },
      { id: 5, action: 'garnish', ingredient: '樱桃', tip: '樱桃点缀' },
    ],
    tips: ['古典杯盛装'],
  },
  {
    id: 'mimosa',
    name: '含羞草',
    nameEn: 'Mimosa',
    category: 'cocktail',
    glass: 'champagne',
    ingredients: ['香槟', '橙汁'],
    steps: [
      { id: 1, action: 'add', ingredient: '香槟', amount: '50%', tip: '杯中倒入香槟（起泡酒）' },
      { id: 2, action: 'add', ingredient: '橙汁', amount: '50%', tip: '注入橙汁（无颗粒感的）' },
    ],
    tips: ['香槟杯盛装，比例各50%'],
  },
];

export const categories = [
  { id: 'cocktail', name: '鸡尾酒调制', color: 'bg-purple-500' },
  { id: 'signature', name: '匠心·醇享系列', color: 'bg-amber-500' },
  { id: 'seasonal', name: '四季·尝新系列', color: 'bg-green-500' },
  { id: 'refreshing', name: '清凉·提神系列', color: 'bg-cyan-500' },
  { id: 'tea', name: '冻干果茶', color: 'bg-orange-500' },
];
