import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import content from "@/constants/content.json";

export default function FlightSearchCard() {
  const [activeTab, setActiveTab] = useState("flights");
  const { tabs, fields, searchButton, searchIcon } = content.flightSearch;

  return (
    <div className="relative max-w-8xl mx-48 bg-white rounded-2xl shadow-2xl p-8 z-10">
      {/* Tabs */}
      <div className="flex gap-8 mb-8 border-b border-gray-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600 -mb-4"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        {/* From */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            {fields.from.label}
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={fields.from.placeholder}
              className="border border-gray-300 rounded-lg px-4 py-3"
            />
            <span className="text-gray-400">{fields.from.icon}</span>
          </div>
        </div>

        {/* To */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            {fields.to.label}
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={fields.to.placeholder}
              className="border border-gray-300 rounded-lg px-4 py-3"
            />
            <span className="text-gray-400">{fields.to.icon}</span>
          </div>
        </div>

        {/* Depart */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            {fields.depart.label}
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={fields.depart.placeholder}
              className="border border-gray-300 rounded-lg px-4 py-3"
            />
            <span className="text-gray-400">{fields.depart.icon}</span>
          </div>
        </div>

        {/* Return */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            {fields.return.label}
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={fields.return.placeholder}
              className="border border-gray-300 rounded-lg px-4 py-3"
            />
            <span className="text-gray-400">{fields.return.icon}</span>
          </div>
        </div>

        {/* Travelers */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            {fields.travelers.label}
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={fields.travelers.placeholder}
              className="border border-gray-300 rounded-lg px-4 py-3"
            />
            <span className="text-gray-400">{fields.travelers.icon}</span>
          </div>
        </div>

        {/* Search Button */}
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3 h-full font-semibold flex items-center gap-2">
          {searchButton} <span>{searchIcon}</span>
        </Button>
      </div>
    </div>
  );
}
