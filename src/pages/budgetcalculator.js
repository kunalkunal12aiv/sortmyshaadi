import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateVenueRecommendations } from '../utils/budgetcalculations';
import VenueRecommendations from '../components/budget_calculator/VenueRecommendations';
import { getCities, saveChat, getUserChats, deleteChat } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import { FiEdit2, FiTrash2, FiClock } from 'react-icons/fi';
import VenueFilters from '../components/VenueFilters';

function BudgetCalculator() {
  const { currentUser } = useAuth();
  const [cities, setCities] = useState([]);
  const [previousChats, setPreviousChats] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [isViewingPreviousChat, setIsViewingPreviousChat] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    roomPriceRange: { min: 0, max: 20000 },
    capacityRange: { min: 0, max: 2000 },
    selectedTags: [],
    selectedCity: ''
  });
  const [allVenues, setAllVenues] = useState([]);

  const questions = [
    {
      key: 'city',
      question: 'Which city are you interested in?',
      type: 'select',
      options: cities,
      validate: (value) => {
        if (!value) return 'Please select a city';
        return null;
      }
    },
    { 
      key: 'totalBudget', 
      question: 'What is your total wedding budget (₹)?',
      validate: (value) => {
        const num = Number(value);
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter a valid budget amount (e.g., 1000000)';
        }
        return null;
      }
    },
    { 
      key: 'guestCount', 
      question: 'How many guests are you expecting at the wedding?',
      validate: (value) => {
        const num = Number(value);
        if (!value || isNaN(num) || num <= 0 || !Number.isInteger(num)) {
          return 'Please enter a valid number of guests (e.g., 200)';
        }
        return null;
      }
    },
    { 
      key: 'stayingGuests', 
      question: 'How many guests need accommodation?',
      validate: (value) => {
        const num = Number(value);
        const totalGuests = Number(answers.guestCount);
        if (!value || isNaN(num) || num <= 0 || !Number.isInteger(num)) {
          return 'Please enter a valid number of staying guests (e.g., 50)';
        }
        if (num > totalGuests) {
          return `Number cannot be greater than total guests (${totalGuests})`;
        }
        return null;
      }
    },
    { 
      key: 'checkInDate', 
      question: 'What is your check-in date?',
      validate: (value) => {
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!value || isNaN(date.getTime()) || date < today) {
          return 'Please select a future date';
        }
        return null;
      }
    },
    { 
      key: 'checkOutDate', 
      question: 'What is your check-out date?',
      validate: (value) => {
        const checkIn = new Date(answers.checkInDate);
        const checkOut = new Date(value);
        if (!value || isNaN(checkOut.getTime()) || checkOut <= checkIn) {
          return 'Check-out date must be after check-in date';
        }
        return null;
      }
    }
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: "Hello, I'm your AI budget assistant. Let's start with a few questions." },
    { sender: 'ai', text: questions[0].question }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const TypingIndicator = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.span 
          key={i}
          className="w-2 h-2 bg-gray-200 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const citiesList = await getCities();
        setCities(citiesList);

        if (currentUser) {
          const userChats = await getUserChats(currentUser.uid);
          setPreviousChats(userChats);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadChatHistory();
    }
  }, [currentUser]);

  const loadChatHistory = async () => {
    try {
      const userChats = await getUserChats(currentUser.uid);
      if (userChats.length > 0) {
        setPreviousChats(userChats.map(chat => ({
          ...chat,
          createdAt: chat.createdAt?.toDate() || new Date(),
          lastUpdated: chat.lastUpdated?.toDate() || new Date()
        })));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      // Don't throw, just show empty state
      setPreviousChats([]);
    }
  };

  const handleChatSubmit = async () => {
    if (!userInput.trim()) return;
    
    const currentQuestion = questions[currentStep];
    const validationError = currentQuestion.validate(userInput);
    
    if (validationError) {
      setChatMessages(prev => [
        ...prev, 
        { sender: 'user', text: userInput },
        { sender: 'ai', text: validationError }
      ]);
      setUserInput('');
      return;
    }

    const newMessages = [...chatMessages, { sender: 'user', text: userInput }];
    const newAnswers = { ...answers, [currentQuestion.key]: userInput.trim() };

    setChatMessages(newMessages);
    setAnswers(newAnswers);
    setUserInput('');

    if (currentStep < questions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setIsTyping(true);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'ai', text: questions[nextStep].question }]);
        setIsTyping(false);
      }, 1000);
    } else {
      const checkIn = new Date(answers.checkInDate || userInput);
      const checkOut = new Date(answers.checkOutDate || userInput);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const fullAnswers = { ...answers, stayDuration: diffDays };
      setLoading(true);
      try {
        const results = await calculateVenueRecommendations(fullAnswers);
        setRecommendations(results);

        if (currentUser) {
          await saveChat(currentUser.uid, {
            messages: newMessages,
            answers: newAnswers,
            recommendations: results
          });
        }

        setChatMessages(prev => [
          ...prev,
          { sender: 'ai', text: 'Here are your budget recommendations:' }
        ]);
        if (resultsRef.current) {
          const y = resultsRef.current.getBoundingClientRect().top + window.pageYOffset - 50;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setChatMessages(prev => [
          ...prev,
          { sender: 'ai', text: 'Sorry, something went wrong. ' + (error.message || '') }
        ]);
      }
      setLoading(false);
    }
  };

  const updateRecommendations = async (newAnswers) => {
    try {
      setLoading(true);
      const results = await calculateVenueRecommendations(newAnswers);
      
      // Update all venues for filters
      const allVenues = [
        ...(results.recommendedVenues || []),
        ...(results.otherVenues || []),
        ...(results.alternativeVenues || [])
      ];

      // Update filter ranges based on actual data
      setFilters(prev => ({
        ...prev,
        priceRange: {
          min: Math.min(...allVenues.map(v => v.pricePerPlate)),
          max: Math.max(...allVenues.map(v => v.pricePerPlate))
        },
        capacityRange: {
          min: Math.min(...allVenues.map(v => v.maxGuestCapacity)),
          max: Math.max(...allVenues.map(v => v.maxGuestCapacity))
        }
      }));

      setRecommendations(results);
      return results;
    } catch (error) {
      console.error('Error updating recommendations:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (messageIndex) => {
    const message = chatMessages[messageIndex];
    if (message.sender === 'user') {
      setEditingMessageId(messageIndex);
      setEditInput(message.text);
    }
  };

  const handleEditSubmit = async (messageIndex) => {
    const newMessages = [...chatMessages];
    newMessages[messageIndex].text = editInput;
    setChatMessages(newMessages);
    setEditingMessageId(null);
    setEditInput('');

    // Update answers and recalculate recommendations
    if (messageIndex % 2 === 1) {
      const questionIndex = Math.floor(messageIndex / 2);
      const questionKey = questions[questionIndex].key;
      const newAnswers = { ...answers, [questionKey]: editInput };
      setAnswers(newAnswers);

      // Recalculate recommendations
      try {
        const results = await updateRecommendations(newAnswers);
        if (currentUser) {
          await saveChat(currentUser.uid, {
            messages: newMessages,
            answers: newAnswers,
            recommendations: results
          });
        }
      } catch (error) {
        console.error('Error updating recommendations:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUndo = async (messageIndex) => {
    // Remove messages up to the selected point
    const newMessages = chatMessages.slice(0, messageIndex + 1);
    setChatMessages(newMessages);

    // Recalculate current step and answers
    const newStep = Math.floor(messageIndex / 2);
    setCurrentStep(newStep);

    const newAnswers = {};
    for (let i = 0; i < newStep; i++) {
      const questionKey = questions[i].key;
      newAnswers[questionKey] = answers[questionKey];
    }
    setAnswers(newAnswers);

    // Save updated state to Firebase
    if (currentUser) {
      await saveChat(currentUser.uid, {
        messages: newMessages,
        answers: newAnswers,
        recommendations: null
      });
    }

    // Clear recommendations if they exist
    setRecommendations(null);
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
      // Remove the chat from the local state
      setPreviousChats(prev => prev.filter(chat => chat.id !== chatId));
      // If we're viewing the deleted chat, start a new one
      if (isViewingPreviousChat) {
        startNewChat();
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      alert('Failed to delete chat. Please try again.');
    }
  };

  const startNewChat = () => {
    setCurrentStep(0);
    setAnswers({});
    setChatMessages([
      { sender: 'ai', text: "Hello, I'm your AI budget assistant. Let's start with a few questions." },
      { sender: 'ai', text: questions[0].question }
    ]);
    setRecommendations(null);
    setIsViewingPreviousChat(false);
    setUserInput('');
  };

  const loadPreviousChat = (chat) => {
    setChatMessages(chat.messages);
    setAnswers(chat.answers);
    setRecommendations(chat.recommendations);
    setCurrentStep(questions.length);
    setIsViewingPreviousChat(true);
  };

  const handleFilterChange = (newFilters) => {
    console.log('New filters:', newFilters); // For debugging
    setFilters(newFilters);
  };

  const renderChatHistory = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-100">Previous Conversations</h2>
        {isViewingPreviousChat && (
          <button
            onClick={startNewChat}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Start New Chat
          </button>
        )}
      </div>
      
      {previousChats.length === 0 ? (
        <div className="text-center p-4 bg-gray-700 rounded-lg">
          <p className="text-gray-300">No previous conversations found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {previousChats.map((chat) => (
            <div key={chat.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-gray-100 font-medium">
                    {chat.answers.city || 'Location not specified'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Budget: ₹{chat.answers.totalBudget?.toLocaleString()} | 
                    Guests: {chat.answers.guestCount}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => loadPreviousChat(chat)}
                    className="text-pink-400 hover:text-pink-300 transition"
                    title="Load this chat"
                  >
                    <FiClock size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this chat?')) {
                        handleDeleteChat(chat.id);
                      }
                    }}
                    className="text-red-400 hover:text-red-300 transition"
                    title="Delete chat"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                {new Date(chat.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {currentUser && renderChatHistory()}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100" style={{ fontFamily: 'DM Serif Display, serif' }}>
            {isViewingPreviousChat ? 'Previous Chat' : 'Wedding Venue Finder Chat'}
          </h1>
          {isViewingPreviousChat && (
            <button
              onClick={startNewChat}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Start New Chat
            </button>
          )}
        </div>

        <div className="bg-gray-700 rounded-xl shadow-lg p-6 space-y-4 mb-8">
          {chatMessages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: msg.sender === 'ai' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative group ${msg.sender === 'ai' ? "text-left" : "text-right"}`}
            >
              <div className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === 'ai' ? "bg-gray-600 text-gray-100" : "bg-pink-600 text-white"
              }`}>
                {editingMessageId === i ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="bg-transparent border-b border-white focus:outline-none"
                    />
                    <button
                      onClick={() => handleEditSubmit(i)}
                      className="text-white hover:text-gray-200"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
              {msg.sender === 'user' && !editingMessageId && (
                <div className="absolute top-0 -left-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(i)}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleUndo(i)}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center"
            >
              <TypingIndicator />
            </motion.div>
          )}
        </div>

        {!loading && currentStep < questions.length && (
          <div className="flex space-x-4">
            {questions[currentStep].type === 'select' ? (
              <select
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select a city</option>
                {questions[currentStep].options.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            ) : questions[currentStep].key.includes('Date') ? (
              <ReactDatePicker
                selected={userInput ? new Date(userInput) : null}
                onChange={(date) => {
                  const formattedDate = date.toISOString().split('T')[0];
                  setUserInput(formattedDate);
                }}
                minDate={
                  questions[currentStep].key === 'checkOutDate' && answers.checkInDate
                    ? new Date(answers.checkInDate)
                    : new Date()
                }
                dateFormat="yyyy-MM-dd"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholderText="Select a date"
              />
            ) : (
              <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder={`Type your answer... (${questions[currentStep].key})`}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleChatSubmit();
                  }
                }}
              />
            )}
            <button onClick={handleChatSubmit} className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
              Send
            </button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 bg-pink-600 rounded-full"
            ></motion.div>
          </div>
        )}

        {recommendations && (
          <div className="mt-8 space-y-6">
            <VenueFilters
              venues={[
                ...(recommendations.recommendedVenues || []),
                ...(recommendations.otherVenues || []),
                ...(recommendations.alternativeVenues || [])
              ]}
              initialFilters={filters}
              onFilterChange={handleFilterChange}
            />
            <VenueRecommendations 
              recommendations={recommendations}
              filters={filters}
            />
          </div>
        )}

        <div ref={resultsRef} className="hidden"></div>
      </div>
    </div>
  );
}

export default BudgetCalculator;
