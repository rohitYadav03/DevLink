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

-------------------------------------------------------------------------------------
#	API	Purpose	Should You Include?	Why
10	/user/feed	 Show users not yet liked/passed	   ✅ Yes	Core Tinder-like swiping experience
12	/profile/visibility	 Toggle visible/hidden status	✅ Yes	Polished enhancement for user control
15	/user/feed?page=...	Pagination for swipe feed	    ✅ Optional (⭐ Bonus)	Only if you're aiming 

logic -> feed -> khudko , status
