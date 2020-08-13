# Top Places Blog v1
This website allows you to post reviews on best cities in the world. Users can add/edit/delete a place, add/edit/delete a comment, and view others posts.


### Foler Setup
&nbsp;<strong>Middleware:</strong> To handle all the authentication logic.<br>
&nbsp;<strong>Models:</strong> To define mongoose schema for Places, Users, and Comments.<br>
&nbsp;<strong>Public:</strong> To store stylesheets.<br>
&nbsp;<strong>Routes:</strong> To define routes.<br>
&nbsp;<strong>Views:</strong> To store all the .ejs files.<br>


### RESTful Routes
This website follows RESTful routes<br>
  &nbsp;<strong>INDEX:</strong> Displays all blog posts.<br>
  &nbsp;<strong>NEW:</strong> Shows form to create a new place or comment.<br>
  &nbsp;<strong>CREATE:</strong> Creates a new place or comment.<br>
  &nbsp;<strong>SHOW:</strong> Shows one specified blog post with associated comments.<br>
  &nbsp;<strong>EDIT:</strong> Shows edit form for one specified blog post or comment.<br>
  &nbsp;<strong>UPDATE:</strong> Updates a perticular place or comment.<br>
  &nbsp;<strong>DESTROY:</strong> Deletes a perticular place or comment.<br>


### Stack
HTML, CSS, JavaScript, Node.js, Express, Mongoose


### Dependencies (npm i `dependency` --save)
body-parser<br>
connect-flash<br>
dotenv<br>
ejs<br>
express<br>
express-session<br>
method-override<br>
mongoose<br>
passport<br>
passport-local<br>
passport-local-mongoose<br>
