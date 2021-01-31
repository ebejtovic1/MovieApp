# MovieMood
# Run steps
1. Clone the repository to a folder
2. Open CMD (Run As Administrator) 
3. Go to the folder where the repository is cloned
4. Type 'npm install' 
5. Run `ng serve` for a dev server.
6. Navigate to `http://localhost:4200/`.

# Description
The app have the functionalities of displaying the shows and the movies, a search function for both, and a detail view for individual items.
Also, when the user is authenticated (via Log in) he has the ability to change the movie/tv show title. Changes are saved automatically to a JSON file on the hard disk.

API authentication key: 67a4974b455f38fac6d23b0e9cf0685d

Rest API source: https://developers.themoviedb.org/3

When the application is loaded, it displays the top 10 rated movies/tv shows.


The search field is live and react to any change in the input field.

The search fires a request on the search endpoint from TMDB and shows us all the results that we are searching for

The search is performed only when there are 3 or more characters in the search bar.

Switching between tabs while searching should trigger the search again with the same search term for the selected tab and update the results.

When the user clicks on a specific MOVIE/TV SHOW, he is taken to the details view.

The Detailed View of the Movie/TV Show should show the cover image on top and in case of Movies/TV Shows which have a trailer should show the trailer video instead of the cover image. Below the image/trailer some basic information regarding the selected Movie/TV Show should be shown.

The Back Button should return the user back to where he was and with the same state before clicking to see more information about a Movie/TV Show.

Here is the link for the app: https://epic-shannon-0fe115.netlify.app/
Here is the video for the app: https://www.youtube.com/watch?v=X3rauKr79hg&feature=youtu.be 
