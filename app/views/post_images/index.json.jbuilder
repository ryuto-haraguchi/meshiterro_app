json.array!(@post_images) do |post_image|
  json.id post_image.id
  json.user do
    json.name post_image.user.name
    json.image url_for(post_image.user.profile_image) if post_image.user.profile_image.attached?
  end
  if post_image.image.attached?
    json.image url_for(post_image.image)
  else
    json.image nil
  end
  json.shop_name post_image.shop_name
  json.caption post_image.caption
  json.address post_image.address
  json.latitude post_image.latitude
  json.longitude post_image.longitude
end