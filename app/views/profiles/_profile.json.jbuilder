json.extract! profile, :id, :first_name, :last_name, :display_name, :state, :years_of_membership, :photo, :in_memoriam, :created_at, :updated_at
json.url profile_url(profile, format: :json)