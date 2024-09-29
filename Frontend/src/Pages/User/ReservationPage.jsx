import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Layout/UserLayout/Header';
import Reservation from '../../Components/User/Reservation';

const ReservationPage = () => {
  const location = useLocation();
  const { proData, pricePerMonth, durationInMonths ,checkInDate,checkOutDate } = location.state; // Access passed data

  return (
    <>
      <Header />
      <Reservation proData={proData} durationInMonths={durationInMonths}  pricePerMonth={pricePerMonth} checkInDate={checkInDate} checkOutDate={checkOutDate} />
    </>
  );
};

export default ReservationPage;
