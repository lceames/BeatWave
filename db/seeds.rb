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

jorge_id = User.find_by({username: "jorge"}).id
quinn_id = User.find_by({username: "quinn"}).id
marshall_id = User.find_by({username: "marshall"}).id
jimoh_id = User.find_by({username: "jimoh"}).id


Track.delete_all

life = Track.new({user_id: jorge_id, title: "Life", description: "by JDilla"})
life.audio = "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/008/original/life.mp3?1487344012"
life.image = "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/032/original/record.png?1487454165"
life.save!

cigs = Track.new({user_id: marshall_id, title: "Cigarettes and Coffee", description: "Otis Redding's classic melancholia"})
cigs.audio = "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/009/original/cigarettes-and-coffee.mp3?1487344018"
cigs.image = "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/032/original/record.png?1487454165"
cigs.save!

you = Track.new({user_id: jimoh_id, title: "You and me", description: "Discovered in a yard sale decades after recording"})
you.audio = "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/010/original/you-and-me.mp3?1487344019"
you.image = "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/032/original/record.png?1487454165"
you.save!

talk = Track.new({user_id: marshall_id, title: "Talk To Me, You'll Understand", description: "House"})
talk.audio = "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/011/original/talk-to-me.mp3?1487344021"
talk.image = "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/032/original/record.png?1487454165"
talk.save!

done = Track.new({user_id: jorge_id, title: "I Found you", description: "Soulful crooning"})
done.audio = "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/012/original/i-found-you.mp3?1487344045"
done.image = "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/032/original/record.png?1487454165"
done.save!
