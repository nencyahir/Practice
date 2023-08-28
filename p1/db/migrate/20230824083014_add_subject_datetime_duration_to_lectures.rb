class AddSubjectDatetimeDurationToLectures < ActiveRecord::Migration[7.0]
  def change
    add_column :lectures, :subject, :string
    add_column :lectures, :datetime, :datetime
    add_column :lectures, :duration, :integer
  end
end
