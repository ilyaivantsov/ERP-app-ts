ngx.req.read_body()
local args, err = ngx.req.get_post_args()

if args.login == "admin" and args.password == "secret" then
    return ngx.redirect("/ok")
else
    return ngx.redirect("/")
end