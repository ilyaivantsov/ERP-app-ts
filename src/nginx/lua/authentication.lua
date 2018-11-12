local key = ngx.var.cookie_key
if key == nil then
    return ngx.redirect('/')
end

-- red:set("user","ilya")
-- red:set("password","qwerty")
-- red:set("type","fs")

local redis = require "resty.redis"
local red   = redis:new()
red:set_timeout(1000) -- 1 sec

-- connect to redis
local ok, err = red:connect("192.168.99.100", 6379)
if not ok then
    return ngx.say("failed to connect: ", err)
end
local res, err = red:get(key)
if not res then
    return ngx.say("Error", err)
end
if res == ngx.null then
    return ngx.redirect('/') 
end
ngx.say(res)
return