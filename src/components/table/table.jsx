// components/FlexibleTable.js
'use client'
import React from 'react';
import "./table.global.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// get current path
const bookingStatus = ["","Chưa thanh toán", "Đã thanh toán","Đã checkin", "Đã checkout","Đã hủy"]
const colorTextBookingStatus = ["", "text-zinc-500", "text-emerald-500", "text-yellow-500","text-black","text-red-400"]
const colorButtonBookingStatus = ["", "", "bg-emerald-500", "bg-yellow-500", "bg-stone-400", "bg-red-400"]
import { usePathname } from 'next/navigation';
import ButtonCustom from '../button/button';
const FlexibleTable = ({ data, headerNames, onSort , setData, sortConfig, setSortConfig}) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Lấy danh sách các khóa của đối tượng đầu tiên làm tiêu đề bảng
  const headers = Object.keys(data[0]);
  console.log(`headers: ${headers}`)
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 8;
  const router = useRouter();
  const pathname = usePathname()
  // Tính toán số lượng trang
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Xử lý sự kiện khi chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickEdit = (id) => {
    // Lấy đường dẫn hiện tại
    router.push(`${pathname}/edit/${id}`)
  }

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    console.log(sortConfig)
    const sortedRooms = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedRooms);
  };
  const handleClickBookingStatus = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) {
      handleCancel(row.id);
    }
  }
  return (
    <>
   
    <div className='flex justify-center flex-col'>
    <table className='bg-blue mb-2'>
      <thead>
        <tr className='bg-blue-400 text-white'>
          {headerNames.map((header, index) => (
            <th className='p-2 border-2 rounded-md' key={header}>
              {header}
              <span
                className="cursor-pointer"
                onClick={() => handleSort(headers[index])}
              >
                ⬆️⬇️
              </span>
            </th>
          ))}
          <th>Thay đổi</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((row, rowIndex) => (
          <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-slate-200' : 'bg-slate-300 text-blue-500'}`}>
            {headers.map((header) => (
              <td  key={header}
              className={`text-center p-4 ${header === 'status' ? colorTextBookingStatus[row[header]] : ''}`}
              >
                {header === 'status' ?  bookingStatus[row[header]] :row[header]}
              </td>
            ))}
            
            
            <td className='text-center'>
              {
                row.status == null && (
                  <div className='flex justify-center'>

                    <ButtonCustom label="Edit" handleClick={handleClickEdit}></ButtonCustom>
                  </div>
                )
              }
              {row.status === 1 && (
                <div className='flex'>
                  <button className={`${colorButtonBookingStatus[2]} border-white border-2 rounded-md whitespace-nowrap p-2 mr-2 text-black`} onClick={handleClickBookingStatus}>Thanh toán</button>
                  <button className={`${colorButtonBookingStatus[5]} border-white border-2 rounded-md whitespace-nowrap p-2 text-black`}>Hủy đặt</button>
                </div>
              )}
              {row.status === 2 && (
                <div className='flex'>
                  <button className={`${colorButtonBookingStatus[3]} border-white border-2 rounded-md whitespace-nowrap p-2 mr-2 text-black`}>Checkin</button>
                  <button className={`${colorButtonBookingStatus[5]} border-white border-2 rounded-md whitespace-nowrap p-2 text-black`}>Hủy đặt</button>
                </div>
                
              )}
              {row.status === 3 && (
                <button className={`${colorButtonBookingStatus[4]} border-white border-2 rounded-md whitespace-nowrap p-2 text-black`}>Checkout</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='flex justify-end'>
      <div className="pagination flex items-center">
          <div className='mr-2'>Trang: </div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className='mr-2 p-2 border-2 rounded-md border-black w-10 h-10'
            >
              {`${index + 1}`}
            </button>
          ))}
        </div>
    </div>
    
    </div>
    
    </>
  );
};

export default FlexibleTable;
