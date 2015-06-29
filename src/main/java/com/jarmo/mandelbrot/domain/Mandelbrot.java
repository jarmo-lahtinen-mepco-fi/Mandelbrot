package com.jarmo.mandelbrot.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="mandelbrot")
public class Mandelbrot {
 
    @Id
    private Long id;
    private String name;
    private int xstart;
    private int ystart;
    private int xzoom;
    private int yzoom;
    private int iterations;

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the xstart
     */
    public int getXstart() {
        return xstart;
    }

    /**
     * @param xstart the xstart to set
     */
    public void setXstart(int xstart) {
        this.xstart = xstart;
    }

    /**
     * @return the ystart
     */
    public int getYstart() {
        return ystart;
    }

    /**
     * @param ystart the ystart to set
     */
    public void setYstart(int ystart) {
        this.ystart = ystart;
    }

    /**
     * @return the xzoom
     */
    public int getXzoom() {
        return xzoom;
    }

    /**
     * @param xzoom the xzoom to set
     */
    public void setXzoom(int xzoom) {
        this.xzoom = xzoom;
    }

    /**
     * @return the yzoom
     */
    public int getYzoom() {
        return yzoom;
    }

    /**
     * @param yzoom the yzoom to set
     */
    public void setYzoom(int yzoom) {
        this.yzoom = yzoom;
    }

    /**
     * @return the iterations
     */
    public int getIterations() {
        return iterations;
    }

    /**
     * @param iterations the iterations to set
     */
    public void setIterations(int iterations) {
        this.iterations = iterations;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }
}
