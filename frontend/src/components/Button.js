const Button = ({ text, name, onClick, type }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["button", `button_${btnType}`, `button_${name}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "확인필요",
  type: "defalut",
};

export default Button;
