package com.example.menu_service.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.menu_service.Entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
	List<Menu> findByMealType(String mealType);

	List<Menu> findByVegetarian(Boolean vegetarian);

	List<Menu> findByAvailable(Boolean available);
	
}
