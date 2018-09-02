package com.ybreathing.goods.utils;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

/**
 * 分页标签工具类
 *
 * @author ghq
 * @date 2014年10月21日17:25:31
 */

public class PageTag extends TagSupport {

	private static final long serialVersionUID = 1L;
	private String totalRecoders;
	private String pageNo;
	private String totalPages;
	private String pre;
	private String next;

	public void setNext(String next) {
		this.next = next;
	}

	public void setPre(String pre) {
		this.pre = pre;
	}

	public void setTotalPages(String totalPages) {
		this.totalPages = totalPages;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public void setTotalRecoders(String totalRecoders) {
		this.totalRecoders = totalRecoders;
	}

	@Override
	public int doStartTag() throws JspException {
		StringBuilder sb = new StringBuilder();
		sb.append(" <div class='pager'>");
		sb.append("共");
		sb.append(totalRecoders);
		sb.append("条记录 ");
		sb.append("第");
		sb.append(pageNo);
		sb.append("页/共");
		sb.append(totalPages);
		sb.append("页 ");
		sb.append("<a href='javascript:doPage(1)'>第一页</a> ");
		sb.append("<a href='javascript:doPage(");
		sb.append(pre);
		sb.append(")'>上一页</a> ");
		sb.append("<a href='javascript:doPage(");
		sb.append(next);
		sb.append(")'>下一页</a> ");
		sb.append("<a href='javascript:doPage(");
		sb.append(totalPages);
		sb.append(")'>最后一页</a> ");
		sb.append("转到<input type='text' name='pageNo' id='pageNo' style='width:30px' value='' />页 ");
		sb.append("<input type='button' value='GO' style='width:50px;' onclick='javascript:doPage()'/>");
		sb.append("</div>");

		try {
			if (sb != null) {
				JspWriter out = pageContext.getOut();
				out.print(sb);
			}
		} catch (Exception e) {
			throw new JspException("错误");
		}

		return EVAL_PAGE;
	}
}
