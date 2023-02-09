package com.ezpz.shabit.user.repository;

import com.ezpz.shabit.user.entity.Gallery;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
  List<Gallery> findByUserEmailAndPosturePostureId(String email, long postureId, Pageable pageable);

  List<Gallery> findByUserEmail(String email, Pageable pageable);

  long countByUserEmail(String email);

  long countByUserEmailAndPosturePostureId(String email, long postureId);
}
