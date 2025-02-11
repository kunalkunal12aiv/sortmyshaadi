import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'groupChats'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    try {
      await addDoc(collection(db, 'groupChats'), {
        websiteId: currentUser.uid, // Optionally limit chat to a website/couple
        text: chatMessage,
        user: currentUser.email,
        createdAt: serverTimestamp()
      });
      setChatMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Group Chat</h1>
      <div className="border rounded p-4 h-64 overflow-y-auto mb-4">
        {messages.map(msg => (
          <div key={msg.id} className="mb-2">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default GroupChat;
