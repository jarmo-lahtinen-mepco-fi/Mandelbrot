package com.jarmo.mandelbrot.web;

import com.jarmo.mandelbrot.domain.Mandelbrot;
import com.jarmo.mandelbrot.service.MandelbrotService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MandelbrotController {
    @Autowired
    private MandelbrotService service;
    
    @RequestMapping("rest/mandelbrot/get/{name}")
    @ResponseBody
    public List<Mandelbrot> findByName(@PathVariable("name") String name) {
        return service.findByName(name);
    }

    @RequestMapping("rest/mandelbrot/add")
    @ResponseBody
    public String addNewMandelbrot(@RequestBody Mandelbrot mandelbrot) {
        service.addNewMandelbrot(mandelbrot);
        return "add new mandelbrot success!";
    }
    
    @RequestMapping("/rest/mandelbrot/delete")
    @ResponseBody
    public String deleteMandelbrot(@RequestBody Long id) {
        service.deleteMandelbrot(id);
        return "delete mandelbrot success!";
    }
    
    @RequestMapping("rest/mandelbrot/findall")
    public @ResponseBody List<Mandelbrot> findAll() {
        return service.findAll();
    }
}
