package com.ybreathing.goods.goodsInfo;

import com.ybreathing.goods.goodsInfo.service.GoodsService;
import com.ybreathing.goods.model.Goods;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/goods")
public class GoodsController {

    protected final Logger log = LoggerFactory.getLogger(GoodsController.class);

    @Autowired
    private GoodsService goodsService;

    @RequestMapping("/getGoodsInfo")
    public ModelAndView getGoodsInfo(Integer id) {
        ModelAndView model = new ModelAndView("/goods/goodsInfo");
        Goods goods = goodsService.fetchGoodsInfo(id);
        model.addObject("goods", goods);
        return model;
    }
}
