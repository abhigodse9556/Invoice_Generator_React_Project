import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";
import Dropdown from "./Components/Dropdown";
import TextField from "./Components/Textfield";
import Button from "./Components/Button";
import Table from "./Components/Table";
import Invoice from "./Components/Invoice";
import products from "./assets/product.json";

const INVOICE_PRINT_STYLES = `
  /* Invoice container */
  .invoice {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  /* Header */
  .invoice-header {
    text-align: center;
  }

  .invoice-header h1 {
    color: #333;
  }

  .invoice-header p {
    margin: 5px 0;
    color: #333;
  }

  /* Shopkeeper and Customer Info */
  .info-sec{
    display: flex;
    border: 1px solid #ddd;
  }

  .info-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .shopkeeper-info, .customer-info {
    flex: 1;
    padding: 0 20px;
  }

  .shopkeeper-info h2, .customer-info h2 {
    font-size: 16px;
    color: #333;
  }

  .shopkeeper-info p, .customer-info p {
    margin: 5px 0;
    font-size: 14px;
  }

  /* Table styling */
  .custom-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .custom-table th, .custom-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .custom-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .custom-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  /* Total row styling */
  .total-row {
    font-weight: bold;
    background-color: #f9f9f9;
    border-top: 2px solid #ccc;
  }

  .total-row td {
    text-align: right;
  }

  /* Footer */
  .invoice-footer {
    display: flex;
    flex-direction: column;
    align-items: end;
    padding: 10px 15px;
    margin-top: 25px;
    text-align: right;
  }

  .invoice-footer .sign-box{
    /* border: 1px solid gray; */
    height: 50px;
    width: 150px;
  }

  .invoice-footer b {
    color: #333;
  }
`;

function App() {
  const options = products.map((product) => product.name);
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [tableData, setTableData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSecondaryContact, setShowSecondaryContact] = useState(false);

  // Shop and shopkeeper information
  const shopInfo = {
    name: "Guruprasad Furniture",
    address:
      "Guruprasad Saw Mill, Shivaji Road, Dhanyabajar, Vaduj, (Khatav, Satara) - 415506",
  };

  const shopkeeperInfo = {
    name: showSecondaryContact ? "Gaurav Nikam / Nilesh Nikam" : "Gaurav Nikam",
    contact: showSecondaryContact ? "7397931121 / 9881821098" : "7397931121",
    //email: 'gauravnikam@gmail.com',
    // address: ''
  };

  // Dynamic customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    contact: "",
    address: "",
  });

  // Invoice visibility state
  const [showInvoice, setShowInvoice] = useState(false);

  // Calculate price
  const calculatePrice = (rateValue, quantityValue) => {
    const rateNum = parseFloat(rateValue);
    const quantityNum = parseFloat(quantityValue);
    if (!isNaN(rateNum) && !isNaN(quantityNum)) {
      setPrice((rateNum * quantityNum).toFixed(2));
    } else {
      setPrice("");
    }
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    calculatePrice(newRate, quantity);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    calculatePrice(rate, newQuantity);
  };

  const handleProductChange = (product) => {
    setSelectedProduct(product);
  };

  const handleAddClick = () => {
    if (
      selectedProduct &&
      rate.trim() !== "" &&
      quantity.trim() !== "" &&
      price.trim() !== ""
    ) {
      const newRow = {
        productName: selectedProduct,
        rate: rate,
        quantity: quantity,
        price: price,
      };
      setTableData([...tableData, newRow]);
      setTotalPrice((prevTotal) => prevTotal + parseFloat(price));
      setRate("");
      setQuantity("");
      setPrice("");
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleCustomerInfoChange = (value, name) => {
    setCustomerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShowInvoiceClick = () => {
    setShowInvoice(true);
  };

  const handlePrintInvoiceClick = () => {
    const printWindow = window.open("", "", "height=600,width=800");

    // Get the HTML content of the invoice
    const invoiceHTML = document.getElementById("invoice-to-print").innerHTML;

    // Generate the full HTML for the print window
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            ${INVOICE_PRINT_STYLES}
          </style>
          <link rel="stylesheet" href="./comp_css/invoice.css"/>
        </head>
        <body>
          ${invoiceHTML}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for the new document to be fully loaded before printing
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  const handleDownloadInvoiceClick = async () => {
    const sourceInvoiceElement = document.getElementById("invoice-to-print");
    if (!sourceInvoiceElement) return;

    // Use the same HTML + manually injected <style> block as the print window
    const invoiceHTML = sourceInvoiceElement.outerHTML;

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "fixed";
    tempContainer.style.left = "-10000px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "800px";

    tempContainer.innerHTML = `
      <style>
        ${INVOICE_PRINT_STYLES}
      </style>
      ${invoiceHTML}
    `;

    document.body.appendChild(tempContainer);

    const targetElement = tempContainer.querySelector("#invoice-to-print");
    if (!targetElement) {
      document.body.removeChild(tempContainer);
      return;
    }

    try {
      const canvas = await html2canvas(targetElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const ratio = Math.min(
        pdfWidth / imgProps.width,
        pdfHeight / imgProps.height
      );

      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;

      const x = (pdfWidth - imgWidth) / 2;
      const y = 0;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("Failed to download invoice. Please try again.");
      // eslint-disable-next-line no-console
      console.error("Error generating PDF:", error);
    } finally {
      document.body.removeChild(tempContainer);
    }
  };

  return (
    <div>
      <h1 className="app-title">Guruprasad Furniture</h1>
      <h3>Invoice Generator</h3>
      <Dropdown
        options={options}
        label="Select Product"
        selectedOption={selectedProduct}
        onChange={handleProductChange}
      />
      <TextField
        label="Rate"
        placeholder="Enter Product Rate"
        type="number"
        value={rate}
        onChange={handleRateChange}
      />
      <TextField
        label="Quantity"
        placeholder="Enter Quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <TextField
        label="Price"
        placeholder="Price"
        type="number"
        value={price}
        disabled
      />
      <Button onClick={handleAddClick} label="Add" />

      <Table data={tableData} totalPrice={totalPrice} />

      {/* Customer Information Form */}
      <section className="customer-form">
        <h2>Customer Information</h2>
        <TextField
          label="Customer Name"
          placeholder="Enter Customer Name"
          value={customerInfo.name}
          onChange={handleCustomerInfoChange}
          name="name"
        />
        <TextField
          label="Customer Contact"
          placeholder="Enter Customer Contact No."
          value={customerInfo.contact}
          onChange={handleCustomerInfoChange}
          name="contact"
          type="number"
        />
        <TextField
          label="Customer Address"
          placeholder="Enter Customer Address"
          value={customerInfo.address}
          onChange={handleCustomerInfoChange}
          name="address"
        />
      </section>

      {/* Button to show the invoice */}
      <Button onClick={handleShowInvoiceClick} label="Generate Invoice" style={{ marginRight: "10px" }} />
      <Button onClick={() => setShowSecondaryContact(!showSecondaryContact)} label={showSecondaryContact ? "Show Only Primary Contact" : "Show Both Contacts"} />

      {/* Conditionally render the invoice */}
      {showInvoice && (
        <div>
          <Invoice
            shopInfo={shopInfo}
            shopkeeperInfo={shopkeeperInfo}
            customerInfo={customerInfo}
            tableData={tableData}
            totalPrice={totalPrice}
          />
          <Button onClick={handlePrintInvoiceClick} label="Print Invoice" style={{ marginRight: "10px" }} />
          <Button
            onClick={handleDownloadInvoiceClick}
            label="Download Invoice"
          />
        </div>
      )}
    </div>
  );
}

export default App;
