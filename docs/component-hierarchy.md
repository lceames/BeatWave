## Component Hierarchy

**Home**
 - HomeHeader
 - CreateAccountFormContainer
 - LoginFormContainer
 - DiscoverTrackIndex
 - HomeFooter
 - ProgressBar

**DiscoverTrackIndex**
 -DiscoverTrackIndexItem

**DiscoverTrackIndexItem**

**CreateAccountFormContainer**
  - CreateAccountForm

**LoginFormContainer**
  - LoginForm

**StreamContainer**
 - Stream

**Stream**
 - NavBar
 - StreamTrackIndex
 - ProgressBar
 - CommentForm

**StreamTrackIndex**
 -StreamTrackIndexItem

**UserShow**
 - StreamTrackIndex
 - Stats

**NavBar**

**ProgressBar**
 -PlayPauseButton
 -TrackProgressIcon

**TrackProgressIcon**

**PlayPauseButton**

**Upload**

BONUS

**DiscoverContainer**
 - Discover

**Stats**

## Routes

|Path   | Component   |
|-------|-------------|
| "/" | "Home" |
| "/stream" | "StreamContainer" |
| "/:trackId" | "TrackShowContainer" |
| "/users/:userId" | "UserShowContainer" |
| "/users/:userId/upload" | "UploadTrack"
