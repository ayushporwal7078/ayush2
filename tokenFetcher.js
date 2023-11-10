const axios = require("axios");
const fs = require("fs");

module.exports.fetcher = async (req,res)=>{

    if(req.params.id==='old'){

        const token = require("./token.json");
        res.status(200).json({
            token : token
        });

    }else{

        try{
            const credentials = new URLSearchParams();
            credentials.append('grant_type', 'client_credentials');
            credentials.append('scope', 'https://api.ebay.com/oauth/api_scope');
    
            const response = await axios({
                method: 'post',
                url: 'https://api.ebay.com/identity/v1/oauth2/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic WmlzaGFuQWwtbWF4bWlucHItUFJELTUyZjU5YTY4NS03ZjU5NTIxYTpQUkQtZmNjZTJmMjA3NTc3LWMyNjktNGUxMy1iZTljLWU0MTU=',
                },
                data: credentials,
            })
    
            fs.writeFileSync("./token.json",JSON.stringify(response.data.access_token));
    
            res.status(200).json({
                token : response.data.access_token
            });
    
        }catch(err){
            console.log(err)
            res.send(401);
        }

    }
    
}