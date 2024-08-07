package com.ssafy.itclips.chat.entity;

import com.ssafy.itclips.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "chat", schema = "itclips")
@NoArgsConstructor
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @NotNull
    @ColumnDefault("0")
    @JoinColumn(name = "message_cnt", nullable = false)
    private Long messageCnt;

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

    @Builder
    public Chat(Long id, User user, ChatRoom room, Long messageCnt) {
        this.id = id;
        this.user = user;
        this.room = room;
        this.messageCnt = messageCnt;
    }

    public void cnt(){
        messageCnt++;
    }

    public void setZero(){
        messageCnt=0L;
    }
}
