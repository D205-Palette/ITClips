package com.ssafy.itclips.chat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Chat {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;


    private Long userId;
    private Long roomId;

}
