# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

User.create({username: "jorge", email: "spain@spain.org", password: "spain123"})
User.create({username: "quinn", email: "canada@canada.org", password: "canada123"})
User.create({username: "marshall", email: "france@france.org", password: "france123"})
User.create({username: "jimoh", email: "usa@usa.org", password: "usa123"})
User.create({username: "guest", email: "guest@gmail.com", password: "password"})
