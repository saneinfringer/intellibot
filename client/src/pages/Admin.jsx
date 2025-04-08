import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Admin = () => {
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState({});

  const fetchTickets = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.get('http://localhost:5000/api/tickets', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTickets(res.data);
    } catch (err) {
      toast.error('Failed to load tickets');
    }
  };

  const handleEditChange = (ticketId, value) => {
    setEditing((prev) => ({ ...prev, [ticketId]: value }));
  };

  const handleUpdate = async (ticketId) => {
    const response = editing[ticketId];
    if (!response) return toast.warn('Please enter a response');

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(
        `http://localhost:5000/api/tickets/${ticketId}`,
        { response, status: 'closed' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Response submitted!');
      fetchTickets();
    } catch (err) {
      toast.error('Failed to update ticket');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🛠️ Admin Dashboard - All Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found</p>
      ) : (
        <div className="space-y-6">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white border rounded-xl shadow-md p-4 space-y-3">
              <p><strong>User:</strong> {ticket.user?.name} ({ticket.user?.email})</p>
              <p><strong>Question:</strong> {ticket.message}</p>
              <p><strong>Status:</strong> <span className={ticket.status === 'closed' ? 'text-green-600' : 'text-yellow-600'}>{ticket.status}</span></p>
              <p><strong>Response:</strong> {ticket.response || <em className="text-gray-400">No response yet</em>}</p>

              <textarea
                rows={3}
                placeholder="Write your response..."
                value={editing[ticket._id] || ''}
                onChange={(e) => handleEditChange(ticket._id, e.target.value)}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleUpdate(ticket._id)}
                className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
              >
                Submit & Close
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
