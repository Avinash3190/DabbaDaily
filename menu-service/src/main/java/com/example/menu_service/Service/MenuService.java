package com.example.menu_service.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.menu_service.Entity.Menu;
import com.example.menu_service.Repository.MenuRepository;

@Service
public class MenuService {
	
	private final MenuRepository menuRepository;
	
	public MenuService(MenuRepository menuRepository) {
		this.menuRepository = menuRepository;
	}

	public static final String UPLOAD_DIR = "uploads/";
	
	public Menu addMenu(
            String name,
            String description,
            Double price,
            String mealType,
            Boolean vegetarian,
            MultipartFile image) throws IOException {

        String imagePath = null;

        if (image != null && !image.isEmpty()) {

            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String fileName =
                    UUID.randomUUID() + "_" + image.getOriginalFilename();

            Path path = Paths.get(UPLOAD_DIR, fileName);

            Files.copy(
                    image.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );

            imagePath = "/uploads/" + fileName;
        }

        Menu menu = new Menu();

        menu.setName(name);
        menu.setDescription(description);
        menu.setPrice(price);
        menu.setMealType(mealType);
        menu.setVegetarian(vegetarian);
        menu.setImageUrl(imagePath);

        return menuRepository.save(menu);
    }
	
	public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }
	
	public Menu getMenuById(Long id) {

        return menuRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Menu Not Found"));
    }
	
	public Menu updateMenu(Long id, Menu updatedMenu) {

        Menu menu = getMenuById(id);

        menu.setName(updatedMenu.getName());
        menu.setDescription(updatedMenu.getDescription());
        menu.setPrice(updatedMenu.getPrice());
        menu.setMealType(updatedMenu.getMealType());
        menu.setVegetarian(updatedMenu.getVegetarian());

        return menuRepository.save(menu);
    }
	
	public void deleteMenu(Long id) {

        menuRepository.deleteById(id);
    }
}
