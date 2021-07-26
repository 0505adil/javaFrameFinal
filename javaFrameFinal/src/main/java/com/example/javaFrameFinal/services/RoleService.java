package com.example.javaFrameFinal.services;

import com.example.javaFrameFinal.exceptions.ServiceException;
import com.example.javaFrameFinal.models.entities.Role;
import java.util.List;
public interface RoleService {
    Role findById(Long id) throws ServiceException;
    List<Role> findAll();
    Role update(Role role) throws ServiceException ;
    Role save(Role role) throws ServiceException ;
    void delete(Role role) throws ServiceException ;
    void deleteById(Long id) throws ServiceException ;
}
