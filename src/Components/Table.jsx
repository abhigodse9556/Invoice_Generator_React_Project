import React from 'react';
import './comp_CSS/table.css'; // Make sure the path is correct

const Table = ({ data, totalPrice }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Product Name</th>
          <th>Rate</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.productName}</td>
            <td>{row.rate}</td>
            <td>{row.quantity}</td>
            <td>{row.price}</td>
          </tr>
        ))}
        {/* Fixed row for total price */}
        <tr className="total-row">
          <td colSpan="4" style={{ textAlign: 'right' }}>Total</td>
          <td>{totalPrice}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
