# BeatWave

BeatWave is a social music streaming web application inspired by SoundCloud built on a Ruby on Rails backend and a React/Redux frontend.

[beatwave]: https://beatwave.herokuapp.com

## Features and Implementation

###Track CRUD

The core functionality of BeatWave revolves the CRUD (Create, Read, Update, Destroy) cycle for tracks. As opposed to music streaming applications like Spotify, BeatWave's music collection is created through user uploads. BeatWave depends on a RESTful JSON API to structure all aspects of this process. Track uploads are stored in an Amazon Web Services S3 bucket to ensure that large audio files are only passed from client to server once. The track's url is stored in the tracks table along with its details and a user id corresponding to the uploader. As a result, playing and deletion depend only on the url corresponding to a particular track. Duration and waveform metadata are also read and stored in the tracks table on uploads. This ensures that the track-related data front-end components depend on is immediately accessible after fetching.

###Queue

The track queue is another centerpiece of BeatWave's functionality. The queue is generated through variable GET requests that accord with the current route. For instance, the Stream home page fetches a randomly generated queue of other users' uploads while a user's profile page shows tracks they uploaded, and a track's profile page creates a single-item queue. Database queries

###Progress Bar

BeatWave relies on a progress bar component to handle the heavy lifting for queue-related U/I as well as managing the queue's internal state. Once a track been initiated, it is set as the current track in the queue's slice of state. The progress bar always reads from the current track state that is passed down to it as props. It is responsible for displaying the current track's dynamic state, as well as handling track skips, rewinds, and time seeking. It manages this by dispatching periodic Redux store updates that ensure the HTML audio tag's current time is always stored as global state. This allows components like the Waveform and Play/Pause to always stay in sync with the audio's tag's state. It also ensures that re-renders of audio-related components are triggered whenever necessary. In practice, re-renders occur every second, when the current track's elapsed time state is updated, as well upon play/pause toggles by the user.

If a user skips to the next track, rewinds to the previous track, or the elapsed time reaches a track's duration, the progress bar dispatches a Redux store update, setting the current track accordingly. This ensures that the queue is continuously operating in a sequential fashion. If the current track reaches the end of the queue, the current track is reset to the first track.

### Continuous play

BeatWave optimizes user experience by ensuring the current track is never disrupted by unrelated user interactions. It achieves continuous play by storing HTML audio tags in the progress bar and rendering this component globally. Once the queue is initiated, the progress bar operates independently of navigations to other routes, track uploads, or commenting. Only track changes or time seeking affect the internal logic of the progress bar.

##Waveforms

Waveforms are a crucial aspect of BeatWave's U/I. They visually represent each track's sound levels, progress, elapsed time and duration. The waveforms are rendered using HTML5 Canvas by painting columns that correspond to sound levels at progressive timestamps throughout the track. Each track's progress is represented by repainting columns up until a particular track's elapsed time. The columns change color dynamically as a track progresses, and reset to their default color once a track finishes.

Implementing waveforms required a restructuring of BeatWave's state shape. The progress bar only demanded storing state for the current track. To render waveforms however, the current track's progress had to be dynamically mapped to a corresponding track object in the queue. This allows users to have multiple active tracks at a given time. Each track holds it's own elapsed time state that dictates where to begin playing an active track that was previously paused.

#Comments

Comments are another distinctive feature of Beatwave. Users select a particular time-stamp in the current track to make their comment. This feature allows users to comment on the details of a given track as well its whole. Comments were implemented on the backend using a comments table with columns for user id, track id, and time-stamp in addition to the comment body. Comment are displayed below the waveform in a position corresponding to the chosen timestamp.

### Todo
- [ ] Like tracks
- [ ] Follows
- [ ] Stream is populated with tracks of followed users
