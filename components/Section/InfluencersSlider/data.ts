type Slide = {
  id: number;
  content: string;
  imageUrl: string;
  backgroundUrl: string;
  name: string;
}

const slidesData: Slide[] = [
  { id: 1, content: 'Slide 1', imageUrl: '/images/talents/polynette-1.png', backgroundUrl: '/images/talents/polynette-2.png', name: 'Pollynette' },
  { id: 2, content: 'Slide 1', imageUrl: '/images/talents/fana-1.png', backgroundUrl: '/images/talents/fana-2.png', name: 'Fana' },
  { id: 3, content: 'Slide 1', imageUrl: '/images/talents/marwan-1.jpg', backgroundUrl: '/images/talents/marwan-2.jpg', name: 'MarwanMC9' },
  { id: 4, content: 'Slide 1', imageUrl: '/images/talents/lola-1.jpg', backgroundUrl: '/images/talents/lola-2.jpg', name: `Lola 'Evileye'` },
];

export { slidesData, type Slide };