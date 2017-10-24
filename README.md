# Rock Paper Scissor the Role Playing Game

Link to website: https://canpan14.github.io/rps-rpg-frontend/

Link to frontend repo: https://github.com/canpan14/rps-rpg-frontend

Link to backend repo: https://github.com/canpan14/rps-rpg-backend

Link to backend deploy site: https://rps-rpg.herokuapp.com/

## What is RPS the RPG?
Rock Paper Scissor the Role Playing Game is a game in which the player (you) leads adventurers in a quest to become the strongest rock paper scissor players in the land. The gods are looking for a new leader to join their ranks and you are setting out to prove your leadership skills and intelligence to become one of them.

## Gameplay and Features
- Each user is able to create multiple adventurers and work with them simultaneously.
- Death is permanent so every move must be made with caution. Even a seasoned warrior can fall in the blink of an eye.
- Stats are kept on both alive and dead adventurers, as well as the users' overall statistics.
- Enemies are randomly generated so every fight and every playthrough is unique.
- Enemies will learn from your play style during battle, adjusting to your moves at different speeds and trying to counter your actions.
- Combat is a simple system of rock paper scissor, with both adventurer and foe having attack and health. Last one with health remaining wins the fight.
- As the adventurer progresses and levels up, more challenging enemies will come to face them, reach the maximum level to achieve eternal glory.

## Technologies Used
Frontend
- HMTL
- Javascript
- SASS, CSS
- Bootstrap
- Bootstrap-notify
Backend
- Ruby
- Rails
- Heroku
- Postgres

## Plans for Future Iterations
### Items
This was a huge thing I'm upset I never got around to doing. It was always last on the list but I felt like it would have really made it feel more like a true game. The plan was to have basically item drops at certain intervals of the game. The player would be offered an item from a set of drops, and the item could increase a certain type of attack, boost stats, or maybe provide a one time saving grace from death. By the time I got to the end of my initial tasks to complete it was too close to the final due date to risk a large task like this.

### Adventurer Stat Assignment
Currently the adventurer is just given the default stats every time they are created. What I wanted to do was have the user decide how to adjust the starting stats just to have each adventurer be even more unique. The code is basically in there for this to work but I couldn't get a satisfactory UI done in time for it so it was backlogged.

### Bosses
I wanted to have bosses or mini bosses every X amount of fights or levels that were preplanned enemies. I don't think it would be too hard to actually put in because I could use the existing enemies table for it. I just never got around to it.

### Google Play Integration
I've integrated with Google Play before on a mobile app, but never on a web app. It would have been interested and fun to do but was way on the backlog of things.

### Proper Mobile UI
While many parts of my UI work on mobile it really isn't what I wanted it to be. This is really just a general issue where I need to learn how to basically make two different UIs in some cases and swap between them depending on screen width.

## Front End Development Process
My initial plan was actually to make a text RPG like the old console classics. But instead of user text inputs have simile button choices, both to make gameplay simpler for the user, and also because that's less work for me. As I started to write ideas down and work on combat on paper I realized I had pretty much created the classes rock paper scissor combat system.

I started to run with that idea and make it into a system fun combat game, but I was trying so hard to get around the obvious RPS combat system that gave up and rewrote the game to center around that theme itself.

This led to me creating this silly iteration of what I have now. I had to do a lot of table, database, and variable renamed to get it to work again, but it was much better than just leaving all the old names and trying to make sense of what was going on.

Once I started going with the new idea it was mostly smooth sailing. I learned how to use a tabbed layout which made displaying my data a lot nicer, didn't have to rely on insane showing/hiding of html sections.

Another big part of my development process was figuring out how to work with weighted random number generation which was needed for my enemies. Then adjusting those weights on the fly to accommodate for what the player was doing.

My final large part of learning was properly chaining my then statements together after promises to fix race conditions. Caleb helped me with that and after his explanation things started to come together a lot cleaner.

## Back End Development Process
My back end is straighter forward than my frontend. I started out with a users table that was given to us, and proceeded to make an adventurers table so that the user could create adventurers. During this I also learned how to hook up the controller so that API requests for this would need to send authentication. This was done use 'Examples' as an example and using current_user.

From there I made enemies and levels that held base state values for both the enemies and the user. After that I made the enemy_modifiers table which is used as a lookup table for randomly generating enemies when needed.

The biggest issue I ran into was learning how to properly set up a one to one relationship using has_one. It wasn't actually complicated looking at the end result but on the path to get there I made many mistakes and misunderstood how rails works a few times. Luckily there are tons of examples online of people that already did it.

Looking back the importance of drawing up a proper ERD initially, and maintaining it over the course of the project cannot be stressed enough. It is a huge pain to go back and revise the database and various tables several times. Then having to also alter front end code to match changing table schema.

## Problem Solving Strategy
My problem solving strategy is fairly simple.
If something is clearly breaking:
- Locate area of code where the break is happening
  - Using console logs to find where they stop printing what is expected
  - Read the stack trace for the exact line (not always possible)

If data isn't displaying as expected:
- Use console logs to chain back print statements until I see where the data differs from what's expected at that point
- If it's a race condition or something with asynchronous behaviour, check the chaining logic or make sure all API calls and the code that follows are wrapped in promises/thens.

If the UI is broken in some way:
- Open the inspector and start messing around with display values
- Look up examples of people doing similar things and see what CSS values they were using or bootstrap code.
- If things start to get complicated, revert to a simpler form, take a break from it, and start looking at it fresh later.

## Wireframes
They are from the initial thought of the app (also contains a little extra stuff): https://imgur.com/a/zeNo7

## ERD Diagram
Made using https://erdplus.com/

ERD: https://i.imgur.com/4e5hMCg.png
