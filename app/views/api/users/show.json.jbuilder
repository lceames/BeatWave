if @user
  json.username @user.username
  json.image asset_path(@user.image.url)
  json.id @user.id
end
