if @user
  json.username @user.username
  json.image @user.image.url.insert(4, 's')
  json.id @user.id
end
