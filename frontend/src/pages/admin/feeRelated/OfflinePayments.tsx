import React, { useState } from "react";

const OfflinePayments = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [payments, setPayments] = useState([
        { id: 193, admissionNo: 18028, name: "Rahul Sinha", class: "Class 3(C)", paymentDate: "02/10/2025", submitDate: "02/03/2025 02:51 pm", amount: 250, status: "Pending", paymentId: "1015/1" },
        { id: 192, admissionNo: 18014, name: "Devin Coineach", class: "Class 4(A)", paymentDate: "02/10/2025", submitDate: "02/03/2025 02:50 pm", amount: 300, status: "Approved", paymentId: "1016/1" },
        { id: 191, admissionNo: 18007, name: "Rohit Khanna", class: "Class 3(C)", paymentDate: "01/15/2025", submitDate: "01/03/2025 04:53 pm", amount: 250, status: "Pending", paymentId: "1017/1" },
    ]);

    const openPopup = (payment) => {
        setSelectedPayment(payment);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedPayment(null);
    };

    const updateStatus = () => {
        setPayments(payments.map(payment =>
            payment.id === selectedPayment.id
                ? { ...payment, status: "Approved" }
                : payment
        ));
        closePopup();
    };

    // 🔥 Search Filter Function (Fixed)
    const filteredPayments = payments.filter((payment) =>
        payment.id.toString().includes(searchQuery) ||
        payment.admissionNo.toString().includes(searchQuery) ||
        payment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.paymentId.includes(searchQuery)
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Offline Bank Payments</h2>
            <input
                type="text"
                placeholder="🔍 Search payments..."
                style={styles.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Request ID</th>
                            <th style={styles.th}>Admission No</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Class</th>
                            <th style={styles.th}>Payment Date</th>
                            <th style={styles.th}>Submit Date</th>
                            <th style={styles.th}>Amount (₹)</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Payment ID</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((payment) => (
                            <tr key={payment.id}>
                                <td style={styles.td}>{payment.id}</td>
                                <td style={styles.td}>{payment.admissionNo}</td>
                                <td style={styles.td}>{payment.name}</td>
                                <td style={styles.td}>{payment.class}</td>
                                <td style={styles.td}>{payment.paymentDate}</td>
                                <td style={styles.td}>{payment.submitDate}</td>
                                <td style={styles.td}>₹{payment.amount}</td>
                                <td style={styles.td}>
                                    <span style={payment.status === "Pending" ? styles.pending : styles.approved}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td style={styles.td}>{payment.paymentId}</td>
                                <td style={styles.td}>
                                    <button style={styles.actionButton} onClick={() => openPopup(payment)}>⋮</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isPopupOpen && selectedPayment && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <h3>Payment Details</h3>
                        <p><strong>Name:</strong> {selectedPayment.name}</p>
                        <p><strong>Class:</strong> {selectedPayment.class}</p>
                        <p><strong>Amount:</strong> ₹{selectedPayment.amount}</p>
                        <p><strong>Status:</strong> 
                            <span style={selectedPayment.status === "Pending" ? styles.pending : styles.approved}>
                                {selectedPayment.status}
                            </span>
                        </p>

                        {selectedPayment.status === "Pending" && (
                            <button style={styles.approveButton} onClick={updateStatus}>Approve</button>
                        )}
                        <button style={styles.closeButton} onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// 🔥 Updated CSS (Fixed Table Alignment)
const styles = {
    container: {
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#e8c897",
        minHeight: "100vh",
    },
    heading: {
        textAlign: "center",
        color: "#333",
        fontSize: "24px",
        marginBottom: "15px",
        backgroundColor: "#e8c897",
        borderRadius: "15px",
    },
    search: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "15px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    tableContainer: {
        overflowX: "auto",
        borderRadius: "15px",
        
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    th: {
        backgroundColor: "#579df2",
        textAlign: "center",
        padding: "12px",
        borderBottom: "2px solid #ddd",
    },
    td: {
        textAlign: "center",
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    actionButton: {
        background: "none",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        padding: "5px",
    },
    pending: {
        color: "#ff9800",
        fontWeight: "bold",
        padding: "5px 10px",
        borderRadius: "5px",
        backgroundColor: "#fff3e0",
    },
    approved: {
        color: "#4CAF50",
        fontWeight: "bold",
        padding: "5px 10px",
        borderRadius: "5px",
        backgroundColor: "#e8f5e9",
    },
    popupOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        background: "#fff",
        padding: "25px",
        borderRadius: "10px",
        width: "350px",
        textAlign: "center",
    }, approveButton: {
        background: "#4CAF50",
        color: "white",
        border: "none",
        padding: "10px 20px",
        marginRight: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    closeButton: {
        background: "#f44336",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
    }
};

export default OfflinePayments;
