// Single object Model
{
    "title":"OnePost",
    "type":"object",
    "properties":{
        "id":{"type":"string"},
        "tags":{"type":"string"},
        "src":{"type":"string"}
    }
}

// Multiple objects model (multiple objects from other model)
{
    "type":"array",
    "items":{
        "$ref":"https://apigateway.amazonaws.com/restapis/sjazup8js9/models/OnePost"
    }
}

// Array model (multiple images, etc)
{
    "title": "MultiImage",
    "type": "object",
    "properties": {
        "id": {"type": "string"},
        "title": {"type": "string"},
        "images": {"type": "array", "items": { "type": "string" }}
    }
}