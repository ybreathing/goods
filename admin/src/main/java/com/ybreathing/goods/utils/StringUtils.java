/**
 * 
 */
package com.ybreathing.goods.utils;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 字符串工具类
 * @author
 * @date 2011-12-21
 */
public class StringUtils extends org.apache.commons.lang.StringUtils {
	
	/**
	 * 过滤掉特殊字符$
	 * @param str
	 * @return
	 */
	public static String filterDollarStr(String str) {
		String sReturn = "";
		if(StringUtils.isEmpty(str)){
			return sReturn;
		}
		if (!StringUtils.trim(str).equals("")) {
			if (str.indexOf('$', 0) > -1) {
				while (str.length() > 0) {
					if (str.indexOf('$', 0) > -1) {
						sReturn += str.subSequence(0, str.indexOf('$', 0));
						sReturn += "\\$";
						str = str.substring(str.indexOf('$', 0) + 1, str
								.length());
					} else {
						sReturn += str;
						str = "";
					}
				}
			} else {
				sReturn = str;
			}
		}
		return sReturn;
	}
	
	/**
	 * 描述：根据时间戳生成系列号(请求唯一标识)
	 * */
	public synchronized static String getReqSeq(){
		String random_1 = String.valueOf(Math.random()*10000000);
    	String random_2 = String.valueOf(Math.random()*10000000);
    	return random_1.substring(0, 6)+random_2.substring(0, 6);
	}
	/**
	 * 获取异常信息
	 * */
	public static  String toStringException(Exception e){
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		e.printStackTrace(pw);
		pw.close();
		return sw.toString();
	}

	public static String formatBankAcctNo(String acctNo){
		int split = 4;
		String space = " ";

		StringBuffer retStr = new StringBuffer("");

		acctNo = acctNo.trim();
		acctNo = acctNo.replace(space, "");

		for(int i = 0; i < acctNo.length(); i++){
			retStr.append(acctNo.charAt(i));
			if( i % split == (split - 1)){
				retStr.append(space);
			}
		}

		return retStr.toString();
	}

	/**
	 * @param regex
	 * 正则表达式字符串
	 * @param str
	 * 要匹配的字符串
	 * @return 如果str 符合 regex的正则表达式格式,返回true, 否则返回 false;
	 */
	private static boolean match(String regex, String str) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(str);
		return matcher.matches();
	}

	public static boolean isCard(String regex, String idCard) {
		return match(regex, idCard);
	}

	//手机号模糊化
	public static String  getPhone(String phone2){
		return   phone2.substring(0,3) + "****" + phone2.substring(7, phone2.length());
	}

	//模糊化身份证号 18位
	public  static String  fuzzyIdCardEighteen(String idCard){
		if(idCard == null){
			return idCard;
		}else{
			return   idCard.substring(0,6) + "**********" + idCard.substring(16, idCard.length());
		}
	}

	//模糊化身份证号 15位
	public  static String  fuzzyIdCardFifteen(String idCard){
		if(idCard == null){
			return idCard;
		}else{
			return   idCard.substring(0,6) + "*******" + idCard.substring(13, idCard.length());
		}
	}

}
