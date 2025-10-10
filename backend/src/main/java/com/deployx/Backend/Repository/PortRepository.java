package com.deployx.Backend.Repository;

import com.deployx.Backend.Model.Port;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PortRepository extends JpaRepository<Port, Integer> {

    @Query(
            value = "SELECT * FROM ports WHERE status = 'AVAILABLE' LIMIT 1 FOR UPDATE SKIP LOCKED",
            nativeQuery = true
    )
    Port findOneAvailablePortWithLock();

}
