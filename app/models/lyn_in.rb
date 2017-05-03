class LynIn < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
end
