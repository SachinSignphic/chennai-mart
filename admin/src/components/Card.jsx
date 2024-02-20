/* eslint-disable no-unused-vars */


const Card = ({ icon: IconComponent,  }) => {
  return (
    <div className="p-4 flex flex-col gap-2 items-center rounded-lg shadow-md shadow-tertiary/15">
        <h4 className="text-black/80 font-bold text-xl">TOTAL ORDERS</h4>
        <div className="flex justify-between">
            {/* icon */}
            <h4 className="text-black/60">167</h4>
        </div>
    </div>
  )
}

export default Card