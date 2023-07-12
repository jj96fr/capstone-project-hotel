package com.hotel.management.repo;

import com.hotel.management.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// JPA repository for Bookings
@RepositoryRestResource
public interface BookingRepo extends JpaRepository<Booking, Integer> {

}
