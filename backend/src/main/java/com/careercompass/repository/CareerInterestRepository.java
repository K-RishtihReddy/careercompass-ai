package com.careercompass.repository;

import com.careercompass.entity.CareerInterest;
import com.careercompass.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerInterestRepository extends JpaRepository<CareerInterest, Long> {
    List<CareerInterest> findByUser(User user);
    void deleteByUser(User user);
}
