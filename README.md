<h1>Food</h1>
<p><a href="https://systemshock89.github.io/food/">See example</a></p>

<h2>Used technologies</h2>
<ul>
    <li>native JavaScript ES6+ with modules structure</li>
    <li>client-server: Fetch, promises, XMLHttpRequest, axios</li>
    <li>webpack + gulp + json-server</li>
</ul>

<h2>Used features</h2>
<ul>
    <li>calculator (with localStorage)</li>
    <li>slider with navigate buttons and dots (used css transform, transition)</li>    
    <li>cards (with data in db om promises, used class MenuCard)</li>
    <li>Forms</li>
    <li>modals</li>
    <li>timer (with setInterval)</li>
    <li>tabs</li>    
</ul>

<h2>How to use</h2>
<ol>
    <li><code>git clone</code></li>
    <li><code>npm i</code></li>
    <li><code>gulp</code></li>
    <li><code>npx json-server dist/db.json</code></li>
</ol>

<h2>How to deploy</h2>
<ol>
    <li><code>gulp prod</code></li>
    <li>deploy to GitHub Pages:<br> 
    <code>git subtree push --prefix dist origin gh-pages</code></li>
</ol>