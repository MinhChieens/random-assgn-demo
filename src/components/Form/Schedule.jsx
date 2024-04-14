import React from "react";
import { useState } from "react";

const Schedule = () => {
  const [value, setValues] = useState({
    contact: "",
    recurrence: false,
    frequency: "",
    frequencyDaily: "",
    startDate: "",
    time: "",
    endDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };
  const handleChange = (e) => {
    setValues({ ...value, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    const reset = {
      contact: "",
      recurrence: false,
      frequency: "",
      frequencyDaily: "",
      startDate: "",
      time: "",
      endDate: "",
    };
    setValues(reset);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onReset={handleReset}
      className="w-4/5 mx-auto my-4 flex flex-col"
    >
      <ul className="columns-2 gap-4 items-stretch *:py-2">
        <li className="flex flex-col gap-1">
          <label htmlFor="contact">Contact</label>
          <input
            onChange={(e) => handleChange(e)}
            type="tel"
            name="contact"
            id="contact"
            className="border-2 border-gray-300 p-1 rounded-md"
            required
            placeholder="0123456789"
          />
        </li>
        <li className="flex gap-1 items-center">
          <input
            onClick={() => {
              value.recurrence = !value.recurrence;
              handleChange({
                target: { name: "recurrence", value: value.recurrence },
              });
            }}
            type="checkbox"
            id="recurrence"
            name="recurrence"
            checked={value.recurrence}
          />
          <label htmlFor="recurrence">Recurrence</label>
        </li>
        <li className="flex gap-4 items-center">
          <label htmlFor="frequency">Frequency</label>
          <ul className="flex gap-4 items-center">
            <li className="flex gap-1">
              <input
                onChange={(e) => handleChange(e)}
                label="Daily"
                type="radio"
                id="daily"
                name="frequency"
                value="daily"
                required
              />
              <label htmlFor="daily">Daily</label>
            </li>
            <li className="flex gap-1">
              <input
                onChange={(e) => handleChange(e)}
                label="Weekly"
                type="radio"
                id="weekly"
                name="frequency"
                value="weekly"
              />
              <label htmlFor="weekly">Weekly</label>
            </li>
            <li className="flex gap-1">
              <input
                onChange={(e) => handleChange(e)}
                label="Monthly"
                type="radio"
                id="monthly"
                name="frequency"
                value="monthly"
              />
              <label htmlFor="monthly">Monthly</label>
            </li>
          </ul>
          <li className="flex gap-1">
            <input
              onChange={(e) => handleChange(e)}
              label="Yearly"
              type="radio"
              id="yearly"
              name="frequency"
              value="yearly"
            />
            <label htmlFor="yearly">Yearly</label>
          </li>
        </li>
        {value.frequency === "daily" ? (
          <ul onChange={(e) => handleChange(e)} className="flex flex-col gap-1">
            <li className="flex gap-1 items-center">
              <input
                type="radio"
                id="everyday"
                name="frequencyDaily"
                value="everyday"
              />
              <label htmlFor="everyday">Every Weekdays</label>
            </li>
            <li className="flex gap-1 items-center">
              <input
                type="radio"
                id="oneday"
                name="frequencyDaily"
                value=""
                required
              />
              <label htmlFor="oneday">Every</label>
              <select
                onChange={(e) => handleChange(e)}
                id="oneday"
                name="frequencyDaily"
                className="border-2 border-gray-300 p-1 rounded-md"
              >
                <option value="" selected hidden disabled>
                  Select day
                </option>
                <option value="monday" required>
                  Mondays
                </option>
                <option value="tuesday">Tuesdays</option>
                <option value="wednesday">Wednesdays</option>
                <option value="thursday">Thursdays</option>
                <option value="friday">Fridays</option>
              </select>
            </li>
          </ul>
        ) : (
          ""
        )}
        <li className="flex flex-col gap-1 break-before-column">
          <label htmlFor="time">Time</label>
          <select
            onChange={(e) => handleChange(e)}
            className={`border-2 border-gray-300 px-1 py-2 rounded-md bg-white `}
            name="time"
            id="time"
            required
          >
            <option value="" selected hidden>
              Select time
            </option>
            <option value="8">8AM - 10AM</option>
            <option value="10">10AM - 12AM</option>
            <option value="13">1PM - 3PM</option>
            <option value="15">3PM - 5PM</option>
          </select>
        </li>
        <li className="flex flex-col gap-1">
          <label htmlFor="startDate">Start Date</label>
          <div className="flex gap-1 items-stretch">
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              className="border-2 border-gray-300 p-1 rounded-md"
              id="startDate"
              name="startDate"
              required
            />
          </div>
        </li>
        <li className="flex flex-col gap-1">
          <label htmlFor="endDate">End Date</label>
          <div className="flex gap-1">
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              className="border-2 border-gray-300 p-1 rounded-md"
              id="endDate"
              name="endDate"
              required
            />
          </div>
        </li>
        <div className="self-end flex gap-2">
          <button
            type="reset"
            className=" text-skyblue rounded-md border-gray-300 hover:bg-gray-200  border-2 px-4 py-2"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-skyblue/80 hover:bg-skyblue text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        </div>
      </ul>
    </form>
  );
};

export default Schedule;
