// Fix for initial game card animations
document.addEventListener("DOMContentLoaded", function() {
    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach((card) => {
        // Add the animation class
        card.classList.add("animate-on-load");

        // Remove the animation class after it finishes
        card.addEventListener("animationend", () => {
            card.classList.remove("animate-on-load");
        });
    });
});

// Get the logo image and the header
const specialImage = document.getElementById('logoImage');
const header = document.getElementById('header');

// Add a click event to change the header background color
if (logoImage && header) {
    specialImage.addEventListener('click', () => {
        header.style.backgroundColor = 'black';
    });
}

// Define the Konami Code sequence
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiCodeIndex = 0;

// Function to check the Konami Code
function checkKonamiCode(event) {
    if (event.key.toLowerCase() !== konamiCode[konamiCodeIndex].toLowerCase()) {
        konamiCodeIndex = 0;
        return;
    }

    konamiCodeIndex++;

    if (konamiCodeIndex === konamiCode.length) {
        const randomNumber = Math.random();
        let redirectUrl;

        if (randomNumber < 0.2) {
            redirectUrl = 'https://pong.stardomga.me';
        } else if (randomNumber < 0.4) {
            redirectUrl = 'https://stardle.stardomga.me';
        } else if (randomNumber < 0.6) {
            redirectUrl = 'https://mario.stardomga.me';
        } else if (randomNumber < 0.8) {
            redirectUrl = 'https://tetris.stardomga.me';
        } else {
            redirectUrl = 'https://snake.stardomga.me';
        }

        window.location.href = redirectUrl;
    }
}

// Add event listener for keydown events
window.addEventListener('keydown', checkKonamiCode);


// Get the current date
const current = new Date();
const date = `${current.getDate()}/${current.getMonth() + 1}`;

// Define the URLs for different background images
const starsUrl = "url('https://raw.githubusercontent.com/jordan-trempert/media/main/stars.png')";
const candyUrl = "url('https://raw.githubusercontent.com/StardomTests/stardomtests.github.io/main/src/candy.png')";
const pumpkinsUrl = "url('https://raw.githubusercontent.com/StardomTests/stardomtests.github.io/main/pumps.png')";
const heartsUrl = "url('https://raw.githubusercontent.com/StardomTests/stardomtests.github.io/main/Valhearts.png')";
const cloversUrl = "url('https://raw.githubusercontent.com/StardomTests/stardomtests.github.io/main/clover.png')";
const julyUrl = "url('https://raw.githubusercontent.com/jordan-trempert/media/main/July.png')";

// Function to set the background image based on the date
function setBackground() {
    let bgPic = starsUrl; // Default background

    if (date === "25/12") {
        bgPic = candyUrl;
    } else if (date === "31/10") {
        bgPic = pumpkinsUrl;
    } else if (date === "14/2") {
        bgPic = heartsUrl;
    } else if (date === "17/3") {
        bgPic = cloversUrl;
    } else if (date === "4/7") {
        bgPic = julyUrl;
    }

    document.body.style.backgroundImage = bgPic;
    console.log(date);
}

// Call the function to set the background when the page loads
window.addEventListener('load', setBackground);



