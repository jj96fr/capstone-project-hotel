package com.hotel.management.controller;

import com.hotel.management.model.Booking;
import com.hotel.management.repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


// REST controller for bookings
@RestController
public class HotelController {

    // Booking Repository (for the booking table in the database)
    @Autowired
    private BookingRepo bookingRepo;

    // POST request for the route '/reservations'
    @CrossOrigin(origins = "http://localhost:3000") // CORS allows for localhost port 3000
    @PostMapping("/reservation")
    public String reserveARoom(@RequestBody Booking bookingRequest) {

        // save the received booking request in the db
        bookingRepo.save(bookingRequest);
        return "Successfully Booked";
    }

    // GET request for the route '/get_reservations'
    @CrossOrigin(origins = "http://localhost:3000") // CORS allows for localhost port 3000
    @GetMapping("/get_reservations")
    public String getAllReservations() {

        // get all reservations from the db
        List<Booking> bookingList = bookingRepo.findAll();
        // make a string form each object
        // this will look like an array of JSON objects
        List<String> returnString = new ArrayList<>();
        for (Booking booking : bookingList) {
            returnString.add(booking.toString());
        }
        // return
        return returnString.toString();
    }

    // PUT request fro payment completion
    @CrossOrigin(origins = "http://localhost:3000") // CORS allows for localhost port 3000
    @PutMapping("/payment_complete")
    public String completePayment(@RequestBody String id) {
        System.out.println(id.split(":")[1].replaceAll("}", ""));
        // get all reservation from the db by id
        Optional<Booking> bookingOp = bookingRepo.findById(Integer.parseInt(id.split(":")[1].replaceAll("}", "")));

        // if found
        if(bookingOp.isPresent()) {
            Booking booking = bookingOp.get();
            // set completion
            booking.setPayment(true);
            //save back
            bookingRepo.save(booking);
        }
        // return
        return "Successfully Payed";
    }
}
