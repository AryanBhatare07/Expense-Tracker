import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onSelect(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Icon Picker Button */}
      <div
        className="flex items-center gap-3 cursor-pointer w-fit"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xl hover:bg-indigo-500/20 transition">
          {icon ? <span className="text-2xl">{icon}</span> : <LuImage />}
        </div>

        <p className="text-sm font-medium text-indigo-300 hover:text-indigo-200 transition">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Emoji Picker */}
      {isOpen && (
        <div className="absolute top-16 left-0 z-50">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-[#0e192a] border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <LuX size={16} />
            </button>

            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme="dark"
              width={350}
              height={400}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
