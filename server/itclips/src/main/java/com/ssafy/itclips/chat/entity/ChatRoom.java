package com.ssafy.itclips.chat.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "chat_room", schema = "itclips")
public class ChatRoom {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @Size(max = 20)
    @NotNull
    @Column(name = "name", nullable = false, length = 20)
    private String name;


    //역방향 채팅룸에 속한 user누군지 알기 위함
    //chat
    @OneToMany(mappedBy = "room")
    private List<Chat> chatList = new ArrayList<Chat>();

}


