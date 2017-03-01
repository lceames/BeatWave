if @user
  json.username @user.username
  json.image @user.image.url
  json.id @user.id
end
