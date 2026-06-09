import React from "react";

export const CustomModal = ({ isOpen, setIsOpen, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
      <div className="bg-white rounded-lg w-11/12 max-w-2xl p-5 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900 cursor-pointer">Fechar</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
