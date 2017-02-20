if @user
  json.extract! @user, :username, :image
end
