if @user
  json.extract! @user, :username, :image, :id
end
