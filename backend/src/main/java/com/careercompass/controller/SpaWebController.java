package com.careercompass.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller to forward SPA (Single Page Application) client-side routes
 * to index.html so React Router handles the navigation properly.
 */
@Controller
public class SpaWebController {

    @GetMapping(value = {
        "/",
        "/login",
        "/register",
        "/dashboard",
        "/assessment",
        "/recommendations",
        "/skill-gap",
        "/roadmap",
        "/jobs",
        "/jobs/**",
        "/admin",
        "/admin/**"
    })
    public String forwardSpaRoutes() {
        return "forward:/index.html";
    }
}
