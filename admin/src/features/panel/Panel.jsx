import { Fragment, useEffect, useState } from 'react'
import { ItemSide } from './ItemSide'
import { MedicineBoard } from './admin/medicine/MedicineBoard'
import { sideDataMock } from './mocks/sideData'

export const Panel = () => {
    const [selectedTitle, setSelectedTitle] = useState('Thuốc')
    const [sideData, setSideData] = useState([])
    const [search, setSearch] = useState('')

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchSubmit = () => {
        alert(search)
    }

    const handleSelect = (title) => {
        setSelectedTitle(title)
    }

    // load data
    useEffect(() => {
        setSideData(sideDataMock)
    }, [sideData])

  return (
    <Fragment>
        <div className='nav h-[60px] bg-sky-100 flex items-center px-4 justify-between'>
            <button className='h-10 w-24 rounded-lg bg-sky-300 text-sky-600 font-bold'>Home</button>
            <div className='search-bar w-[500px] flex'>
                <input onChange={handleSearchChange} className='w-3/5 mr-3 px-3 rounded-full' type="text" name="search" id="search" placeholder='Nhập để tìm kiếm theo mã'/>
                <button onClick={handleSearchSubmit} className='w-1/5 h-10 rounded-lg bg-sky-300 text-sky-600 font-bold'>Tìm</button>
            </div>
        </div>
        <div className='main-container flex'>
            <div className='side w-1/4 pt-10'>
                <div className='title mx-8 mb-10'>
                    <p className='w-[240px] shadow-lg h-16 bg-sky-300 text-center leading-[64px] text-3xl text-sky-600 rounded-2xl font-bold'>
                        {selectedTitle}
                    </p>
                </div>

                <div className='list'>
                    {sideData.map((item, index) => (
                        <ItemSide onClick={handleSelect} key={index} item={item} even={index % 2 === 0} handleTitle={handleSelect}/>
                    ))}
                </div>
            </div>
            <div className='main w-3/4 bg-gray-200'>
                <div className='flex px-8 justify-between items-center main-navbar w-full bg-sky-500 h-14'>
                    <div className='w-28 mt-6 bg-white h-8 rounded-tl-lg rounded-tr-lg'>
                        <p className='text-sky-600 text-center w-full leading-8'>Table #1</p>
                    </div>
                    <div>
                        <button className='h-8 rounded-md text-sky-600 leading-8 bg-sky-200 w-20 mr-8'>+ Thêm</button>
                        <button className='h-8 rounded-md text-sky-600 leading-8 bg-sky-200 w-20 mr-8'>- Xoá</button>
                        <button className='h-8 rounded-md text-sky-600 leading-8 bg-sky-200 w-20'>? Sửa</button>
                    </div>
                </div>

                <div className='main-content w-full px-10 py-5'>
                    <MedicineBoard />
                </div>
            </div>
        </div>
    </Fragment>
  )
}
