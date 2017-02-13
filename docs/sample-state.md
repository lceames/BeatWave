```js
{
  currentUser: {
    id: 1,
    username: "music-lover99",
    description: "whatever",
    tracks: {{1: 1}, {2: 2}} //Hold onto only ids or full track info?
  },

  forms: {
    signUp: {errors: []},
    logIn: {errors: []},
    createComment: {errors: ["body can't be blank"]},
    upload: {errors: []}
  },

  currentTrack: {
    active: true,
    elapsedTime: 47,
    paused: false,
    queueId: 0
  },

  trackQueue: [
      {
        trackId: 1,
        trackTitle: "Sweet Tune",
        author: "music-lover99",
        url: "aws/something",
        lengthInSeconds: 234,
        description: "Pure velvet mate"
      },
      {
        trackId: 2,
        trackTitle: "Autumnal Mountain",
        author: "dope-dj411",
        url: "aws/somethingelse",
        lengthInSeconds: 234,
        description: "Like hiking in October"
      },
      {
        trackId: 3,
        trackTitle: "Gentle Mist",
        author: "softy64",
        url: "aws/anotherthing",
        lengthInSeconds: 234,
        description: "A gentle choon"
      }
    ]
}
```
