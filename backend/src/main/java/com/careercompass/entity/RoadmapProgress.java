package com.careercompass.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "roadmap_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "roadmap_id"})
})
public class RoadmapProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roadmap_id", nullable = false)
    private CareerRoadmap roadmap;

    private Boolean isCompleted = false;

    private LocalDateTime completedAt;

    public RoadmapProgress() {}

    public RoadmapProgress(User user, CareerRoadmap roadmap, Boolean isCompleted) {
        this.user = user;
        this.roadmap = roadmap;
        this.isCompleted = isCompleted;
        if (Boolean.TRUE.equals(isCompleted)) {
            this.completedAt = LocalDateTime.now();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public CareerRoadmap getRoadmap() { return roadmap; }
    public void setRoadmap(CareerRoadmap roadmap) { this.roadmap = roadmap; }

    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
        if (Boolean.TRUE.equals(isCompleted)) {
            this.completedAt = LocalDateTime.now();
        } else {
            this.completedAt = null;
        }
    }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
