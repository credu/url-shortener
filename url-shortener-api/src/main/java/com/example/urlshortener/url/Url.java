package com.example.urlshortener.url;

import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Url {
    @MongoId
    private String id;
    @Indexed(unique = true)
    @NonNull
    private String alias;
    @NonNull
    private String url;
    @NonNull
    private String creator;
}
