import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Chatbot = () => {
  const [tickets, setTickets] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem('token'); // <-- GET TOKEN FROM LOCALSTORAGE
    
  const fetchTickets = async () => {
    const token = localStorage.getItem('token'); // ✅ Make sure this line exists here
  
    console.log('🔐 Frontend token from localStorage:', token);
  
    try {
      const res = await axios.get('http://localhost:5000/api/tickets/user', {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Now token is correctly pulled
        },
      });
      setTickets(res.data);
    } catch (err) {
      console.error('❌ Error fetching tickets', err);
      toast.error('Failed to fetch tickets');
    }
  };
  

  const handleSend = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/tickets',
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- SET HEADER
          },
        }
      );
      setInput('');
      fetchTickets();
    } catch (err) {
      console.error('Error sending ticket', err);
      toast.error('Failed to submit ticket');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Chatbot - Submit a Ticket</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border p-2 rounded-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Send
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Your Tickets</h3>
        <ul className="space-y-2">
          {tickets.map((t) => (
            <li key={t._id} className="bg-gray-100 p-3 rounded-xl">
              {t.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chatbot;
