
const Button = ({ label, onClick = () => {}, isActive }) => {
  return (
    <button onClick={onClick} className={`${isActive? 'bg-teal text-white': 'bg-white text-tertiary'} px-4 py-1 rounded-md text-center font-poppins-400 text-base`}>{label}</button>
  )
}

export default Button