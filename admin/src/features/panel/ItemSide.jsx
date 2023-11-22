/* eslint-disable react/prop-types */
export const ItemSide = ({item: {name, quantity}, even, handleTitle}) => {
    const bg = even ? 'bg-gray-200' : 'bg-white'
    const bgReverse = even ? 'bg-white' : 'bg-gray-200'

  return (
    <div onClick={() => handleTitle(name)} className={`flex cursor-pointer hover:scale-110 transition-all hover:z-10 text-sky-600 text-xl h-16 px-10 items-center justify-between ${bg}`}>
        <p className=''>{name}</p>
        <p className={`w-6 ${bgReverse} h-6 text-[14px] leading-[24px] rounded-lg text-center`}>{quantity}</p>
    </div>
  )
}
