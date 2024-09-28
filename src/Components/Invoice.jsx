import React from 'react';
import './comp_CSS/invoice.css'; // Import your CSS for styling
import Table from './Table'; // Import the Table component

const Invoice = ({ shopInfo, shopkeeperInfo, customerInfo, tableData, totalPrice }) => {
const currentDate = new Date();
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-GB', options);

  return (
    <div id="invoice-to-print" className="invoice">
      <p className='current-date'>{formattedDate}</p>
      <header className="invoice-header">
        <h1 className='app-title'>{shopInfo.name}</h1>
        <p>{shopInfo.address}</p>
      </header>
        <div className='info-sec'>
      <section className="shopkeeper-info">
        <h2>Trader's Info</h2>
        <p><strong>Name:</strong> {shopkeeperInfo.name}</p>
        <p><strong>Contact No:</strong> {shopkeeperInfo.contact}</p>
        {/* <p><strong>Email ID:</strong> {shopkeeperInfo.email}</p> */}
        {/* <p><strong>Address:</strong> {shopkeeperInfo.address}</p> */}
      </section>

      <section className="customer-info">
        <h2>Customer's Info</h2>
        <p><strong>Name:</strong> {customerInfo.name}</p>
        <p><strong>Contact No:</strong> {customerInfo.contact}</p>
        <p><strong>Address:</strong> {customerInfo.address}</p>
      </section>
      </div>
      <section className="invoice-details">
        <h2>Invoice Details</h2>
        <Table data={tableData} totalPrice={totalPrice} />
      </section>

      <footer className="invoice-footer">
        <b>For, Guruprasad Furniture</b>
        <div className='sign-box'></div>
        <b>Authorised Signatory</b>
      </footer>
    </div>
  );
};

export default Invoice;
