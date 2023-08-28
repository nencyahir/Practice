class AddTeacherReferenceToLectures < ActiveRecord::Migration[7.0]
  def change
    add_column :lectures, :title, :string
    add_column :lectures, :description, :text
    add_reference :lectures, :teacher, null: false, foreign_key: true
  end
end
