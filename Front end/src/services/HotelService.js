import { Get, Post, Put, Delete } from './api';

// the function to reserve a new room
export const reserveARoom = async (data) => {
    try {
        const response = await Post('/reservation', data);
        return response;
    } catch (error) {

    }
}

// the function to get all reservations
export const getAllReservations = async () => {
    try {
        const response = await Get('/get_reservations');
        return response;
    } catch (error) {

    }
}

// the function to complete the payment
export const completePayment = async (id) => {
    try {
        const response = await Put('/payment_complete', { id });
        return response;
    } catch (error) {

    }
}