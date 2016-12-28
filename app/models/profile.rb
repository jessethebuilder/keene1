require 'csv'

class Profile < ApplicationRecord

  mount_uploader :photo, PhotoUploader, dependent: :destroy

  def photo_url
    self.photo.url
  end

  def Profile.to_csv
    attrs = %w[first_name last_name suffix display_name state years_of_membership in_memoriam next_gen years_for_next_gen next_gen_presidents_club photo_url]

    CSV.generate(headers: :true) do |csv|
      csv << attrs.map{ |header| header.titlecase }

      all.each do |profile|
        csv << attrs.map{ |attr| profile.send(attr) }
      end
    end
  end
end
