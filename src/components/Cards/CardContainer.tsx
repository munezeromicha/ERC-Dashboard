import React from 'react';
import Card from './CardComponent';

const CardContainer: React.FC = () => {
  const cardsData = [
    {
      title: 'NISR',
      description:
        'We offer a wide range of services to help you achieve a greater level of understanding from your...',
      link: '#',
    },
    {
      title: 'NISR',
      description:
        'We offer a wide range of services to help you achieve a greater level of understanding from your...',
      link: '#',
    },
    {
      title: 'NISR',
      description:
        'We offer a wide range of services to help you achieve a greater level of understanding from your...',
      link: '#',
    },
    {
      title: 'NISR',
      description:
        'We offer a wide range of services to help you achieve a greater level of understanding from your...',
      link: '#',
    },
    {
      title: 'NISR',
      description:
        'We offer a wide range of services to help you achieve a greater level of understanding from your...',
      link: '#',
    },
    {
      title: 'NISR',
      description:
        'We offer a wide range of services to help you achieve a greater level of understanding from your...',
      link: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-8">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          link={card.link}
        />
      ))}
    </div>
  );
};

export default CardContainer;
