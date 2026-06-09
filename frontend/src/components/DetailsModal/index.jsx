import { useNavigate } from "react-router";
import Dashboard from "../../pages/Dashboard";

export const DetailsModal = ({ closeLeadsTo, children, component }) => {
  const navigate = useNavigate();

  const handleClose = (e) => {
    e.preventDefault();
    navigate(!closeLeadsTo ? -1 : closeLeadsTo);
  };
  return (
    <section>
        <div className="animate-fade">
        {component}
        </div>

      <div
        className="flex fixed inset-0 z-50 items-center justify-center bg-black/50" 
      >
        <div className="bg-white rounded-xl shadow-lg w-full h-full max-h-120 max-w-4xl p-6 relative animate-fade">
          <button
            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg hover:cursor-pointer"
            onClick={handleClose}
          >
            x
          </button>
          {/* close button */}
          {children}
        </div>
      </div>
    </section>
  );
};