function createGameCard(imageSrc, description, hoverDescription, link, linkText, borderGradient, hoverGradient, easterEggColor) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.position = 'relative';

    // Create a pseudo-element for the border
    const border = document.createElement('div');
    border.className = 'border';
    border.style.position = 'absolute';
    border.style.top = '0';
    border.style.left = '0';
    border.style.right = '0';
    border.style.bottom = '0';
    border.style.borderRadius = '20px';
    border.style.border = '4px solid transparent';
    border.style.backgroundImage = '';
    border.style.backgroundClip = 'padding-box';
    border.style.zIndex = '-1';
    border.style.backgroundSize = '200% 200%';

    // Function to animate the gradient
    let animationFrameId;
    let position = 0;
    let direction = 1; // 1 for right, -1 for left

    function animateGradient() {
        position += direction * 0.5; // Adjust the speed of the animation (slower)
        if (position >= 100 || position <= 0) {
            direction *= -1; // Reverse direction
        }
        card.style.backgroundPosition = `${position}% 50%`;
        border.style.backgroundPosition = `${position}% 50%`;
        animationFrameId = requestAnimationFrame(animateGradient);
    }

    // Add event listeners to start and stop the animation on mouse enter and leave
    card.addEventListener('mouseenter', () => {
        card.style.backgroundImage = hoverGradient;
        border.style.backgroundImage = borderGradient;
        desc.textContent = hoverDescription; // Change to hover description
        animationFrameId = requestAnimationFrame(animateGradient);
    });

    card.addEventListener('mouseleave', () => {
        card.style.backgroundImage = ''; // Reset background gradient on mouse leave
        border.style.backgroundImage = '';
        desc.textContent = description; // Reset to base description
        cancelAnimationFrame(animationFrameId);
    });

    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'dslogo';

    // Add click event to change header background color to easterEggColor
    img.addEventListener('click', () => {
        const header = document.getElementById('header');
        if (header) {
            header.style.backgroundColor = easterEggColor;
        }
    });

    card.appendChild(img);

    const desc = document.createElement('p');
    desc.textContent = description;
    desc.className = 'dscontent';
    card.appendChild(desc);

    const a = document.createElement('a');
    a.href = link;
    a.textContent = linkText; // Use the linkText property
    card.appendChild(a);

    card.appendChild(border); // Append the border pseudo-element to the card

    return card;
}


// Populate Game Section with example game data
function populateGames(games) {
    const section = document.getElementById('game-section');
    games.forEach(game => {
        const card = createGameCard(game.imageSrc, game.description, game.hoverDescription, game.link, "Play!", game.borderGradient, game.hoverGradient, game.easterEggColor);
        section.appendChild(card);
    });
}

// Populate Social Section with example social data
function populateSocials(socials) {
    const section = document.getElementById('social-section');
    socials.forEach(social => {
        const card = createGameCard(social.imageSrc, social.description, social.hoverDescription, social.link, social.linkText, social.borderGradient, social.hoverGradient, social.easterEggColor);
        section.appendChild(card);
    });
}

// Populate Mod Section with example social data
function populateMods(mods) {
    const section = document.getElementById('mod-section');
    mods.forEach(mod => {
        const card = createGameCard(mod.imageSrc, mod.description, mod.hoverDescription, mod.link, mod.linkText, mod.borderGradient, mod.hoverGradient, mod.easterEggColor);
        section.appendChild(card);
    });
}

function populateApps(apps) {
    const section = document.getElementById('app-section');
    apps.forEach(app => {
        const card = createGameCard(app.imageSrc, app.description, app.hoverDescription, app.link, app.linkText, app.borderGradient, app.hoverGradient, app.easterEggColor);
        section.appendChild(card);
    });
}

