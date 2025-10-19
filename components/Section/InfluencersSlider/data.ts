type Slide = {
  id: number;
  content: string;
  imageUrl: string;
  name: string;
}

const slidesData: Slide[] = [
  { id: 1, content: 'Slide 1', imageUrl: 'https://picsum.photos/seed/picsum1/300/400', name: 'Polynette' },
  { id: 1, content: 'Slide 1', imageUrl: 'https://picsum.photos/seed/picsum1/300/400', name: 'Fana' },
  { id: 1, content: 'Slide 1', imageUrl: 'https://picsum.photos/seed/picsum1/300/400', name: 'Yao_ag' },
  { id: 1, content: 'Slide 1', imageUrl: 'https://picsum.photos/seed/picsum1/300/400', name: 'MarwanMC9' },
  { id: 1, content: 'Slide 1', imageUrl: 'https://picsum.photos/seed/picsum1/300/400', name: `Lola 'Evileye'` },
];

export { slidesData, type Slide };