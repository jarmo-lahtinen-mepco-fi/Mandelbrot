package com.jarmo.mandelbrot.domain;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MandelbrotRepository extends MongoRepository<Mandelbrot, Long> {
    public List<Mandelbrot> mandelbrotList = new ArrayList<>();
    
    public List<Mandelbrot> findByName(String name);
    
    @Override
    public List<Mandelbrot> findAll();
    
    public boolean deleteByName(String name);
}
