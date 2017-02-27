# BeatWave

[Heroku link][heroku]

[Trello link][trello]

[heroku]: http://www.herokuapp.com
[trello]: https://trello.com

## Minimum Viable Product

BeatWave is a web application inspired by SoundCloud built using Ruby on Rails
and React/Redux.  BeatWave allows users to:

- [ ] Create a new account
- [ ] Login and Logout
- [ ] Upload audio files to create new tracks
- [ ] Play songs in progress bar with continuous play
- [ ] Comment on tracks
- [ ] View and play other user's tracks
- [ ] Follow other users


## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: docs/wireframes
[components]: docs/component-hierarchy.md
[sample-state]: docs/sample-state.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days)

**Objective:** Functioning rails project with front-end Authentication

### Phase 2: Tracks Model, API, and components (2 days)

**Objective:** Tracks can be created, read, and destroyed through
the API.

### Phase 3: Stream and Progress Bar (2 days)

**Objective:** Stream is populated with tracks by other users. Progress Bar,
once initiated, uses queue to continuously play Stream's tracks.

### Phase 4: Comments (1 day)

**Objective:** Stream's tracks can be commented upon, and update accordingly
without interrupting the Progress Bar or refreshing the page.

### Phase 5: User Show Page and update Auth to include profile picture (1 day)

**Objective:** Auth includes optional image upload for cover and profile pictures.
User page displays user images and tracks. Tracks can be played and commented.


### Bonus Features (TBD)
- [ ] Wave Form for tracks
- [ ] Track Show pages
- [ ] Like tracks
- [ ] Follows
- [ ] Stream is populated with tracks of followed users
