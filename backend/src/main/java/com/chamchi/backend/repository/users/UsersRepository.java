package com.chamchi.backend.repository.users;

import com.chamchi.backend.domain.users.Users;
import com.chamchi.backend.util.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
//    Optional<Users> findByEmailAndProvider(String email, String provider);

    Optional<Users> findByUserId(String userId);
    Boolean existsByUserId(String userId);
}
