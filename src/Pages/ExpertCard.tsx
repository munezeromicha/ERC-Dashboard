import { useState, useEffect } from "react";
import ExpertCards from "../components/Cards/ExpertCards";
import Layout from "./Layout";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Modal from "../components/Modal/Modal";

interface Card {
  _id: string;
  title: string;
  content: string;
}

function ExpertCard() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://wizzy-africa-backend.onrender.com/api/expertise-cards"
        );
        setCards(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch cards");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCards();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://wizzy-africa-backend.onrender.com/api/expertise-cards/${id}`);
      setCards(cards.filter((card: { _id: string }) => card._id !== id));
      toast.success("Card deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete card");
    }
  };


  return (
    <div className="flex h-screen overflow-hidden">
      <Layout />
      <div className="w-full md:ml-[40px] flex-1 overflow-y-auto p-4 md:p-6">
        <Toaster position="top-right" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <ExpertCards
            cards={cards}
            onDelete={handleDelete}
            onReadMore={(card) => {
              setSelectedCard(card);
              setIsModalOpen(true);
            }}
            loading={loading}
          />
        </div>

        {isModalOpen && selectedCard && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedCard.title}
            content={selectedCard.content}
          />
        )}
      </div>
    </div>
  );
}

export default ExpertCard;
