package org.judexmars.db2d.exception;

import lombok.Getter;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final Object id; // object in case of composite keys

    private final String resourceName;

    public ResourceNotFoundException(String resourceName, Object id) {
        super(String.format("%s %s не найден", resourceName, id));
        this.id = id;
        this.resourceName = resourceName;
    }
}
