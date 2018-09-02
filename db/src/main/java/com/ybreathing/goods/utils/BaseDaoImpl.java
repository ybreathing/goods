package com.ybreathing.goods.utils;


import org.apache.commons.lang.StringUtils;
import org.nutz.dao.Dao;
import org.nutz.dao.impl.FileSqlManager;
import org.nutz.dao.impl.NutDao;
import org.nutz.dao.sql.Sql;
import org.nutz.dao.sql.SqlCallback;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public abstract class BaseDaoImpl {

	@Autowired
	private Dao dao;

	protected Dao getDao() {
		return dao;
	}

	protected Dao getDao(String fileName) {
		((NutDao)dao).setSqlManager(new FileSqlManager(fileName));
		return dao;
	}

	/**
	 * 给原SQL语句的最外层加上计数语句，修改后的SQL返回结果只有一个Int类型的数据
	 *
	 * @param originalSql 待修改的SQL
	 * @return 修改后的SQL文本
	 */
	protected String wrapperCountSql(String originalSql) {
		if (StringUtils.isBlank(originalSql)) {
			return StringUtils.EMPTY;
		}
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT COUNT(1) AS COUNT FROM (\n");
		sb.append(originalSql);
		sb.append("\n) INTERNAL");
		return sb.toString();
	}

	/**
	 * 计算总记录数, 此方法会修改传入的Sql对象，所以应该在查询的最后才去调用
	 *
	 * @param sql 已经设置好参数的Sql，SQL文本中不可以带有分页语句
	 * @return 总记录数
	 */
	protected int getRecordCount(String originalSql, Sql sql) {
		String wrapperedSql = wrapperCountSql(originalSql);
		sql.setSourceSql(wrapperedSql);
		sql.setPager(null);
		sql.getContext().setResult(null);
		sql.setCallback(new SqlCallback() {


			public Object invoke(Connection conn, ResultSet rs, Sql sql) throws SQLException {
				List<Integer> result = new ArrayList<Integer>();
				while (rs.next()) {
					result.add(rs.getInt(1));
				}
				return result;
			}
		});
		dao.execute(sql);
		return sql.getInt();
	}

	
}
