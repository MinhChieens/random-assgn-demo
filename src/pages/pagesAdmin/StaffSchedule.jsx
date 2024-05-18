import React, { useEffect } from "react";

const StaffSchedule = () => {
  const weekDays = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
  ];

  const employees = [
    {
      name: "Nguyễn A",
      schedule: [
        "08:00 - 10:00",
        "10:00 - 12:00",
        "",
        "08:00 - 12:00",
        "",
        "",
        "",
      ],
    },
    {
      name: "Trần B",
      schedule: ["", "", "08:00 - 12:00", "", "08:00 - 10:00", "", ""],
    },
    {
      name: "Lê C",
      schedule: [
        "09:00 - 11:00",
        "09:00 - 11:00",
        "09:00 - 11:00",
        "09:00 - 11:00",
        "09:00 - 11:00",
        "",
        "",
      ],
    },
    {
      name: "Phạm D",
      schedule: [
        "",
        "",
        "10:00 - 12:00",
        "10:00 - 12:00",
        "",
        "10:00 - 12:00",
        "",
      ],
    },
  ];
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  return (
    <div className="container mx-auto p-8 font-[poppins]">
      <h1 className="text-2xl font-bold mb-4">Management Schedular</h1>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-200 font-bold">
          <span>
            Tuần:
            {Math.ceil(
              ((date - new Date(Date.UTC(date.getUTCFullYear(), 0, 1))) /
                86400000 +
                1) /
                7
            )}
            , Năm {date.getFullYear()}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Nhân viên</th>
                {weekDays.map((day, index) => (
                  <th key={index} className="px-4 py-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{employee.name}</td>
                  {employee.schedule.map((schedule, index) => (
                    <td key={index} className="px-4 py-2">
                      {schedule}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold">Hành động:</p>
        <ul className="list-disc list-inside">
          <li>Thêm nhân viên</li>
          <li>Chỉnh sửa lịch làm việc của nhân viên</li>
          <li>Xóa lịch làm việc của nhân viên</li>
        </ul>
      </div>
    </div>
  );
};

export default StaffSchedule;
