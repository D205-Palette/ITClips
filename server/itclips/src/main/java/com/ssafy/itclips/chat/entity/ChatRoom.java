package com.ssafy.itclips.chat.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "chat_room", schema = "itclips")
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Size(max = 255)
    @NotNull
    @Column(name = "name", nullable = false, length = 255)
    private String name;


    //역방향 채팅룸에 속한 user누군지 알기 위함
    //chat
    @OneToMany(mappedBy = "room")
    private List<Chat> chatList = new ArrayList<Chat>();

    // 마지막 메세지
    @Column(name = "last_message", length = 255)
    private String lastMessage;

    // 마지막 변경 시점
    @UpdateTimestamp
    @Column(name = "last_modified")
    private LocalDateTime lastModified;

    @Builder
    public ChatRoom(Long id, String name, String lastMessage, LocalDateTime lastModified) {
        this.id = id;
        this.name = name;
        this.lastMessage = lastMessage;
        this.lastModified = lastModified;
    }

}


