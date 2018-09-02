package com.ybreathing.goods.dao;

import com.ybreathing.goods.model.Goods;

public interface GoodsDao {

    Goods fetchGoodsById(Integer id);

}
