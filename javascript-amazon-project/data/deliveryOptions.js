import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
    { id: '1', deliverDays: 7, price: 0 }, 
    { id: '2', deliverDays: 3, price: 499 }, 
    { id: '3', deliverDays: 1, price: 999 }
];

export function deliveryDate(deliveryId) {
    const options = deliveryOptions;
    const today = dayjs();
    const option = options.find((option) => option.id === deliveryId);
    const deliveryDays = option.deliverDays;
    const deliveryDate = today.add(deliveryDays, 'days').format('dddd, MMMM D');
    return deliveryDate;
}