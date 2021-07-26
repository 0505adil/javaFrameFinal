package com.example.javaFrameFinal.controllers;

import com.example.javaFrameFinal.exceptions.ServiceException;
import com.example.javaFrameFinal.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/roles")
public class RoleRestController {
    private RoleService roleService;


    @Autowired
    public RoleRestController(RoleService roleService){
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(roleService.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) throws ServiceException {
        return new ResponseEntity<>(roleService.findById(id), HttpStatus.OK);
    }
}
