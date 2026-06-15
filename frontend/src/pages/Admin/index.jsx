import { AggregatedValue } from "../../components/counters/AggregatedValueCounter";
import { CarCounter } from "../../components/counters/CarCounter";

function Admin() {
  return (
    <div>
      <div className="flex justify-center gap-8">
        <CarCounter />
        <AggregatedValue />
      </div>
    </div>
  );
}

export default Admin;
