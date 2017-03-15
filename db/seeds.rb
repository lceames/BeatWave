# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

User.create!({
  username: "jorge",
  email: "spain@spain.org",
  password: "spain123",
  image: "https://s3.amazonaws.com/beatwave-pro/users/images/000/000/jorge.jpg"
  })

User.create!({
  username: "quinn",
  email: "canada@canada.org",
  password: "canada123",
  image: "https://s3.amazonaws.com/beatwave-pro/users/images/000/000/quinn.jpg"
  })

User.create!({
  username: "jimoh",
  email: "usa@usa.org",
  password: "usa123",
  image: "https://s3.amazonaws.com/beatwave-pro/users/images/000/000/jimoh.jpg"
  })

User.create!({
  username: "marshall",
  email: "france@france.org",
  password: "france123",
  image:"https://s3.amazonaws.com/beatwave-pro/users/images/000/000/marshall.jpg"
  })

User.create!({
  username: "guest",
  email: "guest@gmail.org",
  password: "password",
  image: "https://s3.amazonaws.com/beatwave-pro/users/images/000/000/mark.jpg"
  })

jorge_id = User.find_by({username: "jorge"}).id
quinn_id = User.find_by({username: "quinn"}).id
marshall_id = User.find_by({username: "marshall"}).id
jimoh_id = User.find_by({username: "jimoh"}).id
guest_id = User.find_by({username: "guest"}).id


Track.delete_all

Track.create!({
  user_id: jorge_id,
  title: "Life",
  description: "Dilla",
  audio: "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/008/original/life.mp3?1487344012",
  image: "https://s3.amazonaws.com/beatwave-pro/tracks/images/000/000/dilla.jpg"
})
Track.create!({
  user_id: marshall_id,
  title: "Cigarettes and Coffee",
  description: "classic",
  audio: "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/009/original/cigarettes-and-coffee.mp3?1487344018",
  image: "https://s3.amazonaws.com/beatwave-pro/tracks/images/000/000/otis.jpg"
})
Track.create!({
  user_id: quinn_id,
  title: "You and me",
  description: "Discovered in a yard sale decades after recording",
  audio: "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/010/original/you-and-me.mp3?1487344019",
  image: "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/055/original/record.png?1487623659"
})
Track.create!({
  user_id: guest_id,
  title: "Talk To Me, You'll Understand",
  description: "chune",
  audio: "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/011/original/talk-to-me.mp3?1487344021",
  image: "https://s3.amazonaws.com/beatwave-pro/tracks/images/000/000/ross.jpg"
})
Track.create!({
  user_id: jimoh_id,
  title: "Trapped in Da SpeedForce",
  description: "Slimhustlin",
  audio: "https://s3.amazonaws.com/beatwave-pro/tracks/audios/000/000/SLIM+HUSTLA+-+TRAPPED+IN+DA+SPEED+FORCE.mp3",
  image: "https://s3.amazonaws.com/beatwave-pro/tracks/images/000/000/slimhustla.jpg"
})

Track.create!({
  user_id: jorge_id,
  title:  "I Found you",
  description: "mhm",
  audio: "http://s3.amazonaws.com/beatwave-dev/tracks/audios/000/000/012/original/i-found-you.mp3?1487344045",
  image: "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/055/original/record.png?1487623659"
})

Track.create!({
  user_id: jimoh_id,
  title:  "I will survive",
  description: "Cake",
  audio: "https://s3.amazonaws.com/beatwave-pro/tracks/audios/000/000/Cake+-+i+will+survive.mp3",
  image: "https://s3.amazonaws.com/beatwave-pro/tracks/images/000/000/cake.jpg"
})
Track.create!({
  user_id: guest_id,
  title:  "Draped in Soft Twilight",
  description: "soso sweet",
  audio: "https://s3.amazonaws.com/beatwave-pro/tracks/audios/000/000/Andrew+Reynolds+-+Draped+In+Soft+Twilight.mp3",
  image: "https://s3.amazonaws.com/beatwave-pro/tracks/images/000/000/louis.jpg"
})

Track.create!({
  user_id: marshall_id,
  title:  "Joyride the stars",
  description: "it's good",
  audio: "https://s3.amazonaws.com/beatwave-pro/tracks/audios/000/000/George+Michelle+-+Joyride+the+Stars.mp3",
  image: "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/055/original/record.png?1487623659"
})

Track.create!({
  user_id: marshall_id,
  title:  "Wandering eye",
  description: "Copyright mark harris",
  audio: "https://s3.amazonaws.com/beatwave-pro/tracks/audios/000/000/Mark+Harris-+Wandering+Eye.mp3",
  image: "https://s3.amazonaws.com/beatwave-pro/users/images/000/000/mark.jpg"
})
Track.create!({
  user_id: jorge_id,
  title:  "Cruel",
  description: "cruel sprouts",
  audio: "https://s3.amazonaws.com/beatwave-pro/tracks/audios/000/000/Prefab+Sprout+-+Cruel.mp3",
  image: "http://s3.amazonaws.com/beatwave-dev/tracks/images/000/000/055/original/record.png?1487623659"
})

cruel = Track.find_by({title: "Cruel"}).id
eye = Track.find_by({title: "Wandering eye"}).id
life = Track.find_by({title: "Life"}).id
cigs = Track.find_by({title: "Cigarettes and Coffee"}).id


Comment.create!({body: "ok tune", track_id: cruel, elapsed_time: 0, user_id: jorge_id})
Comment.create!({body: "good tune", track_id: eye, elapsed_time: 0, user_id: marshall_id})
Comment.create!({body: "fine tune", track_id: eye, elapsed_time: 0, user_id: guest_id})
Comment.create!({body: "swell tune", track_id: cruel, elapsed_time: 0, user_id: jimoh_id})
Comment.create!({body: "great tune", track_id: life, elapsed_time: 0, user_id: jorge_id})
Comment.create!({body: "great tune", track_id: cigs, elapsed_time: 0, user_id: jorge_id})
Comment.create!({body: "great tune", track_id: life, elapsed_time: 0, user_id: jorge_id})
Comment.create!({body: "bad tune", track_id: life, elapsed_time: 0, user_id: guest_id})
Comment.create!({body: "no tune", track_id: life, elapsed_time: 0, user_id: quinn_id})
Comment.create!({body: "no tune", track_id: cruel, elapsed_time: 0, user_id: quinn_id})
Comment.create!({body: "no tune", track_id: cigs, elapsed_time: 0, user_id: quinn_id})
Comment.create!({body: "no tune", track_id: cruel, elapsed_time: 0, user_id: quinn_id})
Comment.create!({body: "sweet tune", track_id: life, elapsed_time: 0, user_id: quinn_id})
Comment.create!({body: "sweet tune", track_id: cigs, elapsed_time: 0, user_id: quinn_id})
Comment.create!({body: "sweet tune", track_id: eye, elapsed_time: 0, user_id: quinn_id})
