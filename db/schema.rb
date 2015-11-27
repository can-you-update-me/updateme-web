# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151127071241) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "libs", force: :cascade do |t|
    t.string   "name"
    t.string   "type"
    t.text     "description"
    t.string   "version"
    t.datetime "checked_at"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "libs", ["checked_at"], name: "index_libs_on_checked_at", using: :btree
  add_index "libs", ["name"], name: "index_libs_on_name", using: :btree
  add_index "libs", ["type"], name: "index_libs_on_type", using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "lib_id"
    t.string   "channel"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "subscriptions", ["lib_id", "channel"], name: "index_subscriptions_on_lib_id_and_channel", using: :btree
  add_index "subscriptions", ["lib_id", "user_id"], name: "index_subscriptions_on_lib_id_and_user_id", unique: true, using: :btree
  add_index "subscriptions", ["lib_id"], name: "index_subscriptions_on_lib_id", using: :btree
  add_index "subscriptions", ["user_id"], name: "index_subscriptions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree

  add_foreign_key "subscriptions", "libs"
  add_foreign_key "subscriptions", "users"
end
