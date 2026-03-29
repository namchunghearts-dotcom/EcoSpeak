export interface EcoZone {
  id: string;
  name: string;
  color: string;
  icon: string;
  vocab: {
    word: string;
    translation: string;
    example: string;
    image: string;
  }[];
}

export const ECO_ZONES: EcoZone[] = [
  {
    id: 'forest',
    name: 'Forest',
    color: 'bg-green-400',
    icon: '🌲',
    vocab: [
      { word: 'Forest', translation: 'Rừng', example: 'The forest has many green trees.', image: 'https://picsum.photos/seed/forest/400/300' },
      { word: 'Tree', translation: 'Cây', example: 'The tree is very tall.', image: 'https://picsum.photos/seed/tree/400/300' },
      { word: 'Mushroom', translation: 'Nấm', example: 'I see a red mushroom.', image: 'https://picsum.photos/seed/mushroom/400/300' },
      { word: 'Leaf', translation: 'Lá', example: 'The leaf is green.', image: 'https://picsum.photos/seed/leaf/400/300' },
    ]
  },
  {
    id: 'volcano',
    name: 'Volcano',
    color: 'bg-red-400',
    icon: '🌋',
    vocab: [
      { word: 'Volcano', translation: 'Núi lửa', example: 'Red lava flows from the volcano.', image: 'https://picsum.photos/seed/volcano/400/300' },
      { word: 'Lava', translation: 'Dung nham', example: 'Lava is very hot.', image: 'https://picsum.photos/seed/lava/400/300' },
      { word: 'Mountain', translation: 'Núi', example: 'The mountain is high.', image: 'https://picsum.photos/seed/mountain/400/300' },
      { word: 'Smoke', translation: 'Khói', example: 'Smoke comes from the volcano.', image: 'https://picsum.photos/seed/smoke/400/300' },
    ]
  },
  {
    id: 'ocean',
    name: 'Ocean',
    color: 'bg-blue-400',
    icon: '🌊',
    vocab: [
      { word: 'Ocean', translation: 'Đại dương', example: 'The ocean is blue.', image: 'https://picsum.photos/seed/ocean/400/300' },
      { word: 'Beach', translation: 'Bãi biển', example: 'I like playing on the beach.', image: 'https://picsum.photos/seed/beach/400/300' },
      { word: 'Island', translation: 'Hòn đảo', example: 'The island is in the middle of the sea.', image: 'https://picsum.photos/seed/island/400/300' },
      { word: 'Sand', translation: 'Cát', example: 'The sand is warm.', image: 'https://picsum.photos/seed/sand/400/300' },
    ]
  },
  {
    id: 'jungle',
    name: 'Jungle',
    color: 'bg-yellow-400',
    icon: '🐒',
    vocab: [
      { word: 'Jungle', translation: 'Rừng già', example: 'The monkey swings in the jungle trees.', image: 'https://picsum.photos/seed/jungle/400/300' },
      { word: 'River', translation: 'Con sông', example: 'The river is long.', image: 'https://picsum.photos/seed/river/400/300' },
      { word: 'Monkey', translation: 'Con khỉ', example: 'The monkey is funny.', image: 'https://picsum.photos/seed/monkey/400/300' },
      { word: 'Amazon', translation: 'Rừng Amazon', example: 'Amazon is a big jungle.', image: 'https://picsum.photos/seed/amazon/400/300' },
    ]
  }
];
