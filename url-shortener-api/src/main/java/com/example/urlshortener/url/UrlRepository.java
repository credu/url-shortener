package com.example.urlshortener.url;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UrlRepository extends MongoRepository<Url, String> {
    Optional<Url> findByAlias(String alias);
    Optional<Url> findByAliasAndCreator(String alias, String creatorId);
    List<Url> findByCreator(String creatorId);
    boolean existsByAliasAndCreator(String alias, String creatorId);
    void deleteByAlias(String alias);
}
