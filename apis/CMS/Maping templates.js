// Single POST
#set($inputRoot = $input.path('$'))
{
  "httpMethod":"POST",
  "body":{
    "TableName":"cms_plain_content",
    "Item":{
        "id":" ",
        "tags":"$inputRoot.get('tags')",
        "src":"$inputRoot.get('src')"
    }
  }
}



// Multiple POST
#set($inputRoot = $input.path('$'))
{
  "httpMethod": "POST",
  "body": {
    "TableName": "cms_posts",
    "Item": {
      "id": " ",
      "title": "$inputRoot.get('title')",
      "images": [
            #foreach($elem in $inputRoot.images)
                  "$elem"#if($foreach.hasNext),#end
            #end
        ]
        }
    }
}

// GET
{
    "httpMethod":"GET",
    "queryStringParameters":{
        "TableName":"cms_posts"
    }
}

// DELETE
{
    "httpMethod":"DELETE",
    "body":{
        "TableName":"cms_plain_content",
        "Key":{
            "id":"$input.params('postID')"
        }
    }
}

// PUT
#set($inputRoot = $input.path('$'))
{
    "httpMethod":"PUT",
    "body":{
        "TableName":"cms_plain_content",
        "Item":
        {
            "id":"$input.params('postID')",
    		"tags":"$inputRoot.get('tags')",
    		"src":"$inputRoot.get('src')"
        }
    }
}
