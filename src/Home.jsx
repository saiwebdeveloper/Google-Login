import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Bus");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const tableContainerRef = useRef(null); // 🔹 Scrollable container ref

  // Load expenses from sessionStorage
  useEffect(() => {
    const savedExpenses = sessionStorage.getItem("expenses");
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Save expenses & scroll to bottom
  useEffect(() => {
    sessionStorage.setItem("expenses", JSON.stringify(expenses));

    // Scroll container to bottom
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [expenses]);

  // FORCE LOGOUT ON REFRESH / TAB CLOSE
  useEffect(() => {
    const handleRefresh = () => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("expenses"); // optional
    };
    window.addEventListener("beforeunload", handleRefresh);
    return () => window.removeEventListener("beforeunload", handleRefresh);
  }, []);

  const addExpense = () => {
    if (!amount) return;
    setExpenses([...expenses, { category, amount: Number(amount) }]);
    setAmount("");
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("expenses");
    window.location.href = "/";
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotal = (cat) =>
    expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">📊 Monthly Expenses Tracker</h3>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="row">
        {/* Add Expense */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Add Expense</h5>

              <select
                className="form-select mb-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Bus</option>
                <option>Train</option>
                <option>Movie</option>
                <option>Food</option>
                <option>Others</option>
              </select>

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button className="btn btn-primary w-100" onClick={addExpense}>
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Expense List */}
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div
              className="card-body"
              style={{ maxHeight: "400px", overflowY: "auto" }}
              ref={tableContainerRef} // 🔹 Scroll container
            >
              <h5 className="fw-semibold mb-3">Expenses List</h5>

              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Category</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e, i) => (
                    <tr key={i}>
                      <td>{e.category}</td>
                      <td>{e.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {expenses.length === 0 && (
                <p className="text-muted text-center mt-3">
                  No expenses added yet
                </p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Monthly Summary</h5>

              <ul className="list-group mb-3">
                {["Bus", "Train", "Movie", "Food", "Others"].map((cat) => (
                  <li
                    key={cat}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {cat} <span>₹{categoryTotal(cat)}</span>
                  </li>
                ))}
              </ul>

              <div className="alert alert-success text-center fw-bold">
                Total Monthly Expense: ₹{total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
