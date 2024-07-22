package com.ssafy.itclips.tmp.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1376763578L;

    public static final QUser user = new QUser("user");

    public final DateTimePath<java.time.Instant> birth = createDateTime("birth", java.time.Instant.class);

    public final ListPath<com.ssafy.itclips.bookmarklist.entity.BookmarkList, com.ssafy.itclips.bookmarklist.entity.QBookmarkList> bookmarkLists = this.<com.ssafy.itclips.bookmarklist.entity.BookmarkList, com.ssafy.itclips.bookmarklist.entity.QBookmarkList>createList("bookmarkLists", com.ssafy.itclips.bookmarklist.entity.BookmarkList.class, com.ssafy.itclips.bookmarklist.entity.QBookmarkList.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.Instant> createdAt = createDateTime("createdAt", java.time.Instant.class);

    public final BooleanPath darkMode = createBoolean("darkMode");

    public final StringPath email = createString("email");

    public final BooleanPath gender = createBoolean("gender");

    public final ListPath<com.ssafy.itclips.group.entity.UserGroup, com.ssafy.itclips.group.entity.QUserGroup> groups = this.<com.ssafy.itclips.group.entity.UserGroup, com.ssafy.itclips.group.entity.QUserGroup>createList("groups", com.ssafy.itclips.group.entity.UserGroup.class, com.ssafy.itclips.group.entity.QUserGroup.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath job = createString("job");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath profileImage = createString("profileImage");

    public final StringPath refreshToken = createString("refreshToken");

    public final EnumPath<com.ssafy.itclips.tmp.Role> role = createEnum("role", com.ssafy.itclips.tmp.Role.class);

    public final DateTimePath<java.time.Instant> updatedAt = createDateTime("updatedAt", java.time.Instant.class);

    public final SetPath<com.ssafy.itclips.tmp.UserTag, com.ssafy.itclips.tmp.QUserTag> userTags = this.<com.ssafy.itclips.tmp.UserTag, com.ssafy.itclips.tmp.QUserTag>createSet("userTags", com.ssafy.itclips.tmp.UserTag.class, com.ssafy.itclips.tmp.QUserTag.class, PathInits.DIRECT2);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

