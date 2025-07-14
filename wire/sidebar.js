document.write(`
<div class="sidebar">
    <div class="logo">
        <a href="index.html" aria-label="Just Wise Love home"><h1>JWL</h1></a>
    </div>
    <nav class="nav-left">
        <button class="hamburger-left" aria-expanded="false" aria-controls="nav-menu-left" aria-label="Toggle left navigation">
            <span></span><span></span><span></span>
        </button>
        <ul id="nav-menu-left" class="nav-menu-left">
            <li><a href="truth.html" aria-label="Truth page">TRUTH</a></li>
            <li><a href="people.html" aria-label="People page">PEOPLE</a></li>
            <li><a href="goodnews.html" aria-label="Good News page">GOOD NEWS</a></li>
        </ul>
    </nav>
    <nav class="nav-right">
        <button class="hamburger-right" aria-expanded="false" aria-controls="nav-menu-right" aria-label="Toggle right navigation">
            <span></span><span></span><span></span>
        </button>
        <ul id="nav-menu-right" class="nav-menu-right">
            <li><a href="articles.html" aria-label="Articles page"><i class="fas fa-lightbulb"></i> ARTICLES</a></li>
            <li><a href="sections.html" aria-label="Sections page">SECTIONS</a></li>
            <li><a href="topics.html" aria-label="Topics page">TOPICS</a></li>
        </ul>
    </nav>
</div>
`);
