import React from "react";
import { LuTrash2 } from "react-icons/lu";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <LuTrash2 className="text-lg" />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Are you sure?</h4>

          <p className="mt-1 text-sm text-slate-400">{content}</p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-300 cursor-pointer"
          onClick={onDelete}
        >
          <LuTrash2 />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