populateGames([{
    imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/refs/heads/main/mogging.png"
        , description: "Mogging Simulator 2025"
        , hoverDescription: "Happy April Fools!"
        , link: "https://mogging.stardomga.me"
        , borderGradient: "linear-gradient(-45deg,rgba(255, 102, 196, 1) 0%,rgba(255, 102, 196, 1) 25%,rgba(255, 49, 49, 1) 50%,rgba(255, 49, 49, 1) 75%)"
        , hoverGradient: "linear-gradient(-45deg,rgba(255, 49, 49, 1) 0%,rgba(255, 49, 49, 1) 25%,rgba(255, 102, 196, 1) 50%,rgba(255, 102, 196, 1) 75%)"
        , easterEggColor: "#000000"
    },
    {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/refs/heads/main/perspectiveRemastered.png"
        , description: "Perspective Remastered"
        , hoverDescription: "Out Now on Steam!"
        , link: "https://store.steampowered.com/app/3528500/Perspective_Remastered/"
        , borderGradient: "linear-gradient(-45deg,rgba(208, 94, 180, 1) 0%,rgba(102, 164, 216, 1) 25%,rgba(121, 206, 114, 1) 50%,rgba(246, 64, 59, 1) 75%)"
        , hoverGradient: "linear-gradient(-45deg,rgba(246, 64, 59, 1) 0%,rgba(121, 206, 114, 1) 25%,rgba(102, 164, 216, 1) 50%,rgba(208, 94, 180, 1) 75%)"
        , easterEggColor: "#d05eb4"
    },
    {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/refs/heads/main/m.png"
        , description: "Trust Me"
        , hoverDescription: "A Platformer made for Brackeys Game Jam 2025"
        , link: "https://stardomgames.itch.io/trust-me"
        , borderGradient: "linear-gradient(-45deg,rgba(0,194,204,255) 0%,rgba(0,194,204,255) 25%,rgba(230,53,53,255) 50%,rgba(230,53,53,255) 75%)"
        , hoverGradient: "linear-gradient(-45deg,rgba(230,53,53,255) 0%,rgba(230,53,53,255) 25%,rgba(0,194,204,255) 50%,rgba(0,194,204,255) 75%)"
        , easterEggColor: "#004bad"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/AI.png"
        , description: "AI Invasion"
        , hoverDescription: "Risk mixed with DND and AI."
        , link: "https://ai-invasion.stardomga.me"
        , borderGradient: "linear-gradient(-45deg, #8C4C00, #110A00)"
        , hoverGradient: "linear-gradient(-45deg, #110A00, #8C4C00)"
        , easterEggColor: "#8C4C00"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/cc.png"
        , description: "Courtroom Chaos"
        , hoverDescription: "Represent Clients to an AI Judge!"
        , link: "https://courtroom-chaos.stardomga.me"
        , borderGradient: "linear-gradient(-45deg, #ffbb57, #38b6ff)"
        , hoverGradient: "linear-gradient(-45deg, #38b6ff, #ffbb57)"
        , easterEggColor: "#ffbb57"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/1000018639-removebg-preview.png"
        , description: "Cube Conquest"
        , hoverDescription: "Gather resources and defend your base!"
        , link: "https://stardomgames.itch.io/cube-conquest"
        , borderGradient: "linear-gradient(-45deg, #5CE1E6, #274F5C)"
        , hoverGradient: "linear-gradient(-45deg, #274F5C, #5CE1E6)"
        , easterEggColor: "#5CE1E6"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/38974805_1162594521647001_8678711909508751475_n.png"
        , description: "Gravity Grapple: Dimensions"
        , hoverDescription: "Swing Through the Multiverse! (VR)"
        , link: "https://www.meta.com/experiences/8988079141207254/?utm_source=oculus&utm_medium=share"
        , borderGradient: "linear-gradient(-45deg, #A2E363, #2394E0)"
        , hoverGradient: "linear-gradient(-45deg, #2394E0, #A2E363)"
        , easterEggColor: "#A2E363"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Productivity.png"
        , description: "Productivity Quest 2024"
        , hoverDescription: "Become a Corporate Slave! Man I Love April!"
        , link: "https://stardomgames.itch.io/productivity-quest-2024"
        , borderGradient: "linear-gradient(-45deg, #efc75e, #000000)"
        , hoverGradient: "linear-gradient(-45deg, #000000, #efc75e)"
        , easterEggColor: "#efc75e"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Time%20Scale%20Logo.png"
        , description: "Time Scale"
        , hoverDescription: "Reverse Time to Solve Puzzles"
        , link: "https://stardomgames.itch.io/time-scale"
        , borderGradient: "linear-gradient(-45deg, #140F1C, #80607E)"
        , hoverGradient: "linear-gradient(-45deg, #80607E, #140F1C)"
        , easterEggColor: "#140F1C"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/grapple.png"
        , description: "Gravity Grapple"
        , hoverDescription: "Swing Through Space!"
        , link: "https://stardomgames.itch.io/gravity-grapple"
        , borderGradient: "linear-gradient(-45deg, #A2E363, #2394E0)"
        , hoverGradient: "linear-gradient(-45deg, #2394E0, #A2E363)"
        , easterEggColor: "#A2E363"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/parachute.png"
        , description: "Parachute Fall"
        , hoverDescription: "Fall and Avoid Bombs! (Suggested on Mobile)"
        , link: "https://parachutefall.stardomga.me/game/index.html"
        , borderGradient: "linear-gradient(-45deg, #082470, #0868a8)"
        , hoverGradient: "linear-gradient(-45deg, #0868a8, #082470)"
        , easterEggColor: "#082470"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Kurger%20Bing%20Simulator%20Logo.png"
        , description: "Kurger Bing Heat'n it up Simulator:..."
        , hoverDescription: "Become an Amazing Kurger Bing Employee!"
        , link: "https://stardomgames.itch.io/kurger-bing-heatn-it-up-simulator-2023-remastered-remix-ultimate-special-edition"
        , borderGradient: "linear-gradient(-45deg, #f29530, #e01717)"
        , hoverGradient: "linear-gradient(-45deg, #e01717, #f29530)"
        , easterEggColor: "#f29530"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Project%20Multiverse%20Icon.png"
        , description: "Project Multiverse"
        , hoverDescription: "Cancelled."
        , link: "https://stardomgames.itch.io/project-multiverse"
        , borderGradient: "linear-gradient(-45deg, #c000fb, #d004bc)"
        , hoverGradient: "linear-gradient(-45deg, #d004bc, #c000fb)"
        , easterEggColor: "#c000fb"
    }
    , {
        imageSrc: "https://github.com/jordan-trempert/media/blob/main/YARO.png?raw=true"
        , description: "Yet Another Rip-off"
        , hoverDescription: "A collection of games commonly remade"
        , link: "https://stardomgames.itch.io/yaro"
        , borderGradient: " linear-gradient(45deg, #464646, #000)"
        , hoverGradient: "linear-gradient(-45deg, #000, #464646)"
        , easterEggColor: "#464646"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Project%20Paradox.png"
        , description: "Project Paradox"
        , hoverDescription: "Travel Through Different Worlds to Stop a Zombie Apocalypse"
        , link: "https://stardomgames.itch.io/project-paradox"
        , borderGradient: "linear-gradient(-45deg,rgba(208, 94, 180, 1) 0%,rgba(102, 164, 216, 1) 25%,rgba(121, 206, 114, 1) 50%,rgba(246, 64, 59, 1) 75%)"
        , hoverGradient: "linear-gradient(-45deg,rgba(246, 64, 59, 1) 0%,rgba(121, 206, 114, 1) 25%,rgba(102, 164, 216, 1) 50%,rgba(208, 94, 180, 1) 75%)"
        , easterEggColor: "#d05eb4"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Green%20Square%20Adventures.png"
        , description: "Green Square Adventures"
        , hoverDescription: "A platformer with zero bugs!"
        , link: "https://stardomgames.itch.io/green-square-adventures"
        , borderGradient: "linear-gradient(-45deg, #2abe11, #096523)"
        , hoverGradient: "linear-gradient(-45deg, #096523, #2abe11)"
        , easterEggColor: "#2abe11"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Perspective.png"
        , description: "Perspective Part 1"
        , hoverDescription: "A Non-Euclidean Puzzle Game"
        , link: "https://stardomgames.itch.io/perspective-part-1"
        , borderGradient: "linear-gradient(-45deg,rgba(208, 94, 180, 1) 0%,rgba(102, 164, 216, 1) 25%,rgba(121, 206, 114, 1) 50%,rgba(246, 64, 59, 1) 75%)"
        , hoverGradient: "linear-gradient(-45deg,rgba(246, 64, 59, 1) 0%,rgba(121, 206, 114, 1) 25%,rgba(102, 164, 216, 1) 50%,rgba(208, 94, 180, 1) 75%)"
        , easterEggColor: "#d05eb4"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Dungeon%20Slayer.png"
        , description: "Dungeon Slayer"
        , hoverDescription: "Simple Rouge-like Dungeon Crawler"
        , link: "https://github.com/StardomGames/Dungeon-Slayer/releases"
        , borderGradient: "linear-gradient(-45deg,rgba(0, 77, 194, 1),rgba(14, 44, 93, 1))"
        , hoverGradient: "linear-gradient(-45deg,rgba(14, 44, 93, 1),rgba(0, 77, 194, 1))"
        , easterEggColor: "#004dc2"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/Untitled%20design.png"
        , description: "A Blocky Puzzle 2"
        , hoverDescription: "A Puzzle Game, Sequel to A Blocky Puzzle"
        , link: "https://github.com/StardomGames/A-Blocky-Puzzle-2/releases"
        , borderGradient: "linear-gradient(-45deg, rgba(10, 97, 17, 1), #00ff87)"
        , hoverGradient: "linear-gradient(-45deg, #00ff87, rgba(10, 97, 17, 1))"
        , easterEggColor: "#0a6111"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/ABP.png"
        , description: "A Blocky Puzzle"
        , hoverDescription: "A Simple Puzzle Platformer"
        , link: "https://github.com/StardomGames/A-Blocky-Puzzle/releases"
        , borderGradient: "linear-gradient(-45deg, rgba(10, 97, 17, 1), #00ff87)"
        , hoverGradient: "linear-gradient(-45deg, #00ff87, rgba(10, 97, 17, 1))"
        , easterEggColor: "#0a6111"
    }

]);

