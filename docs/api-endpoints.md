# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Tracks

- `GET /api/tracks/discover`
  - randomly outputs tracks by users other than current user
- `GET /api/tracks/:userId`
  - fetches tracks for user show page
- `GET /api/tracks/:trackId`
  - fetches track for track show page, includes description
- `DELETE /api/tracks/:id`
- `POST /api/tracks`


### Comments

- `GET /api/comments`
  -fetches tracks for particular song
- `POST /api/comments`
  -adds comment to track
- `DELETE /api/comments/:commentId`
