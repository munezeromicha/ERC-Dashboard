import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface Card {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

interface SelectedCard {
  isOpen: boolean;
  card: Card | null;
}

const CardMainComponent: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<SelectedCard>({
    isOpen: false,
    card: null,
  });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to view publications");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }
      const response = await fetch(
        "https://wizzy-africa-backend.onrender.com/api/publication-cards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setCards(data);
      } else if (data.data && Array.isArray(data.data)) {
        setCards(data.data);
      } else {
        console.error("Unexpected API response format:", data);
        toast.error("Invalid data format received");
        setCards([]);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to load publications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadMore = (card: Card) => {
    setSelectedCard({ isOpen: true, card });
  };

  const handleCloseModal = () => {
    setSelectedCard({ isOpen: false, card: null });
  };

  const handleUpdate = (card: Card) => {
    if (!card._id) {
      console.error("Card ID is undefined:", card);
      toast.error("Card ID is missing");
      return;
    }
    navigate(`/newArticles/${card._id}`, {
      state: { cardData: card },
    });
  };

  const handleDelete = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to delete publications");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }

      const response = await fetch(
        `https://wizzy-africa-backend.onrender.com/api/publication-cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCards(cards.filter((card) => card._id !== cardId));
      toast.success("Publication deleted successfully");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete publication");
    }
  };

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#85929e" highlightColor="#85929e">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Skeleton height={200} />
                <div className="p-4">
                  <Skeleton height={30} width="100%" />
                  <Skeleton count={3} />
                  <div className="flex justify-between items-center mt-4">
                    <Skeleton width={100} />
                    <Skeleton width={100} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SkeletonTheme>
    );
  }


  return (
    <>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#363636",
        },
      }}
    />
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {cards.map((card) => (
          <div
            key={card._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-500"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <div
                className="text-gray-600 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: card.content }}
              />

              <div className="flex flex-wrap gap-2 items-center mt-4">
                <button
                  onClick={() => handleReadMore(card)}
                  className="flex-1 sm:flex-none items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Read More
                </button>
                <button
                  onClick={() => handleDelete(card._id)}
                  type="button"
                  className="flex-1 sm:flex-none items-center justify-center text-white bg-red-700 hover:bg-red-800 transition-colors duration-300 rounded-lg px-4 py-2"
                >
                  <MdDeleteForever size="20px" className="inline mr-1" />
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate(card)}
                  className="flex-1 sm:flex-none items-center justify-center text-white bg-green-500 hover:bg-green-800 transition-colors duration-300 rounded-lg px-4 py-2"
                >
                  <MdEdit size="20px" className="inline mr-1" />
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}

        {cards.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No publications found
          </div>
        )}
      </div>
    </div>

    {selectedCard.isOpen && selectedCard.card && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative m-4">
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold">{selectedCard.card.title}</h2>
            <button
              onClick={handleCloseModal}
              className="text-white bg-red-700 hover:bg-red-800 transition-colors duration-300 rounded-lg px-3 py-1 sm:px-4 sm:py-2"
            >
              Close
            </button>
          </div>
          <div className="p-4 sm:p-6">
            <div className="mb-4">
              <img
                src={selectedCard.card.image}
                alt={selectedCard.card.title}
                className="w-full h-48 sm:h-64 object-cover rounded-lg"
              />
            </div>
            <div
              className="prose max-w-none prose-sm sm:prose-base"
              dangerouslySetInnerHTML={{ __html: selectedCard.card.content }}
            />
          </div>
        </div>
      </div>
    )}
  </>
);
};
export default CardMainComponent;
