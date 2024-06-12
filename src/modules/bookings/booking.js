import api_booking from "@/utils/api_booking_service"
export const updateStatuBooking = async (idBooking, status) => {
    try {
        const response = await api_booking.put(`/bookings/${idBooking}?status=${status}`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};