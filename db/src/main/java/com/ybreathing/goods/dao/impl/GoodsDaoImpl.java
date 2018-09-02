package com.ybreathing.goods.dao.impl;

import com.ybreathing.goods.dao.GoodsDao;
import com.ybreathing.goods.model.Goods;
import com.ybreathing.goods.utils.BaseDaoImpl;
import org.springframework.stereotype.Repository;


@Repository("goodsDao")
public class GoodsDaoImpl extends BaseDaoImpl implements GoodsDao {
    public Goods fetchGoodsById(Integer id) {
        return this.getDao().fetch(Goods.class,id);
    }
}
