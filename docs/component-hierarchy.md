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

**StreamTrackIndex**
 -StreamTrackIndexItem

**StreamTrackIndexItem**
 -CommentIndex
 -CommentForm

**CommentIndex**
 -CommentIndexItem

**CommentIndexItem**

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
