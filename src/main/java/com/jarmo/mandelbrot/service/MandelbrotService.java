package com.jarmo.mandelbrot.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jarmo.mandelbrot.domain.Mandelbrot;
import com.jarmo.mandelbrot.domain.MandelbrotRepository;

@Service
public class MandelbrotService {
    @Autowired
    private MandelbrotRepository repo;
    
    public List<Mandelbrot> findByName(String name) {
        return repo.findByName(name);
    }
    
    public void addNewMandelbrot(Mandelbrot mandelbrot) {
        repo.save(mandelbrot);
    }

    public void deleteMandelbrot(Long id) {
        repo.delete(id);
    }
    
    public List<Mandelbrot> findAll() {
        return repo.findAll();
    }    
}
