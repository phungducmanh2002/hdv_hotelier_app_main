import { useState, useEffect } from 'react';
import { getImageById } from '@/modules/images/service';
import { deleteImageByHotelId, getImagesByHotelId } from '@/modules/hotels/service';
import { changeAvatarHotel } from '@/modules/hotels/service';
import ContextMenu from '../contextmenu';
const ImageList = ({ hotelId, reload, setReload}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageIds = await getImagesByHotelId(hotelId);
       
        const imagePromises = imageIds.data.map(async (id) => {
          const blob = await getImageById(id);
          return {
            id,
            url: URL.createObjectURL(blob),
          };
        });
        const imageList = await Promise.all(imagePromises);
        setImages(imageList);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, [reload]);
  const handleSetAvatar = async () => {
    if (contextMenu && contextMenu.image) {
      try {
        if (window.confirm("Bạn có chắc chọn ảnh này làm avatar không?")){
            changeAvatarHotel(hotelId, contextMenu.image.id).then((res)=>{
                if (res.code === 200){
                  alert("thay đổi avatar khách sạn thành công")
                  setReload(!reload);
                }
              })
        }
        
      } catch (error) {
        console.error('Error updating avatar:', error);
        alert('Failed to update avatar.');
      }
    }
  };
  const handleRightClick = (e, image) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      image,
    });
  };
  const handleDeleteImage = async () => {
    if (contextMenu && contextMenu.image) {
      try {
        if (window.confirm("Bạn có chắc xóa ảnh này không?")){
            deleteImageByHotelId(hotelId, contextMenu.image.id).then((res)=>{
                if (res.code === 200){
                  alert("thay đổi avatar khách sạn thành công")
                  setReload(!reload);
                }
              })
        }
        
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Failed to delete image.');
      }
    }
  };


  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div onClick={handleCloseContextMenu}>
      <h2>Một số ảnh khác của khách sạn</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <div key={image.id} style={{ margin: 10, position: 'relative' }}>
            <img
              src={image.url}
              alt={`Hotel Image ${image.id}`}
              width={100}
              height={100}
              onContextMenu={(e) => handleRightClick(e, image)}
              className='border-2 rounded-md p-2 border-blue-300'
            />
          </div>
        ))}
      </div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onSetAvatar={handleSetAvatar}
          onDelete={handleDeleteImage}
        />
      )}
    </div>
  );
};

export default ImageList;
