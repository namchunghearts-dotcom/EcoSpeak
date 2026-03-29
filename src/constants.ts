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
      { word: 'Forest', translation: 'Rừng', example: 'The forest has many green trees.', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&h=300' },
      { word: 'Tree', translation: 'Cây', example: 'The tree is very tall.', image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&h=300' },
      { word: 'Mushroom', translation: 'Nấm', example: 'I see a red mushroom.', image: 'https://images.unsplash.com/photo-1504624244670-30397044683d?auto=format&fit=crop&w=400&h=300' },
      { word: 'Leaf', translation: 'Lá', example: 'The leaf is green.', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&h=300' },
    ]
  },
  {
    id: 'volcano',
    name: 'Volcano',
    color: 'bg-red-400',
    icon: '🌋',
    vocab: [
      { word: 'Volcano', translation: 'Núi lửa', example: 'Red lava flows from the volcano.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=400&h=300' },
      { word: 'Lava', translation: 'Dung nham', example: 'Lava is very hot.', image: 'https://images.unsplash.com/photo-1531846802986-4942a5c3dd08?auto=format&fit=crop&w=400&h=300' },
      { word: 'Mountain', translation: 'Núi', example: 'The mountain is high.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&h=300' },
      { word: 'Smoke', translation: 'Khói', example: 'Smoke comes from the volcano.', image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=400&h=300' },
    ]
  },
  {
    id: 'ocean',
    name: 'Ocean',
    color: 'bg-blue-400',
    icon: '🌊',
    vocab: [
      { word: 'Ocean', translation: 'Đại dương', example: 'The ocean is blue.', image: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&w=400&h=300' },
      { word: 'Beach', translation: 'Bãi biển', example: 'I like playing on the beach.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=300' },
      { word: 'Island', translation: 'Hòn đảo', example: 'The island is in the middle of the sea.', image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=400&h=300' },
      { word: 'Sand', translation: 'Cát', example: 'The sand is warm.', image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=400&h=300' },
    ]
  },
  {
    id: 'jungle',
    name: 'Jungle',
    color: 'bg-yellow-400',
    icon: '🐒',
    vocab: [
      { word: 'Jungle', translation: 'Rừng già', example: 'The monkey swings in the jungle trees.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&h=300' },
      { word: 'River', translation: 'Con sông', example: 'The river is long.', image: 'https://images.unsplash.com/photo-1437333306196-0839588549d2?auto=format&fit=crop&w=400&h=300' },
      { word: 'Monkey', translation: 'Con khỉ', example: 'The monkey is funny.', image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=400&h=300' },
      { word: 'Amazon', translation: 'Rừng Amazon', example: 'Amazon is a big jungle.', image: 'https://images.unsplash.com/photo-1549543026-aef30294a6ce?auto=format&fit=crop&w=400&h=300' },
    ]
  }
];
