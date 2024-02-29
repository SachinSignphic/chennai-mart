

const Card = ({ title, value, icon: IconComponent  }) => {
  return (
    <div className="py-4 px-12 flex flex-col bg-white gap-2 items-center rounded-lg shadow-md shadow-tertiary/15">
        <h4 className="text-black/70 font-poppins-600 tracking-tight text-lg">{title}</h4>
        <div className="flex justify-between items-center gap-2">
            <IconComponent />
            <h4 className="text-black/80 font-poppins-700">{value}</h4>
        </div>
    </div>
  )
}

export default Card