json.extract! profile, :id, :member_id, :first_name, :last_name, :display_name, :state, :years_of_membership,
                       :in_memoriam, :suffix, :next_gen, :years_for_next_gen, :next_gen_presidents_club,
                       :created_at, :updated_at, :order
json.photo profile.photo.url
json.photo_thumb profile.photo.url(:thumb)
json.url profile_url(profile, format: :json)
