// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Phone,
//   Receipt,
//   CheckCircle,
//   Clock,
//   XCircle,
//   Loader,
//   RefreshCw,
//   ShoppingCart,
//   CalendarClock,
//   ListOrdered,
// } from "lucide-react";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// const ITEMS_PER_PAGE = 5;

// function ViewPayment() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get(`${SERVER_URL}/api/mpesa/transactions`);
//       setTransactions(res.data);
//     } catch (err) {
//       console.error("Failed to fetch transactions:", err);
//       setError("Error fetching transactions.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const getStatusBadge = (status) => {
//     const baseClass =
//       "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium";
//     switch (status) {
//       case "Success":
//         return <span className={`${baseClass} text-green-700 bg-green-100`}><CheckCircle size={14} /> Success</span>;
//       case "Pending":
//         return <span className={`${baseClass} text-yellow-700 bg-yellow-100`}><Clock size={14} /> Pending</span>;
//       case "Failed":
//         return <span className={`${baseClass} text-red-700 bg-red-100`}><XCircle size={14} /> Failed</span>;
//       default:
//         return status;
//     }
//   };

//   // Filtered + searched transactions
//   const filteredTx = transactions.filter((tx) => {
//     const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
//     const matchesSearch =
//       tx.phone.toLowerCase().includes(search.toLowerCase()) ||
//       (tx.mpesaReceiptNumber || "").toLowerCase().includes(search.toLowerCase());
//     return matchesStatus && matchesSearch;
//   });

//   const totalPages = Math.ceil(filteredTx.length / ITEMS_PER_PAGE);
//   const paginatedTx = filteredTx.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="p-6 w-full max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//           <ListOrdered size={22} /> All Payments
//         </h2>
//         <button
//           onClick={() => {
//             fetchTransactions();
//             setSearch("");
//             setStatusFilter("All");
//             setCurrentPage(1);
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
//         >
//           <RefreshCw size={16} /> Refresh
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           placeholder="Search by phone or receipt..."
//           className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 text-sm"
//         />

//         <select
//           value={statusFilter}
//           onChange={(e) => {
//             setStatusFilter(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
//         >
//           <option value="All">All</option>
//           <option value="Success">Success</option>
//           <option value="Pending">Pending</option>
//           <option value="Failed">Failed</option>
//         </select>
//       </div>

//       {/* Main content */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40 text-gray-600">
//           <Loader className="animate-spin mr-2" size={24} />
//           Loading payments...
//         </div>
//       ) : error ? (
//         <div className="text-red-600 text-center">{error}</div>
//       ) : filteredTx.length === 0 ? (
//         <div className="text-gray-500 text-center">No transactions found.</div>
//       ) : (
//         <div className="space-y-4">
//           {paginatedTx.map((tx, i) => (
//             <div
//               key={i}
//               className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
//             >
//               <div className="flex justify-between flex-wrap gap-4 mb-2">
//                 <div className="flex items-center gap-2 text-gray-700 text-sm">
//                   <Phone size={16} /> {tx.phone}
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-700 text-sm">
//                   <Receipt size={16} /> {tx.mpesaReceiptNumber || "— (Pending)"}
//                 </div>
//                 <div className="text-gray-600 text-sm flex items-center gap-1">
//                   <CalendarClock size={14} />
//                   {new Date(tx.createdAt).toLocaleString()}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="text-sm text-gray-700 font-medium">
//                   Total: <span className="font-bold text-black">KES {tx.amount.toLocaleString()}</span>
//                 </div>
//                 <div>{getStatusBadge(tx.status)}</div>
//               </div>

//               <div className="mt-4">
//                 <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <ShoppingCart size={16} /> Cart Items
//                 </h4>
//                 <ul className="space-y-1 text-sm pl-4 list-disc text-gray-600">
//                   {tx.cartItems.map((item, idx) => (
//                     <li key={idx}>
//                       {item.name} × {item.quantity} — KES {(item.price * item.quantity).toLocaleString()}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}

//           {/* Pagination Controls */}
//           <div className="flex justify-center mt-6 gap-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
//             >
//               Prev
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={`px-3 py-1 border rounded text-sm ${
//                   currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewPayment;

import React from "react";
import { ListOrdered } from "lucide-react";

function ViewPayment() {
  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-2 justify-center mt-8">
        <ListOrdered size={22} />
        Payments Comming Soon !!
      </h2>
    </div>
  );
}

export default ViewPayment;
