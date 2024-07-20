package com.ssafy.itclips.chat.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "chat", schema = "itclips")
public class Chat {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "room_id", nullable = false)
    private ChatRoom room;

    public void setUser(User user) {
        this.user = user;
        if(!user.getChatList().contains(this)){
            user.getChatList().add(this);
        }
        //삭제 수정해야함
    }

    public void setChatRoom(ChatRoom room) {
        this.room = room;
        if(!room.getChatList().contains(this)){
            room.getChatList().add(this);
        }
        //삭제 수정해야함
    }


}
