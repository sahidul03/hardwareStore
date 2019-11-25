# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
[
    {id: 1, email: 'sahidul03@gmail.com', password: 'abcd1234'},
].each do |param|
  User.where(id: param[:id]).first_or_create( email: param[:email], password: param[:password])
end