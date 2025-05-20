import { useState } from "react";

export default function RoofingEstimator() {
  const [tasks, setTasks] = useState([
    { name: "Shingle Tear-Off (3-Tab)", unit: "SQ", rate: 24.29, qty: "" },
    { name: "Shingle Install (3-Tab)", unit: "SQ", rate: 88.67, qty: "" },
    { name: "Ridge Cap Shingles Install", unit: "LF", rate: 1.66, qty: "" },
    { name: "Starter Row Install", unit: "LF", rate: 0.73, qty: "" },
    { name: "Felt Install", unit: "SQ", rate: 11.88, qty: "" },
    { name: "Modified Bitumen Tear-Off", unit: "SQ", rate: 42.76, qty: "" },
    { name: "Modified Bitumen Install", unit: "SQ", rate: 127.91, qty: "" },
    { name: "Base Sheet Tear-Off", unit: "SQ", rate: 3.60, qty: "" },
    { name: "Base Sheet Install", unit: "SQ", rate: 19.69, qty: "" },
    { name: "Pipe Jack Flashing Install", unit: "EA", rate: 37.31, qty: "" },
    { name: "Satellite Dish Reset", unit: "EA", rate: 46.62, qty: "" },
  ]);
  const [materialsCost, setMaterialsCost] = useState(0);

  const laborSubtotal = tasks.reduce((sum, t) => sum + (parseFloat(t.qty) || 0) * t.rate, 0);
  const salesTax = materialsCost * 0.0899;
  const profit = laborSubtotal * 0.10;
  const total = laborSubtotal + materialsCost + salesTax + profit;

  const updateQty = (index, value) => {
    const updated = [...tasks];
    updated[index].qty = value;
    setTasks(updated);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Roofing Labor Estimate Calculator</h1>
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-center">
            <span>{task.name}</span>
            <span>{task.unit}</span>
            <span>${task.rate.toFixed(2)} per {task.unit}</span>
            <input
              type="number"
              className="border rounded px-2 py-1"
              placeholder="Qty"
              value={task.qty}
              onChange={(e) => updateQty(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="block font-semibold">Materials Cost ($):</label>
        <input
          type="number"
          className="border rounded px-2 py-1"
          value={materialsCost}
          onChange={(e) => setMaterialsCost(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded shadow">
        <p><strong>Labor Subtotal:</strong> ${laborSubtotal.toFixed(2)}</p>
        <p><strong>Sales Tax (8.99% on materials):</strong> ${salesTax.toFixed(2)}</p>
        <p><strong>Contractor Profit (10% of labor):</strong> ${profit.toFixed(2)}</p>
        <p className="text-xl font-bold mt-2">Total Estimate: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
