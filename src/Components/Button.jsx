import "./comp_CSS/button.css";

const Button = ({ onClick, label, style }) => {
  return (
    <button className="custom-button" onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default Button;

Button.propTypes;
