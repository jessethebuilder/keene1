# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180222212107) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "profiles", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "display_name"
    t.string   "state"
    t.integer  "years_of_membership"
    t.string   "photo"
    t.boolean  "in_memoriam"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "suffix"
    t.boolean  "next_gen"
    t.integer  "years_for_next_gen"
    t.boolean  "next_gen_presidents_club"
    t.string   "member_id"
    t.integer  "order"
  end

end
