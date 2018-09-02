package com.ybreathing.goods.goodsInfo.service.Impl;

import com.ybreathing.goods.dao.GoodsDao;
import com.ybreathing.goods.goodsInfo.service.GoodsService;
import com.ybreathing.goods.model.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("goodsService")
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    private GoodsDao goodsDao;

    public Goods fetchGoodsInfo(Integer id) {
        return goodsDao.fetchGoodsById(id);
    }
}
