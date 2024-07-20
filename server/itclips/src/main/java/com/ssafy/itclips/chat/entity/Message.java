package com.ssafy.itclips.chat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Timestamp;

@Entity
public class Message {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @Column(name="message")
    private String message;

    @Column(name="read")
    private boolean read;

    @Column(name="create_at")
    private Timestamp createAt;

    @Column(name="chat_id")
    private Long chatId;

}