populateSocials([{
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/itch.png"
        , description: "Itch.io"
        , hoverDescription: "Itch.io"
        , link: "https://stardomgames.itch.io/"
        , linkText: "Follow!"
        , borderGradient: "linear-gradient(-45deg, #ff0000, #ff5c5c)"
        , hoverGradient: "linear-gradient(-45deg, #ff5c5c, #ff0000)"
        , easterEggColor: "#ff0000"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/109018_media_512x512.png"
        , description: "Spotify"
        , hoverDescription: "Spotify"
        , link: "https://open.spotify.com/artist/1WQqvnEv8S9Bc37dqXvQbS?si=YzfOiVSKTEWWAnLdioV85w&utm_source=copy-link"
        , linkText: "Follow!"
        , borderGradient: "linear-gradient(-45deg, #57ba63, #2abe11)"
        , hoverGradient: "linear-gradient(-45deg, #2abe11, #57ba63)"
        , easterEggColor: "#57ba63"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/youtube.png"
        , description: "YouTube"
        , hoverDescription: "YouTube"
        , link: "https://www.youtube.com/channel/UCgmh2uIuUPxIep-qJ2WOEbg"
        , linkText: "Subscribe!"
        , borderGradient: "linear-gradient(45deg, #ff0000, #d61e1e)"
        , hoverGradient: "linear-gradient(-45deg, #d61e1e, #ff0000)"
        , easterEggColor: "#ff0000"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/discord.png"
        , description: "Discord"
        , hoverDescription: "Discord"
        , link: "https://discord.gg/CGqT9WX7sU"
        , linkText: "Join!"
        , borderGradient: "linear-gradient(45deg, #00acee, #7289da)"
        , hoverGradient: "linear-gradient(45deg, #7289da, #00acee)"
        , easterEggColor: "#00acee"
    }
    , {
        imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
        , description: "Instagram"
        , hoverDescription: "Instagram"
        , link: "https://www.instagram.com/stardomgamestudios/"
        , linkText: "Follow!"
        , borderGradient: "linear-gradient(90deg,rgba(81, 91, 212, 0.7) 0%,rgba(129, 52, 175, 0.7) 17%,rgba(221, 42, 123, 0.7) 43%,rgba(254, 218, 119, 0.7) 74%,rgba(245, 133, 41, 0.7) 100%)"
        , hoverGradient: "linear-gradient(90deg, rgba(245, 133, 41, 0.7) 0%, rgba(254, 218, 119, 0.7) 17%, rgba(221, 42, 123, 0.7) 43%, rgba(129, 52, 175, 0.7) 74%, rgba(81, 91, 212, 0.7) 100%)"
        , easterEggColor: "#515bd4"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/x%20logo.png"
        , description: "X"
        , hoverDescription: "X"
        , link: "https://twitter.com/Stardom_Games"
        , linkText: "Follow!"
        , borderGradient: "linear-gradient(45deg, #FFFFFF, #000000)"
        , hoverGradient: "linear-gradient(-45deg, #000000, #FFFFFF)"
        , easterEggColor: "#000000"
    }
    , {
        imageSrc: "https://github.com/jordan-trempert/media/blob/main/github.png?raw=true"
        , description: "GitHub"
        , hoverDescription: "GitHub"
        , link: "https://github.com/stardomgames"
        , linkText: "See projects!"
        , borderGradient: "linear-gradient(45deg, #FFFFFF, #000000)"
        , hoverGradient: "linear-gradient(-45deg, #000000, #FFFFFF)"
        , easterEggColor: "#000000"
    }
    , {
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/patreon.jpg"
        , description: "Patreon"
        , hoverDescription: "Patreon"
        , link: "https://patreon.com/stardomgames"
        , linkText: "Donate!"
        , borderGradient: "linear-gradient(45deg, #ff371b, #f96854)"
        , hoverGradient: "linear-gradient(-45deg, #f96854, #ff371b)"
        , easterEggColor: "#ff371b"
    }
    , {
        imageSrc: "https://cdn.fastly.picmonkey.com/content4/previews/social/social_54_550.webp"
        , description: "Reddit"
        , hoverDescription: "Reddit"
        , link: "https://reddit/com/r/stardomgames"
        , linkText: "Join!"
        , borderGradient: "linear-gradient(45deg, #fe581e, #ff4301)"
        , hoverGradient: "linear-gradient(45deg, #ff4301, #fe581e)"
        , easterEggColor: "#fe581e"
    }
]);

