# BeatWave

BeatWave is a music sharing web application inspired by SoundCloud built using Ruby on Rails and React/Redux.

[beatwave]: https://beatwave.herokuapp.com

## Features and Implementation

### Progress Bar with continuous play

BeatWave optimizes user experience by using a progress bar that operates continuously throughout navigation to different pages. It achieves this feature by storing audio tags in a universally rendered React component that is updated by upon new song selection and pauses. The progress bar is synchronized with track items through periodic global store updates.

### Stream

The Stream offers users a randomly generated queue of music uploaded by other BeatWave users. Each Track component in the Stream allows users to navigate to play, pause, navigate to the track and user uploader show page.

### Comments

Users can view and create comments when track items are rendered throughout the application. Comment creation triggers an immediate re-render that updates without disrupting the progress bar or requiring a page refresh.

### User Show Page

User show pages display user bio, profile images, and a queue of all uploaded tracks.

### Track CRUD

Tracks can be uploaded and destroyed. 


### Todo
- [ ] Wave Form for tracks
- [ ] Like tracks
- [ ] Follows
- [ ] Stream is populated with tracks of followed users
