//TODO: Please write code in this file.
var allItems = loadAllItems();
var promotions = loadPromotions();	
var sumPrice = 0;
var tempPrice = 0;
var savePrice = 0;
	
function printInventory(inputs)
{
	var output ='***<没钱赚商店>购物清单***\n';
	
	//array,count分别保存输入测试用例的商品种类和商品购买个数
	var array = new Array();
	var count = new Array();
	processInputs(inputs, array, count);
	
	output = output + getPrice(array, count);
	
	output = output + '----------------------\n'+'挥泪赠送商品：\n';
	output = output + getSendProducts(array, count);
	savePrice = tempPrice - sumPrice;
	
	output = output + '----------------------\n'+'总计：'+toDecimal2(sumPrice)+'(元)\n'+'节省：'+toDecimal2(savePrice)+'(元)\n';
	output = output + '**********************';
	
	console.log(output);
}

//针对小票物品的id及购买个数，计算价格
function getPrice(array, count)
{	var outputPriceStr = '';

	for(var i=0;i<array.length;i++)
	{
		var productID = array[i];
		var num = count[i];
		var name;
		var unit;
		var price;
		var totalPrice;
		
		for(var j=0;j<allItems.length;j++)
		{
			var temp = allItems[j];
			if(temp.barcode == productID)
			{
				name = temp.name;
				unit = temp.unit;
				price = temp.price;
				break;
			}
			
		}
		//计算价格

		totalPrice = price*num;	
		tempPrice = tempPrice + totalPrice;
		for(var k=0;k<promotions.length;k++)
		{
			var promooTest = promotions[k];
			if(promooTest.type == 'BUY_TWO_GET_ONE_FREE')
			{
				var lists = promooTest.barcodes;
				for(var m=0;m<lists.length;m++)
				{
					if(lists[m] == productID)
					{
						//
						totalPrice = price*num - price*parseInt(num/3);
						break;
					}
				}
			}
		}
		
		sumPrice = sumPrice + totalPrice;
		
		outputPriceStr = outputPriceStr + '名称：'+name+'，数量：'+num+unit+'，单价：'+toDecimal2(price)+'(元)，小计：'+toDecimal2(totalPrice)+'(元)\n';
	}
	
	return outputPriceStr;
}


function getSendProducts(array, count)
{
	var sendProductStr = '';
	for(var i=0;i<array.length;i++)
	{
		var productID = array[i];
		var num = count[i];
		var name;
		var unit;
		
		//获取商品ID对应的商品名和商品计量单位
		for(var j=0;j<allItems.length;j++)
		{
			var temp = allItems[j];
			if(temp.barcode == productID)
			{
				name = temp.name;
				unit = temp.unit;	
			}
			
		}
		
		for(var k=0;k<promotions.length;k++)
		{
			var promooTest = promotions[k];
			if(promooTest.type == 'BUY_TWO_GET_ONE_FREE')
			{
				var lists = promooTest.barcodes;
				for(var m=0;m<lists.length;m++)
				{
					if(lists[m] == productID)
					{
						var sendNum = parseInt(num/3);
						sendProductStr = sendProductStr + '名称：'+name+'，数量：'+sendNum+unit+'\n';
					}
				}
			}
		}
		
	}
	return sendProductStr;
}


//处理输入，统计输入数组中元素的种类及个数
function processInputs(inputs, array, count)
{
	var num = 1;
	var temp = null;
	var size = inputs.length;
	
/*	for(var i=0;i<size;i++)
	{
		for(var j=i+1;j<size;j++)
		{
			if(inputs[i] == inputs[j])
			{
				temp = inputs[j];
				inputs[j] = inputs[size-1];
				inputs[size-1] = temp;
				size--;
				j--;
				num++;
			}
		}
		array[i] = inputs[i];
		count[i] = num;
		num = 1;
	}
	*/
	
	
	for(var i=0, k=0;i<size;)
	{
		for(var j=i+1;j<size;j++)
		{
			if(inputs[i] == inputs[j])
			{
				num++;
			}
			else
			{
				break;
			}
		}
		
				
		array[k] = inputs[i];
		count[k] = num;
		
		i = i+num;
		k++;
		num = 1;
	}
	
	//处理所有array中的ID，因为有的ID不够标准
	for(var i=0;i<array.length;i++)
	{
		var temp = array[i];
		if(temp.indexOf('-') != -1)
		{
			var words = temp.split('-');
			array[i] = words[0];
			count[i] = words[1];
			
		}
	}
}

 //制保留2位小数，如：2，会在2后面补上00.即2.00    
        function toDecimal2(x) {    
            var f = parseFloat(x);    
            if (isNaN(f)) {    
                return x;    
            }    
            var f = Math.round(x*100)/100;    
            var s = f.toString();    
            var rs = s.indexOf('.');    
            if (rs < 0) {    
                rs = s.length;    
                s += '.';    
            }    
            while (s.length <= rs + 2) {    
                s += '0';    
            }    
            return s;    
        }    