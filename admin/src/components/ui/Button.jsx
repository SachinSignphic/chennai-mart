
const Button = ({ label, onClick = () => {}, isActive, fullWidth }) => {
  return (
      <button
          onClick={onClick}
          className={`${
              isActive ? "bg-teal text-white" : "bg-white text-tertiary"
          } ${fullWidth ? "w-full": ''} px-4 py-2 rounded-md text-center font-poppins-400 text-base`}>
          {label}
      </button>
  );
}

export default Button
