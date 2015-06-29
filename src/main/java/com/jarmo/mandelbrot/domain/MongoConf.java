package com.jarmo.mandelbrot.domain;

import com.mongodb.Mongo;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

@Configuration
public class MongoConf extends AbstractMongoConfiguration {

    @Override
    protected String getDatabaseName() {
        return "mandelbrot";
    }

    @Override
    public Mongo mongo() throws Exception {
        return new Mongo();
    }
    
}
