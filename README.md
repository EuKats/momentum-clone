<h1>Momentum</h1>

<h3>How to help this repo</h3>
<p>fork the repo, create a new branch and code there so when you pull request it we can test the changes and then add it to the master branch.</p>
<br>
<h3>How the folder/file system works</h3>
<p>
<ul>
<li><b>/assets</b></li> this folder contains our images, .css and .js files for the front end(what you use inside index.ejs).
<li><b>/models</b></li> this folder is for our mongooseJS schemas for the DB (we only have the user schema now).
<li><b>/routes</b></li> contains our api, meaning what happens when you log in what value goes where, how to add stuff to the db and so on
<li><b>/views</b></li> our html files, they are .ejs files but don't worry! it's just standard html code with some javascript inside `<% %>` : that's how we talk from <b>routes</b>(back end) to here(front end).
<li><b>app.js</b></li> our core node file, everything starts from here, all the modules and the logic starts here.
<li><b>jquery.js</b></li> This is the front end javascript file. We'll use it to make the weather and quotes api as well as some other front end components. 
</ul>
</p>
