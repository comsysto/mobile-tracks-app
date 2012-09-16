package com.comsysto.labs.mobile.tracks.track;

import java.io.Serializable;

public class Position implements Serializable {
    
    private Double lon;
    private Double lat;
    private Double ele;

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getEle() {
        return ele;
    }

    public void setEle(Double ele) {
        this.ele = ele;
    }
}
