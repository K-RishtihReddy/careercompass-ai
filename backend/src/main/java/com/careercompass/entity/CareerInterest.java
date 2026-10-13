package com.careercompass.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "career_interests", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "interest"})
})
public class CareerInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false, length = 100)
    private String interest;

    public CareerInterest() {}

    public CareerInterest(User user, String interest) {
        this.user = user;
        this.interest = interest;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getInterest() { return interest; }
    public void setInterest(String interest) { this.interest = interest; }
}