populateMods([{
        imageSrc: "https://cdn.modrinth.com/data/5CpvIduG/45302ae4c31cdd3483c624b3253ca1cb9e8c334d_96.webp"
        , description: "Stardom's Colors"
        , hoverDescription: "This mod allows more customizable dying of certain blocks!"
        , link: "https://modrinth.com/mod/stardoms-colors/"
        , linkText: "Modrinth"
        , borderGradient: "linear-gradient(-45deg, red 0%, orange 20%, yellow 40%, green 60%, blue 80%, violet 100%)"
        , hoverGradient: "linear-gradient(45deg, violet 0%, blue 20%, green 40%, yellow 60%, orange 80%, red 100%)"
        , easterEggColor: "#FFA500"
    },{
        imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/ae13dcdb84cb157c3f8b35c5077688d058a5458f.png"
        , description: "Stardom's Extreme End"
        , hoverDescription: "This mod overhauls the end in an extreme way!"
        , link: "https://modrinth.com/mod/stardoms-extreme-end/"
        , linkText: "Modrinth"
        , borderGradient: "linear-gradient(-45deg, rgb(199, 192, 171) 0%, rgb(199, 192, 171) 25%, rgb(57, 27, 103) 50%, rgb(57, 27, 103) 75%)"
        , hoverGradient: "linear-gradient(45deg, rgb(57, 27, 103) 0%, rgb(57, 27, 103) 25%, rgb(199, 192, 171) 50%, rgb(199, 192, 171) 75%)"
        , easterEggColor: "#c7c0ab"
    },
    {
        imageSrc: "https://cdn.modrinth.com/data/KsNlEiNa/e53ca3152f9872d4556a5d27af480eddb9787956_96.webp"
        , description: "Stardom's Skys"
        , hoverDescription: "An addon for Stardom's Extreme End which adds a whole new dimension"
        , link: "https://modrinth.com/mod/stardoms-skys/"
        , linkText: "Modrinth"
        , borderGradient: "linear-gradient(-45deg, rgb(39,45,68) 0%, rgb(39,45,68) 25%, rgb(92,108,160) 50%, rgb(92,108,160) 75%)"
        , hoverGradient: "linear-gradient(45deg, rgb(92,108,160) 0%, rgb(92,108,160) 25%, rgb(39,45,68) 50%, rgb(39,45,68) 75%)"
        , easterEggColor: "#5c6ca0"
    }
    , {
        imageSrc: "https://cdn.modrinth.com/data/iLPzEDlD/55a2d8c5dfa847d149b34dc54fa6f6952afcb31f.png"
        , description: "Stardom's Sync"
        , hoverDescription: "Syncs real life time and weather into Minecraft!"
        , link: "https://modrinth.com/mod/stardoms-sync/"
        , linkText: "Modrinth"
        , borderGradient: "linear-gradient(45deg, #464646, #000)"
        , hoverGradient: "linear-gradient(45deg, #000, #464646)"
        , easterEggColor: "#464646"
    }
    , {
        imageSrc: "https://cdn.modrinth.com/data/eCxwIAgh/070f5bac4dc3ae760796d66458e006b7c81fd8ba.png"
        , description: "Stardom's Client"
        , hoverDescription: "Adds many QoL and customization feature to Minecraft!"
        , link: "https://modrinth.com/mod/stardoms-client/"
        , linkText: "Modrinth"
        , borderGradient: "linear-gradient(-45deg, #f1c332, #d003f7)"
        , hoverGradient: "linear-gradient(-45deg, #d003f7, #f1c332)"
        , easterEggColor: "#f1c332"
    }
    , {
        imageSrc: "https://cdn.modrinth.com/data/iX99Kymi/a8adfec3a25b5b801c0518feaf264d4b964c5554.png"
        , description: "Stardom's Dungeons"
        , hoverDescription: "Adds difficult end-game dungeons to Minecraft!"
        , link: "https://modrinth.com/mod/stardoms-dungeons/"
        , linkText: "Modrinth"
        , borderGradient: "linear-gradient(-45deg, #4b494b, #ffff46)"
        , hoverGradient: "linear-gradient(-45deg, #ffff46, #4b494b)"
        , easterEggColor: "#ffff46"
    }
]);

populateApps([{
                imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/refs/heads/main/android-chrome-192x192.png"
                , description: "DeskThing"
                , hoverDescription: "Display and control your spotify music!"
                , link: "https://deskthing.stardomga.me"
                , linkText: "web app"
                , borderGradient: "linear-gradient(-45deg, #57ba63, #2abe11)"
                , hoverGradient: "linear-gradient(-45deg, #2abe11, #57ba63)"
                , easterEggColor: "#57ba63"
            }
            , {
                imageSrc: "https://raw.githubusercontent.com/jordan-trempert/media/main/moviewer.png"
                , description: "Moviewer"
                , hoverDescription: "View, Rate, and comment on movies!"
                , link: "https://moviewer.stardomga.me"
                , linkText: "Web app"
                , borderGradient: "linear-gradient(45deg, #464646, #000)"
                , hoverGradient: "linear-gradient(45deg, #000, #464646)"
                , easterEggColor: "#464646"
            }]);
