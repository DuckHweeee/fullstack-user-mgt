package com.example.UserManagement.entity;


import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String emailId;
    private String role;
    private String status;
    private final Timestamp createTime;
    private String password;

    public UserEntity(long id, String name, String emailId, String role, String status, Timestamp createTime) {
        this.id = id;
        this.name = name;
        this.emailId = emailId;
        this.role = role;
        this.status = status;
        this.createTime = createTime;
    }

    public UserEntity(long id) {
        this.id = id;
        this.createTime = new Timestamp(System.currentTimeMillis());
    }

    public UserEntity() {
        this.createTime = new Timestamp(System.currentTimeMillis());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
