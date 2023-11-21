import { Fragment } from 'react'
import { ItemSide } from './ItemSide'

export const Panel = () => {

    const data = [
        {
            name: "Thuốc",
            quantity: 30,
        },
        {
            name: "Nha sĩ",
            quantity: 15,
        },
        {
            name: "Nhân viên",
            quantity: 12,
        }
    ]

  return (
    <Fragment>
        <div className='nav h-[60px] bg-sky-100 flex items-center px-4 justify-between'>
            <button className='h-10 w-24 rounded-lg bg-sky-300 text-sky-600 font-bold'>Home</button>
            <div className='search-bar w-[500px] flex'>
                <input className='w-3/5 mr-3 px-3 rounded-full' type="text" name="search" id="search" placeholder='Nhập để tìm kiếm theo mã'/>
                <button className='w-1/5 h-10 rounded-lg bg-sky-300 text-sky-600 font-bold'>Tìm</button>
            </div>
        </div>
        <div className='main-container flex'>
            <div className='side w-1/4 pt-10'>
                <div className='title mx-8 mb-10'>
                    <p className='w-[240px] shadow-lg h-16 bg-sky-300 text-center leading-[64px] text-3xl text-sky-600 rounded-2xl font-bold'>
                        Thuốc
                    </p>
                </div>

                <div className='list'>
                    {data.map((item, index) => (
                        <ItemSide key={index} item={item} even={index % 2 === 0}/>
                    ))}
                </div>
            </div>
            <div className='main w-3/4 bg-gray-200 h-screen'>

            </div>
        </div>
    </Fragment>
  )
}
