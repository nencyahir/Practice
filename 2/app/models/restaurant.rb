class Restaurant < ApplicationRecord
    has_many :menus 
    accepts_nested_attributes_for :menus, reject_if: :all_blank, allow_destroy: true, reject_if: ->(attrs) {attrs['restaurant_name'].blank? }
end
