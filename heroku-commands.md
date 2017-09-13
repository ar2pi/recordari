heroku create  
git push heroku master  
heroku ps:scale web=1  
heroku open  
heroku ps  
heroku domains  
heroku domains:add example.com  
heroku certs:add server.crt server.key  
heroku certs:info  
heroku certs:update server.crt server.key  
