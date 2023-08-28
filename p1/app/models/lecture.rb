class Lecture < ApplicationRecord
     belongs_to :teacher
     validates :subject, presence: true
     validates :datetime, presence: true
     validates :duration, presence: true, numericality: { greater_than: 0 }
end
