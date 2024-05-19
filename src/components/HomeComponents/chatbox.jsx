
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faComments } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const keywords = {
    hours: ['hours', 'open'],
    doctor: ['doctor', 'book appointment'],
    emergency: ['emergency'],
    location: ['location', 'address'],
    services: ['services', 'treatments'],
    insurance: ['insurance', 'coverage'],
    billing: ['billing', 'payment'],
    records: ['records', 'patient records'],
    covid: ['covid', 'coronavirus'],
    feedback: ['feedback', 'suggestions'],
    appointmentCancel: ['cancel appointment', 'reschedule appointment'],
    pharmacy: ['pharmacy', 'prescription'],
    lab: ['lab', 'laboratory'],
  };
  
  const responses = {
    hours: 'Our hospital is open 24/7 for emergencies. General visiting hours are from 8 AM to 5 PM.',
    doctor: 'You can book an appointment with our doctors online or by calling our reception at (237) 681-812-255.',
    emergency: 'In case of an emergency, please call 911 or visit our emergency department immediately.',
    location: 'We are located at Hcmut.',
    services: 'We offer a wide range of services including general surgery, cardiology, orthopedics, and pediatrics. For a full list of services, please visit our website.',
    insurance: 'We accept a variety of insurance plans. Please contact our billing department at (237) 681-812-255 for more details about your specific insurance coverage.',
    billing: 'For billing and payment inquiries, please contact our billing office at (123) 456-7891. You can also pay your bills online through our patient portal.',
    records: 'To request your medical records, please contact our records department at (123) 456-7892 or visit our website to download the request form.',
    covid: 'For COVID-19 related information, including testing and vaccination, please visit our COVID-19 information page or call our helpline at (123) 456-7893.',
    feedback: 'We appreciate your feedback! Please email us at feedback@example.com with any suggestions or comments.',
    appointmentCancel: 'To cancel or reschedule your appointment, please call our reception at (237) 681-812-255 at least 24 hours in advance.',
    pharmacy: 'Our pharmacy is open during regular business hours to fulfill prescriptions issued by our doctors. Please visit the pharmacy counter for assistance.',
    lab: 'Our laboratory provides a wide range of diagnostic tests. Your doctor will provide you with a lab requisition form if any tests are necessary for your treatment.',
  };

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    for (const [key, value] of Object.entries(keywords)) {
      if (value.some(keyword => lowerCaseMessage.includes(keyword))) {
        return responses[key];
      }
    }
    return 'I am sorry, I did not understand your query. Can you please provide more details?';
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', content: input }]);
      setInput('');
      const botResponse = getBotResponse(input);
      console.log(botResponse);
      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { type: 'bot', content: botResponse }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className={`transition-all duration-300 ${isOpen ? 'w-80 h-96' : 'w-16 h-14'} bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg`}>
        {isOpen && (
          <>
            <div className="flex flex-col h-full">
              <div className="flex flex-col flex-grow p-4 overflow-y-auto bg-gray-100">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 p-2 rounded ${msg.type === 'user' ? 'bg-green-200 self-end' : 'bg-gray-300 self-start'}`}>
                    <div className="flex items-center">
                      {msg.type === 'bot' && <FontAwesomeIcon icon={faRobot} className="mr-2" />}
                      <span>{msg.content}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center border-t border-gray-300 p-2 bg-white">
                <input
                  type="text"
                  className="flex-grow p-2 border border-gray-300 rounded mr-2"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                />
                <button className="p-2 bg-green-500 text-white rounded" onClick={handleSendMessage}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </>
        )}
        {!isOpen && (
          <button
            className="w-full h-full flex items-center justify-center"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faComments} className="text-green-500 text-2xl" />
          </button>
        )}
      </div>
      {isOpen && (
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ChatBox;
