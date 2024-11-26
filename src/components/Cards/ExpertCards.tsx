import { useNavigate } from 'react-router-dom';

interface Card {
  _id: string;
  title: string;
  content: string;
}

function ExpertCards({ 
  cards, 
  onDelete, 
  onReadMore, 
  loading = false
}: { 
  cards: Card[];
  onDelete: (id: string) => void;
  onReadMore: (card: Card) => void;
  loading?: boolean;
}) {
  const navigate = useNavigate();
  
  const truncateContent = (content: string) => {
    const stripHtmlTags = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "");
    const plainText = stripHtmlTags(content);
    return plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;
  };

  if (loading) {
    return (
      <>
        {[1, 2, 3].map((index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {cards.map((card) => (
        <div key={card._id} className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-lg mb-2">{card.title}</h3>
          <div className="mb-4">
            {truncateContent(card.content)}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onReadMore(card)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Read More
            </button>
            <button
              onClick={() => navigate(`/newCard`, { state: { card } })}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => onDelete(card._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ExpertCards;