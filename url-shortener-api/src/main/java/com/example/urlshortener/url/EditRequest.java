package com.example.urlshortener.url;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class EditRequest {
    @Pattern(regexp = "[a-zA-Z0-9-]+", message = "The Alias must have only letters, numbers or dashes")
    private String alias;
    @Pattern(regexp = "(((http|https):\\/\\/)|(\\/)|(..\\/))(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?", message = "The Url is invalid")
    private String url;

    public boolean hasValues() {
        return alias != null || url != null;
    }
}
