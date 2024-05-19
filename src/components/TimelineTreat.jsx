import React from "react";

const TreatmentSchedule = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">LỊCH TRÌNH ĐIỀU TRỊ</h1>

      {/* Personal Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Thông tin cá nhân:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Tên:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block font-medium">Tuổi:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block font-medium">Giới tính:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" />
          </div>
        </div>
      </div>

      {/* Treatment Schedule */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Lịch trình điều trị:</h2>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Ngày:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium">Thời gian:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Tên cuộc hẹn/điều trị:
                </label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block font-medium">Thông tin chi tiết:</label>
              <textarea className="w-full border-gray-300 rounded-md"></textarea>
            </div>
          </div>
        ))}
      </div>

      {/* Medication Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Thông tin về thuốc:</h2>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Tên thuốc:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium">Liều lượng:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium">Thời gian dùng:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Thông tin liên lạc:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Bác sĩ:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" />
            <label className="block font-medium mt-2">Số điện thoại:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block font-medium">Nhân viên y tế:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" />
            <label className="block font-medium mt-2">Số điện thoại:</label>
            <input type="text" className="w-full border-gray-300 rounded-md" />
          </div>
        </div>
      </div>

      {/* Reminders and Alerts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Nhắc nhở và cảnh báo:</h2>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-2">
            <input
              type="text"
              className="w-full border-gray-300 rounded-md"
              placeholder="Thông điệp nhắc nhở/cảnh báo"
            />
          </div>
        ))}
      </div>

      {/* Notes and Attachments */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ghi chú và tài liệu:</h2>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-2">
            <input
              type="text"
              className="w-full border-gray-300 rounded-md"
              placeholder="Ghi chú/Tài liệu đính kèm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentSchedule;
