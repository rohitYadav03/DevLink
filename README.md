# DevLink

1. /signup
2. /login
3. /profile/view
4. /profile/edit
5. /profile/password

6. /request/send/:status/:userId
7. /request/review/:status/:requestId
8. /requests/received

9. /user/connections
10. /user/feed

11. /logout
12. /profile/visibility         ← enhancement
13. /user/block/:userId         ← enhancement
14. /user/blocked               ← enhancement
15. /user/feed?page=...        ← enhancement (upgrade)


-----------------------------------------------------------
1. Send Request
POST /request/send/:userId
Body: { "status": "pending" }
2. Review Request

PATCH /request/review/:requestId
Body: { "status": "accepted" } // or "rejected"
