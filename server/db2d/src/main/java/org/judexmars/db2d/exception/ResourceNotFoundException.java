package org.judexmars.db2d.exception;

import lombok.Getter;

@Getter
public class ResourceNotFoundException extends BaseNotFoundException {

    public ResourceNotFoundException(String resourceName, Object id) {
        super("exception.resource_not_found", resourceName, id);
    }
}
