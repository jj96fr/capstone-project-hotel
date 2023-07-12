package com.hotel.management.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "booking") // table name in the database
public class Booking {

    // attributes
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment
    @Id
    private int id; // id
    private int roomId; // room id
    private String startDate; // Check In date
    private String endDate; // check out date
    private int adults; // number of adults in the room
    private int kids; // number of kids in the room
    private int price; // cost
    private String name; // name of the room
    private boolean payment; // whether payment is completed or not

    // to string method displays the Booking in JSON format
    @Override
    public String toString() {
        return "{" +
                "\"id\": " + id +
                ",\"roomId\": " + roomId +
                ",\"startDate\": \"" + startDate + "\"" +
                ",\"endDate\": \"" + endDate + "\"" +
                ",\"adults\": " + adults +
                ",\"kids\": " + kids +
                ",\"price\": " + price +
                ",\"name\": \"" + name + "\"" +
                ",\"payment\": " + payment +
                '}';
    }
}
