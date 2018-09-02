package com.ybreathing.goods.model;

import org.nutz.dao.entity.annotation.*;

import java.math.BigDecimal;

@Table("goods")
public class Goods {
    @Id
    @Column("Id")
    private Integer Id;

    @Column("goodName")
    private String goodName;

    @Column("goodPrice")
    private BigDecimal goodPrice;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
    }

    public BigDecimal getGoodPrice() {
        return goodPrice;
    }

    public void setGoodPrice(BigDecimal goodPrice) {
        this.goodPrice = goodPrice;
    }
}
