import React, { useState } from "react";

const TreatmentSchedule = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg ">
      <h1 className="text-2xl font-bold mt-4">Recent Treatment Schedule</h1>

      {/* Personal Information */}
      <div className={` ${expanded ? 'mb-2' : 'mt-8'}`}>
        <h2 className="text-xl font-semibold mb-2">Personal Information:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Name:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" placeholder="John Doe" />
          </div>
          <div>
            <label className="block font-medium">Age:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" placeholder="30" />
          </div>
          <div>
            <label className="block font-medium">SSN:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" placeholder="123-45-6789" />
          </div>
          <div>
            <label className="block font-medium">Blood Type:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" placeholder="A+" />
          </div>
        </div>
      </div>


      {/* Treatment Schedule */}
      <div className={`mb-6 ${expanded ? '' : 'h-0 overflow-hidden'}`}>
        <h2 className="text-xl font-semibold mb-2">Treatment Schedule:</h2>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Date:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                  placeholder="2024-05-20"
                />
              </div>
              <div>
                <label className="block font-medium">Time:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                  placeholder="10:00 AM"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block font-medium">Appointment/Treatment Name:</label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-md"
                placeholder="Follow-up Checkup"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Medication Information */}
      <div className={`mb-6 ${expanded ? '' : 'h-0 overflow-hidden'}`}>
        <h2 className="text-xl font-semibold mb-2">Medication Information:</h2>
        {[...Array(1)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Medication Name:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                  placeholder="Aspirin"
                />
              </div>
              <div>
                <label className="block font-medium">Dosage:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                  placeholder="500mg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className={`mb-6 ${expanded ? '' : 'h-0 overflow-hidden'}`}>
        <h2 className="text-xl font-semibold mb-2">Contact Information:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Doctor:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" placeholder="Dr. Smith" />
          </div>
        </div>
      </div>

      {/* Reminders and Alerts */}
      <div className={`mb-6 ${expanded ? '' : 'h-0 overflow-hidden'}`}>
        <h2 className="text-xl font-semibold mb-2">Reminders and Alerts:</h2>
        {[...Array(1)].map((_, i) => (
          <div key={i} className="mb-2">
            <input
              type="text"
              className="w-full border-gray-300 rounded-md"
              placeholder="Take medication after meal."
            />
          </div>
        ))}
      </div>

      {/* Notes and Attachments */}
      <div className={`mb-6 ${expanded ? '' : 'h-0 overflow-hidden'}`}>
        <h2 className="text-xl font-semibold mb-2">Notes and Attachments:</h2>
        {[...Array(1)].map((_, i) => (
          <div key={i} className="mb-2">
            <input
              
              type="text"
              className="w-full border-gray-300 rounded-md"
              placeholder="Attach prescription document."
            />
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={toggleExpanded}
          className="text-blue-500 hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      </div>
    </div>
  );
};

export default TreatmentSchedule;
