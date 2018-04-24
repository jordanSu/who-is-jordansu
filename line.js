module.exports = {
    getCarousell: function(personal_data) {
        return {
    		type: "template",
    		altText: "你可以做些什麼？",
    		template: {
    			type: "carousel",
    			imageSize: "contain",
    			columns: [
              		{
                		"thumbnailImageUrl": "https://cdn1.iconfinder.com/data/icons/business-seo-vol-1/512/CV_Contract_Agreement_Resume_Paper_Document-512.png",
    					"imageBackgroundColor": "#0099AA",
    					"text": "您可以查看我的履歷～",
    					"actions": [
    						{
                  				"type": "uri",
                  				"label": "看看履歷",
                  				"uri": personal_data.cv
    						},
    					]
              		},
              		{
                		"thumbnailImageUrl": "https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/128/graduationcap.png",
    					"imageBackgroundColor": "#0099AA",
    					"text": "您可以查看我的學歷～",
    					"actions": [
    						{
                  				"type": "message",
                  				"label": "看看學歷",
                  				"text": "看看學歷"
                			}
    					]
              		},
              		{
                		"thumbnailImageUrl": "https://cdn.iconscout.com/public/images/icon/premium/png-256/sharing-experience-thought-communication-relation-348938d2d9d609f5-256x256.png",
    					"imageBackgroundColor": "#0099AA",
    					"text": "您可以了解我的實習經驗～",
    					"actions": [
    						{
                  				"type": "message",
                  				"label": "看看實習經驗",
                  				"text": "看看實習經驗"
                			}
    					]
              		},
    				{
                		"thumbnailImageUrl": "https://cdn4.iconfinder.com/data/icons/trophy-and-awards-1/64/Icon_Medal_Trophy_Awards_Blue-256.png",
    					"imageBackgroundColor": "#0099AA",
    					"text": "您可以了解我的比賽與得獎經歷～",
    					"actions": [
    						{
                  				"type": "message",
                  				"label": "比賽與得獎經歷",
                  				"text": "比賽與得獎經歷"
                			}
    					]
              		}
          		]
    		}
    	};
    },
    parseMessage: function(keywords_list, message) {
        for(var keyword in keywords_list) {
    		if(keywords_list[keyword].some((word) => message.includes(word)))
    			return keyword;
    	}
    },
    getReplyMessage: function(personal_data, keyword) {
        var replyMessage = [];
    	switch(keyword) {
    		case "cv":
    			replyMessage.push({type: 'text', text: "Hello, 這是我的履歷連結喔～"});
    			replyMessage.push({type: 'text', text: personal_data.cv});
    			break;
    		case "education":
    			replyMessage.push({type: 'text', text: "Hello, 這是我的學歷唷～"});
    			personal_data.education.forEach((message) => {
    				replyMessage.push({type: 'text', text: message});
    			});
    			break;
    		case "award":
    			replyMessage.push({type: 'text', text: "Hello\n這是我的比賽與得獎經歷喔～"});
    			personal_data.award.forEach((message) => {
    				replyMessage.push({type: 'text', text: message});
    			});
    			break;
    		case "internship":
    			replyMessage.push({type: 'text', text: "Hello, 這是我的實習經驗喔～"});
    			personal_data.internship.forEach((message) => {
    				replyMessage.push({type: 'text', text: message});
    			});
    			break;
    		case "who":
    			replyMessage.push({type: 'text', text: personal_data.who});
    		case "interest":
    			replyMessage.push({type: 'text', text: personal_data.interest});
                break;
    		default:
    			replyMessage.push({type: 'text', text: "您可以透過以下了解更多我的資訊喔～"});
    			replyMessage.push(module.exports.getCarousell(personal_data));
    			break;
    	}
    	return replyMessage;
    }
};
