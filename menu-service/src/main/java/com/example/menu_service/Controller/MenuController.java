package com.example.menu_service.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.menu_service.Entity.Menu;
import com.example.menu_service.Service.MenuService;

@RestController
@RequestMapping("/menus")
@CrossOrigin("*")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping(value = "/add",
            consumes = "multipart/form-data")
    public Menu addMenu(

            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam String mealType,
            @RequestParam Boolean vegetarian,
            @RequestParam(required = false)
            MultipartFile image

    ) throws IOException {

        return menuService.addMenu(
                name,
                description,
                price,
                mealType,
                vegetarian,
                image
        );
    }

    @GetMapping
    public List<Menu> getAllMenus() {

        return menuService.getAllMenus();
    }

    @GetMapping("/{id}")
    public Menu getMenuById(
            @PathVariable Long id) {

        return menuService.getMenuById(id);
    }

    @PutMapping("/{id}")
    public Menu updateMenu(
            @PathVariable Long id,
            @RequestBody Menu menu) {

        return menuService.updateMenu(id, menu);
    }

    @DeleteMapping("/{id}")
    public String deleteMenu(
            @PathVariable Long id) {

        menuService.deleteMenu(id);

        return "Menu Deleted Successfully";
    }
}