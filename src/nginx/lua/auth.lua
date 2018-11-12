ngx.req.read_body()
local args, err = ngx.req.get_post_args()

local redis = require "resty.redis"
local red   = redis:new()
red:set_timeout(1000) -- 1 sec

-- connect to redis
local ok, err = red:connect("192.168.99.100", 6379)
if not ok then
    return ngx.say("failed to connect: ", err)
end

function getFromRedis (key,red)
    local res, err = red:get(key)
    if not res then
        return ngx.say("Error", err)
    end
    if res == ngx.null then
        return ngx.redirect('/') 
    end
    return res
end

local user = getFromRedis("user",red) 
local password = getFromRedis("password",red)
local type = getFromRedis("type",red)

if args.login == user and args.password == password then
    local resty_sha256 = require "resty.sha256"
    local sha256 = resty_sha256:new()
    local str = require "resty.string"    
    sha256:update(args.login .. args.password)
    local digest = sha256:final()
    local key_origin = str.to_hex(digest)
    ngx.header["Set-Cookie"] = {"key="..key_origin.."; path=/; domain=192.168.99.100;"}
    red:set(key_origin,type)
    return 
else
    return ngx.redirect('/')
end
